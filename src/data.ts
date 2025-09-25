import type { Furniture } from './types';

export const FURNITURE_DATA: Furniture[] = [
  {
    id: 'sf-001',
    category: 'sofa',
    manufacturer: 'ComfortCo',
    name: 'Luna 3-Seater Sofa',
    color: 'Charcoal',
    dimensions: { widthMm: 2100, depthMm: 900, heightMm: 820 },
    materials: ['Fabric', 'Hardwood', 'Foam'],
    priceUsd: 1299,
    imageUrl: 'https://drive.google.com/file/d/1blehjkzznjQ1DfAtV5XPL74MG7PgLuDu/view?usp=drive_link',
  },
  {
    id: 'ct-101',
    category: 'coffee_table',
    manufacturer: 'Oak & Iron',
    name: 'Atlas Coffee Table',
    color: 'Natural Oak',
    dimensions: { widthMm: 1200, depthMm: 600, heightMm: 420 },
    materials: ['Oak', 'Steel'],
    priceUsd: 499,
    imageUrl: 'https://drive.google.com/file/d/1Kvdc2NgEiWEuSz0baylQtC9jngqhvctl/view?usp=drive_link',
  },
  {
    id: 'st-205',
    category: 'side_table',
    manufacturer: 'NordicForm',
    name: 'Sora Side Table',
    color: 'Walnut',
    dimensions: { widthMm: 480, depthMm: 420, heightMm: 520 },
    materials: ['Walnut', 'Veneer'],
    priceUsd: 229,
    imageUrl: 'https://drive.google.com/file/d/1DL4Rm0BEb584sl9V3nOhhqxJAreRV1-w/view?usp=drive_link',
  },
  {
    id: 'ch-330',
    category: 'chair',
    manufacturer: 'ComfortCo',
    name: 'Luna Accent Chair',
    color: 'Sage',
    dimensions: { widthMm: 760, depthMm: 780, heightMm: 850 },
    materials: ['Fabric', 'Hardwood'],
    priceUsd: 349,
    imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'dk-412',
    category: 'desk',
    manufacturer: 'Oak & Iron',
    name: 'Helios Writing Desk',
    color: 'Black Oak',
    dimensions: { widthMm: 1400, depthMm: 700, heightMm: 740 },
    materials: ['Oak', 'Steel'],
    priceUsd: 799,
    imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop',
  },
  // Seeded from Google Drive names (image links can be added later)
  {
    id: 'gd-ches-sofa',
    category: 'sofa',
    manufacturer: 'DBernhardt',
    name: 'Chesterfield Sofa',
    color: 'Red Brown',
    dimensions: { widthMm: 2200, depthMm: 900, heightMm: 800 },
    priceUsd: 1599,
    imageUrl: 'https://drive.google.com/file/d/16NC7pPHUeVbgQWK9EGmnIc9dzJLqdvo6/view?usp=drive_link',
  },
  {
    id: 'gd-cloud-sofa',
    category: 'sofa',
    manufacturer: 'Lumen Living',
    name: 'Cloud Sofa',
    color: 'Ivory',
    dimensions: { widthMm: 2400, depthMm: 1000, heightMm: 780 },
    priceUsd: 1999,
    imageUrl: 'https://drive.google.com/file/d/1c1sMPWDVo_7nNehujmXmuORR7sM4pHGp/view?usp=drive_link',
  },
  {
    id: 'gd-elegant-sofa',
    category: 'sofa',
    manufacturer: 'The Gentry Group',
    name: 'Elegant Sofa',
    color: 'Gray',
    dimensions: { widthMm: 2100, depthMm: 900, heightMm: 780 },
    priceUsd: 1499,
    imageUrl: 'https://drive.google.com/file/d/1uJ7fQaQcqJ-DuOMsWVlCBAz99bMyS12r/view?usp=sharing',
  },
  {
    id: 'gd-glass-steel-ct',
    category: 'coffee_table',
    manufacturer: 'Lumen Living',
    name: 'Glass Steel Coffee Table',
    color: 'Glass/Steel',
    dimensions: { widthMm: 1200, depthMm: 600, heightMm: 420 },
    priceUsd: 599,
    imageUrl: 'https://drive.google.com/file/d/1G0BxpxPhXqVCWPPaQecBd6wRoLihcirg/view?usp=drive_link',
  },
  {
    id: 'gd-minimalist-loveseat',
    category: 'sofa',
    manufacturer: 'The Gentry Group',
    name: 'Minimalist Loveseat Sofa',
    color: 'Gray',
    dimensions: { widthMm: 1600, depthMm: 850, heightMm: 780 },
    priceUsd: 899,
    imageUrl: 'https://drive.google.com/file/d/1LeUznsESBMujAJvGSqsdybKiohbwbqvT/view?usp=drive_link',
  },
  {
    id: 'gd-modern-oak-table',
    category: 'coffee_table',
    manufacturer: 'Timberline Living',
    name: 'Modern Oak Table',
    color: 'Natural Oak',
    dimensions: { widthMm: 1300, depthMm: 700, heightMm: 450 },
    priceUsd: 699,
    imageUrl: 'https://drive.google.com/file/d/1BAD3Dw7o06qMTap6VCZIqAYbTJcG5K2u/view?usp=drive_link',
  },
  {
    id: 'gd-round-coffee-table',
    category: 'coffee_table',
    manufacturer: 'Timberline Living',
    name: 'Round Coffee Table',
    color: 'Walnut',
    dimensions: { widthMm: 900, depthMm: 900, heightMm: 430 },
    priceUsd: 389,
    imageUrl: 'https://drive.google.com/file/d/1lk66sG-LELB6O5Oa-wgV428R_H4magS0/view?usp=drive_link',
  },
  {
    id: 'gd-round-marble-ct',
    category: 'coffee_table',
    manufacturer: 'Wexford Furniture Co.',
    name: 'Round Marble Coffee Table',
    color: 'White Marble',
    dimensions: { widthMm: 850, depthMm: 850, heightMm: 430 },
    priceUsd: 899,
    imageUrl: 'https://drive.google.com/file/d/16zC6WYYGhljE65H4gNiIQQTau6GEnec8/view?usp=drive_link',
  },
  {
    id: 'gd-rustic-wood-ct',
    category: 'coffee_table',
    manufacturer: 'Wexford Furniture Co.',
    name: 'Rustic Wood Coffee Table',
    color: 'Rustic Oak',
    dimensions: { widthMm: 1200, depthMm: 600, heightMm: 450 },
    priceUsd: 529,
    imageUrl: 'https://drive.google.com/file/d/1NYuTRwpn6bjpmcLK7vBPB2o6BkjrfpLe/view?usp=drive_link',
  },
  {
    id: 'gd-velvet-sectional',
    category: 'sofa',
    manufacturer: 'The Gentry Group',
    name: 'Velvet Sectional Sofa',
    color: 'Emerald',
    dimensions: { widthMm: 2800, depthMm: 1000, heightMm: 800 },
    priceUsd: 2499,
    imageUrl: 'https://drive.google.com/file/d/1j3X2SWw8e9ZYgFMFYJ_YQHMJTtp8AbB_/view?usp=drive_link',
  },
];

export function uniqueManufacturers(): string[] {
  return Array.from(new Set(FURNITURE_DATA.map((f) => f.manufacturer))).sort();
}

export function uniqueColors(): string[] {
  return Array.from(new Set(FURNITURE_DATA.map((f) => f.color))).sort();
}

export function uniqueCategories(): string[] {
  return Array.from(new Set(FURNITURE_DATA.map((f) => f.category))).sort();
}

export function priceBounds(): { min: number; max: number } {
  const priced = FURNITURE_DATA.map((f) => f.priceUsd ?? 0).filter((p) => p > 0)
  const min = priced.length ? Math.min(...priced) : 0
  const max = priced.length ? Math.max(...priced) : 0
  return { min, max }
}

