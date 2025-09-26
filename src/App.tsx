import { useState } from 'react'
import './App.css'

interface FurnitureItem {
  id: string
  name: string
  category: string
  price: string
  image: string
  manufacturer: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  color: string
  material: string
}

const furnitureData: FurnitureItem[] = [
  { 
    id: '1', 
    name: 'Atlas Coffee Table', 
    category: 'Tables', 
    price: '$899', 
    image: '/images/Atlas-Coffee-Table.png',
    manufacturer: 'West Elm',
    dimensions: { length: '48"', width: '24"', height: '18"' },
    color: 'Natural Oak',
    material: 'Solid Oak Wood'
  },
  { 
    id: '2', 
    name: 'Chestfield Sofa', 
    category: 'Sofas', 
    price: '$1,299', 
    image: '/images/Chestfield sofa.png',
    manufacturer: 'Pottery Barn',
    dimensions: { length: '84"', width: '36"', height: '34"' },
    color: 'Charcoal Gray',
    material: 'Performance Fabric'
  },
  { 
    id: '3', 
    name: 'Cloud Sofa', 
    category: 'Sofas', 
    price: '$1,599', 
    image: '/images/Cloud Sofa.png',
    manufacturer: 'Article',
    dimensions: { length: '90"', width: '38"', height: '32"' },
    color: 'Light Gray',
    material: 'Premium Velvet'
  },
  { 
    id: '4', 
    name: 'Elegant Sofa', 
    category: 'Sofas', 
    price: '$1,199', 
    image: '/images/Elegant sofa.png',
    manufacturer: 'Crate & Barrel',
    dimensions: { length: '78"', width: '35"', height: '33"' },
    color: 'Navy Blue',
    material: 'Linen Blend'
  },
  { 
    id: '5', 
    name: 'Glass Steel Coffee Table', 
    category: 'Tables', 
    price: '$699', 
    image: '/images/Glass steel coffee table.png',
    manufacturer: 'CB2',
    dimensions: { length: '42"', width: '22"', height: '16"' },
    color: 'Clear Glass',
    material: 'Tempered Glass & Steel'
  },
  { 
    id: '6', 
    name: 'Luna 3-Seater Sofa', 
    category: 'Sofas', 
    price: '$1,899', 
    image: '/images/Luna 3-seater sofa.png',
    manufacturer: 'Design Within Reach',
    dimensions: { length: '96"', width: '40"', height: '30"' },
    color: 'Cream White',
    material: 'Italian Leather'
  },
  { 
    id: '7', 
    name: 'Minimalist Loveseat Sofa', 
    category: 'Sofas', 
    price: '$999', 
    image: '/images/Minimalist loveseat sofa.png',
    manufacturer: 'IKEA',
    dimensions: { length: '60"', width: '32"', height: '28"' },
    color: 'Beige',
    material: 'Cotton Blend'
  },
  { 
    id: '8', 
    name: 'Modern Oak Table', 
    category: 'Tables', 
    price: '$1,099', 
    image: '/images/Modern oak table.png',
    manufacturer: 'Room & Board',
    dimensions: { length: '72"', width: '36"', height: '30"' },
    color: 'Rich Walnut',
    material: 'Solid Walnut Wood'
  },
  { 
    id: '9', 
    name: 'Round Coffee Table', 
    category: 'Tables', 
    price: '$599', 
    image: '/images/Round coffee table.png',
    manufacturer: 'Target',
    dimensions: { length: '36"', width: '36"', height: '18"' },
    color: 'Espresso',
    material: 'Engineered Wood'
  },
  { 
    id: '10', 
    name: 'Round Marble Coffee Table', 
    category: 'Tables', 
    price: '$1,399', 
    image: '/images/Round marble coffee table.png',
    manufacturer: 'Restoration Hardware',
    dimensions: { length: '40"', width: '40"', height: '16"' },
    color: 'Carrara Marble',
    material: 'Natural Marble & Brass'
  },
  { 
    id: '11', 
    name: 'Rustic Wood Coffee Table', 
    category: 'Tables', 
    price: '$799', 
    image: '/images/Rustic wood coffee table.png',
    manufacturer: 'Anthropologie',
    dimensions: { length: '44"', width: '26"', height: '20"' },
    color: 'Reclaimed Pine',
    material: 'Reclaimed Wood'
  },
  { 
    id: '12', 
    name: 'Sora Side Table', 
    category: 'Tables', 
    price: '$399', 
    image: '/images/Sora side table.png',
    manufacturer: 'Wayfair',
    dimensions: { length: '20"', width: '20"', height: '24"' },
    color: 'Black',
    material: 'Metal & Glass'
  },
  { 
    id: '13', 
    name: 'Velvet Sectional Sofa', 
    category: 'Sofas', 
    price: '$2,199', 
    image: '/images/Velvet Sectional sofa.png',
    manufacturer: 'Joybird',
    dimensions: { length: '120"', width: '42"', height: '35"' },
    color: 'Emerald Green',
    material: 'Premium Velvet'
  }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedItem, setSelectedItem] = useState<FurnitureItem | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [projects, setProjects] = useState<{[key: string]: FurnitureItem[]}>({})
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false)
  const [newProjectName, setNewProjectName] = useState<string>('')

  const categories = ['All', ...Array.from(new Set(furnitureData.map(item => item.category)))]
  
  const filteredItems = furnitureData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      item.name.toLowerCase().includes(searchLower) ||
      item.manufacturer.toLowerCase().includes(searchLower) ||
      item.color.toLowerCase().includes(searchLower) ||
      item.material.toLowerCase().includes(searchLower)
    return matchesCategory && matchesSearch
  })

  const bestImageSrc = (imagePath: string) => {
    // Transform drive.google.com links if needed, otherwise return local path
    if (imagePath.includes('drive.google.com')) {
      return imagePath.replace('/view?usp=sharing', '').replace('/file/d/', '/uc?export=view&id=').replace('/view', '')
    }
    return imagePath
  }

  const toggleItemSelection = (itemId: string) => {
    const newSelectedItems = new Set(selectedItems)
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId)
    } else {
      newSelectedItems.add(itemId)
    }
    setSelectedItems(newSelectedItems)
  }

  const getSelectedFurnitureItems = () => {
    return furnitureData.filter(item => selectedItems.has(item.id))
  }

  const saveProject = () => {
    if (newProjectName.trim() && selectedItems.size > 0) {
      const selectedFurniture = getSelectedFurnitureItems()
      setProjects(prev => ({
        ...prev,
        [newProjectName.trim()]: selectedFurniture
      }))
      setNewProjectName('')
      setShowProjectModal(false)
      setSelectedItems(new Set()) // Clear selection after saving
    }
  }

  const loadProject = (projectName: string) => {
    const projectItems = projects[projectName]
    if (projectItems) {
      const itemIds = new Set(projectItems.map(item => item.id))
      setSelectedItems(itemIds)
    }
  }

  const deleteProject = (projectName: string) => {
    const newProjects = { ...projects }
    delete newProjects[projectName]
    setProjects(newProjects)
  }

  const exportToPDF = async () => {
    if (selectedItems.size === 0) return

    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    const selectedFurniture = getSelectedFurnitureItems()
    
    // Create new PDF document
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20

    // Add title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Furniture Catalog Export', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Add export date
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Exported on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 20

    // Add items
    for (let i = 0; i < selectedFurniture.length; i++) {
      const item = selectedFurniture[i]
      
      // Check if we need a new page
      if (yPosition > pageHeight - 150) {
        doc.addPage()
        yPosition = 20
      }

      // Try to capture the image
      try {
        const imgElement = document.querySelector(`img[alt="${item.name}"]`) as HTMLImageElement
        if (imgElement && imgElement.complete) {
          // Get the natural dimensions of the image
          const naturalWidth = imgElement.naturalWidth
          const naturalHeight = imgElement.naturalHeight
          
          // Calculate aspect ratio
          const aspectRatio = naturalWidth / naturalHeight
          
          // Set target dimensions for PDF (90mm width, maintain aspect ratio)
          const targetWidth = 90
          const targetHeight = targetWidth / aspectRatio
          
          // Capture the image with proper dimensions
          const canvas = await html2canvas(imgElement, {
            width: naturalWidth,
            height: naturalHeight,
            scale: 1,
            useCORS: true,
            allowTaint: true
          })
          
          const imgData = canvas.toDataURL('image/png')
          
          // Add image to PDF with proper scaling
          doc.addImage(imgData, 'PNG', pageWidth - 100, yPosition, targetWidth, targetHeight)
        }
      } catch (error) {
        console.log('Could not capture image for:', item.name)
      }

      // Add item title
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(item.name, 20, yPosition)
      yPosition += 8

      // Add manufacturer
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text(`Manufacturer: ${item.manufacturer}`, 20, yPosition)
      yPosition += 6

      // Add category
      doc.text(`Category: ${item.category}`, 20, yPosition)
      yPosition += 6

      // Add dimensions
      doc.text(`Dimensions: ${item.dimensions.length} × ${item.dimensions.width} × ${item.dimensions.height}`, 20, yPosition)
      yPosition += 6

      // Add color
      doc.text(`Color: ${item.color}`, 20, yPosition)
      yPosition += 6

      // Add material
      doc.text(`Material: ${item.material}`, 20, yPosition)
      yPosition += 6

      // Add price
      doc.setFont('helvetica', 'bold')
      doc.text(`Price: ${item.price}`, 20, yPosition)
      yPosition += 25

      // Add separator line
      doc.setLineWidth(0.5)
      doc.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 10
    }

    // Save the PDF
    const fileName = `furniture-catalog-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }

  const exportProjectToPDF = async (projectName: string) => {
    const projectItems = projects[projectName]
    if (!projectItems || projectItems.length === 0) return

    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    
    // Create new PDF document
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20

    // Add title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text(`Project: ${projectName}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Add export date
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Exported on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 20

    // Add items
    for (let i = 0; i < projectItems.length; i++) {
      const item = projectItems[i]
      
      // Check if we need a new page
      if (yPosition > pageHeight - 150) {
        doc.addPage()
        yPosition = 20
      }

      // Try to capture the image
      try {
        const imgElement = document.querySelector(`img[alt="${item.name}"]`) as HTMLImageElement
        if (imgElement && imgElement.complete) {
          // Get the natural dimensions of the image
          const naturalWidth = imgElement.naturalWidth
          const naturalHeight = imgElement.naturalHeight
          
          // Calculate aspect ratio
          const aspectRatio = naturalWidth / naturalHeight
          
          // Set target dimensions for PDF (90mm width, maintain aspect ratio)
          const targetWidth = 90
          const targetHeight = targetWidth / aspectRatio
          
          // Capture the image with proper dimensions
          const canvas = await html2canvas(imgElement, {
            width: naturalWidth,
            height: naturalHeight,
            scale: 1,
            useCORS: true,
            allowTaint: true
          })
          
          const imgData = canvas.toDataURL('image/png')
          
          // Add image to PDF with proper scaling
          doc.addImage(imgData, 'PNG', pageWidth - 100, yPosition, targetWidth, targetHeight)
        }
      } catch (error) {
        console.log('Could not capture image for:', item.name)
      }

      // Add item title
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(item.name, 20, yPosition)
      yPosition += 8

      // Add manufacturer
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text(`Manufacturer: ${item.manufacturer}`, 20, yPosition)
      yPosition += 6

      // Add category
      doc.text(`Category: ${item.category}`, 20, yPosition)
      yPosition += 6

      // Add dimensions
      doc.text(`Dimensions: ${item.dimensions.length} × ${item.dimensions.width} × ${item.dimensions.height}`, 20, yPosition)
      yPosition += 6

      // Add color
      doc.text(`Color: ${item.color}`, 20, yPosition)
      yPosition += 6

      // Add material
      doc.text(`Material: ${item.material}`, 20, yPosition)
      yPosition += 6

      // Add price
      doc.setFont('helvetica', 'bold')
      doc.text(`Price: ${item.price}`, 20, yPosition)
      yPosition += 25

      // Add separator line
      doc.setLineWidth(0.5)
      doc.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 10
    }

    // Save the PDF
    const fileName = `${projectName.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Furniture Catalog</h1>
        <p>Discover our curated collection of modern furniture</p>
      </header>

      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, manufacturer, color, or material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>
      </div>

      <div className="filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedItems.size > 0 && (
        <div className="selection-toolbar">
          <div className="selection-info">
            <span className="selection-count">{selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected</span>
            <button 
              className="clear-selection-btn"
              onClick={() => setSelectedItems(new Set())}
            >
              Clear Selection
            </button>
          </div>
          <div className="toolbar-actions">
            <button 
              className="export-pdf-btn"
              onClick={exportToPDF}
            >
              Export to PDF
            </button>
            <button 
              className="save-project-btn"
              onClick={() => setShowProjectModal(true)}
            >
              Save as Project
            </button>
          </div>
        </div>
      )}

      {Object.keys(projects).length > 0 && (
        <div className="projects-section">
          <h3>Saved Projects</h3>
          <div className="projects-list">
            {Object.keys(projects).map(projectName => (
              <div key={projectName} className="project-item">
                <span className="project-name">{projectName}</span>
                <span className="project-count">({projects[projectName].length} items)</span>
                <div className="project-actions">
                  <button 
                    className="load-project-btn"
                    onClick={() => loadProject(projectName)}
                  >
                    Load
                  </button>
                  <button 
                    className="export-project-btn"
                    onClick={() => exportProjectToPDF(projectName)}
                  >
                    Export
                  </button>
                  <button 
                    className="delete-project-btn"
                    onClick={() => deleteProject(projectName)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="catalog">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className={`furniture-card ${selectedItems.has(item.id) ? 'selected' : ''}`}>
              <div className="card-checkbox">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={(e) => {
                    e.stopPropagation()
                    toggleItemSelection(item.id)
                  }}
                  className="selection-checkbox"
                />
              </div>
              <div className="card-content" onClick={() => setSelectedItem(item)}>
                <div className="image-container">
                  <img
                    src={bestImageSrc(item.image)}
                    alt={item.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/placeholder.png'
                    }}
                  />
                </div>
                <div className="card-info">
                  <h3>{item.name}</h3>
                  <p className="manufacturer">{item.manufacturer}</p>
                  <p className="category">{item.category}</p>
                  <p className="dimensions">{item.dimensions.length} × {item.dimensions.width} × {item.dimensions.height}</p>
                  <p className="price">{item.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No furniture found</h3>
            <p>Try adjusting your search term or category filter</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedItem(null)}>×</button>
            <div className="modal-content">
              <div className="modal-image">
                <img
                  src={bestImageSrc(selectedItem.image)}
                  alt={selectedItem.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/placeholder.png'
                  }}
                />
              </div>
              <div className="modal-info">
                <h2>{selectedItem.name}</h2>
                <div className="modal-details">
                  <div className="detail-row">
                    <span className="detail-label">Manufacturer:</span>
                    <span className="detail-value">{selectedItem.manufacturer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{selectedItem.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Dimensions:</span>
                    <span className="detail-value">{selectedItem.dimensions.length} × {selectedItem.dimensions.width} × {selectedItem.dimensions.height}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Color:</span>
                    <span className="detail-value">{selectedItem.color}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Material:</span>
                    <span className="detail-value">{selectedItem.material}</span>
                  </div>
                  <div className="detail-row price-row">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value modal-price">{selectedItem.price}</span>
                  </div>
                </div>
                <button className="contact-btn">Contact for Purchase</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showProjectModal && (
        <div className="modal-overlay" onClick={() => setShowProjectModal(false)}>
          <div className="modal project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowProjectModal(false)}>×</button>
            <div className="modal-content">
              <h2>Save Project</h2>
              <p className="modal-description">
                Save your selected {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} as a project
              </p>
              <div className="project-input-section">
                <label htmlFor="project-name">Project Name:</label>
                <input
                  id="project-name"
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  className="project-name-input"
                  onKeyPress={(e) => e.key === 'Enter' && saveProject()}
                />
              </div>
              <div className="selected-items-preview">
                <h4>Selected Items:</h4>
                <div className="preview-list">
                  {getSelectedFurnitureItems().map(item => (
                    <div key={item.id} className="preview-item">
                      <span className="preview-name">{item.name}</span>
                      <span className="preview-price">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowProjectModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-btn"
                  onClick={saveProject}
                  disabled={!newProjectName.trim()}
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
