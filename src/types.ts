export type Dimensions = {
  widthMm: number;
  depthMm: number;
  heightMm: number;
};

export type Furniture = {
  id: string;
  category: 'sofa' | 'coffee_table' | 'side_table' | 'chair' | 'bed' | 'storage' | 'lighting' | 'desk' | 'dining_table';
  manufacturer: string;
  name: string;
  color: string;
  dimensions: Dimensions;
  materials?: string[];
  priceUsd?: number;
  imageUrl?: string;
};

export type FurnitureFilters = {
  query?: string;
  manufacturer?: string;
  color?: string;
  category?: Furniture['category'];
  minPriceUsd?: number;
  maxPriceUsd?: number;
};

export type SavedProject = {
  id: string;
  name: string;
  itemIds: string[];
  createdAt: string; // ISO string
};

export function formatDimensions(dim: Dimensions): string {
  const toInches = (mm: number) => Math.round((mm / 25.4) * 10) / 10;
  return `${dim.widthMm}×${dim.depthMm}×${dim.heightMm} mm (${toInches(dim.widthMm)}×${toInches(dim.depthMm)}×${toInches(dim.heightMm)} in)`;
}

