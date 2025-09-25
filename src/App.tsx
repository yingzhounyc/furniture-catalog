import { useMemo, useState } from 'react'
import './App.css'
import { FURNITURE_DATA, uniqueCategories, uniqueColors, uniqueManufacturers, priceBounds } from './data'
import type { Furniture, FurnitureFilters, SavedProject } from './types'
import { formatDimensions } from './types'
import { bestImageSrc, downloadJson, loadProjects, saveProjects } from './utils'
import jsPDF from 'jspdf'
import { tryLoadImageDataUrl, bestImageSrc as bestSrc } from './utils'

function useFilteredFurniture(data: Furniture[], filters: FurnitureFilters) {
  const { query, manufacturer, color, category, minPriceUsd, maxPriceUsd } = filters
  return useMemo(() => {
    const q = (query ?? '').trim().toLowerCase()
    return data.filter((item) => {
      if (manufacturer && item.manufacturer !== manufacturer) return false
      if (color && item.color !== color) return false
      if (category && item.category !== category) return false
      if (typeof minPriceUsd === 'number' && typeof item.priceUsd === 'number' && item.priceUsd < minPriceUsd) return false
      if (typeof maxPriceUsd === 'number' && typeof item.priceUsd === 'number' && item.priceUsd > maxPriceUsd) return false
      if (!q) return true
      const haystack = `${item.name} ${item.manufacturer} ${item.color}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [data, query, manufacturer, color, category, minPriceUsd, maxPriceUsd])
}

function App() {
  const [query, setQuery] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [color, setColor] = useState('')
  const [category, setCategory] = useState('')
  const { min, max } = priceBounds()
  const [minPrice, setMinPrice] = useState(min)
  const [maxPrice, setMaxPrice] = useState(max)

  const filters: FurnitureFilters = {
    query,
    manufacturer: manufacturer || undefined,
    color: color || undefined,
    category: (category || undefined) as Furniture['category'] | undefined,
    minPriceUsd: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPriceUsd: Number.isFinite(maxPrice) ? maxPrice : undefined,
  }

  const filtered = useFilteredFurniture(FURNITURE_DATA, filters)

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [projects, setProjects] = useState<SavedProject[]>(() => loadProjects<SavedProject[]>())
  const [projectName, setProjectName] = useState('')

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function saveProject() {
    if (selected.size === 0) return
    const name = projectName.trim() || `Project ${new Date().toLocaleString()}`
    const p: SavedProject = {
      id: `p-${Date.now()}`,
      name,
      itemIds: Array.from(selected),
      createdAt: new Date().toISOString(),
    }
    const next = [p, ...projects]
    setProjects(next)
    saveProjects(next)
    setProjectName('')
  }

  function loadProject(id: string) {
    const p = projects.find((x) => x.id === id)
    if (!p) return
    setSelected(new Set(p.itemIds))
  }

  function deleteProject(id: string) {
    const next = projects.filter((p) => p.id !== id)
    setProjects(next)
    saveProjects(next)
  }

  async function exportSelectedPdf() {
    if (selected.size === 0) return
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const items = FURNITURE_DATA.filter((i) => selected.has(i.id))
    let first = true
    for (const item of items) {
      if (!first) doc.addPage()
      first = false
      let y = 15
      doc.setFontSize(16)
      doc.text(item.name, 10, y)
      y += 8
      doc.setFontSize(11)
      doc.text(`${item.manufacturer} • ${item.category.replace('_', ' ')}`, 10, y)
      y += 6
      doc.text(`Color: ${item.color}`, 10, y)
      y += 6
      doc.text(`Dimensions: ${formatDimensions(item.dimensions)}`, 10, y)
      y += 6
      if (typeof item.priceUsd === 'number') {
        doc.text(`Price: $${item.priceUsd.toLocaleString()}`, 10, y)
        y += 8
      } else {
        y += 4
      }
      if (item.imageUrl) {
        const src = bestSrc(item.imageUrl) || item.imageUrl
        const dataUrl = await tryLoadImageDataUrl(src)
        if (dataUrl) {
          const maxWidth = 180
          const maxHeight = 120
          // Roughly estimate image ratio by preloading canvas is already done
          // Place image
          doc.addImage(dataUrl, 'JPEG', 10, y, maxWidth, maxHeight)
        } else {
          doc.text('(Image unavailable due to host restrictions)', 10, y)
        }
      }
    }
    doc.save('selection.pdf')
  }

  function exportProjects() {
    if (projects.length === 0) return
    downloadJson('projects.json', projects)
  }

  function importProjects(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as SavedProject[]
        if (!Array.isArray(data)) return
        const valid = data.filter((p) => typeof p.id === 'string' && typeof p.name === 'string' && Array.isArray(p.itemIds))
        setProjects(valid)
        saveProjects(valid)
        e.target.value = ''
      } catch {
        // ignore
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Furniture Catalog</h1>
        <p>Search and filter sofas, coffee tables, side tables, and more.</p>
      </header>

      <section className="controls">
        <input
          className="input"
          type="text"
          placeholder="Search by name, manufacturer, or color..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="select"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        >
          <option value="">All manufacturers</option>
          {uniqueManufacturers().map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          className="select"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="">All colors</option>
          {uniqueColors().map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {uniqueCategories().map((c) => (
            <option key={c} value={c}>{c.replace('_', ' ')}</option>
          ))}
        </select>
        <div className="price">
          <input
            className="input"
            type="number"
            placeholder={`Min $${min}`}
            value={minPrice}
            min={0}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <span>–</span>
          <input
            className="input"
            type="number"
            placeholder={`Max $${max}`}
            value={maxPrice}
            min={0}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </section>

      <section className="projects">
        <div className="project-bar">
          <div className="selected-count">Selected: {selected.size}</div>
          <input className="input" type="text" placeholder="Project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          <button className="btn" onClick={saveProject} disabled={selected.size === 0}>Save as project</button>
          <button className="btn" onClick={exportSelectedPdf} disabled={selected.size === 0}>Export selected PDF</button>
        </div>
        <div className="project-actions">
          <button className="btn" onClick={exportProjects} disabled={projects.length === 0}>Export JSON</button>
          <label className="btn file">
            Import JSON
            <input type="file" accept="application/json" onChange={importProjects} hidden />
          </label>
        </div>
        {projects.length > 0 && (
          <ul className="project-list">
            {projects.map((p) => (
              <li key={p.id} className="project-item">
                <button className="link" onClick={() => loadProject(p.id)}>{p.name}</button>
                <span className="muted"> · {new Date(p.createdAt).toLocaleDateString()}</span>
                <button className="link danger" onClick={() => deleteProject(p.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      

      <section className="list">
        {filtered.length === 0 && (
          <div className="empty">No results. Try adjusting your search or filters.</div>
        )}
        {filtered.map((item) => (
          <article key={item.id} className="card" data-id={item.id}>
            <input type="checkbox" className="selectbox" checked={selected.has(item.id)} onChange={() => toggleSelect(item.id)} />
            {item.imageUrl && (
              <a href={item.imageUrl} target="_blank" rel="noreferrer">
                <img src={bestImageSrc(item.imageUrl)} alt={item.name} className="thumb" referrerPolicy="no-referrer" />
              </a>
            )}
            <div className="meta">
              <h3 className="title">{item.name}</h3>
              <div className="sub">{item.manufacturer} • {item.category.replace('_', ' ')}</div>
              <div className="row">
                <span className="badge">{item.color}</span>
                <span className="dim">{formatDimensions(item.dimensions)}</span>
              </div>
              {item.materials && item.materials.length > 0 && (
                <div className="materials">Materials: {item.materials.join(', ')}</div>
              )}
              {typeof item.priceUsd === 'number' && (
                <div className="price">${item.priceUsd.toLocaleString()}</div>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default App
