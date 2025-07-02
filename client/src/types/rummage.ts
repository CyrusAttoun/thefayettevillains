
export interface RummageSale {
  id: string;
  title: string;
  description: string;
  saleType: 'rummage' | 'estate' | 'auction' | 'other';
  address: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  photos: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  query: string;
  saleType: string;
  dateRange: string;
  location: string;
}

export interface SavedSearch {
  id: string;
  query: string;
  filters: SearchFilters;
  userId: string;
  notifyEmail: boolean;
  createdAt: string;
}

export interface BookmarkedSale {
  id: string;
  saleId: string;
  userId: string;
  createdAt: string;
}