import React from 'react';
import { Button } from './ui/button';
import { RummageSaleCard } from './rummages/RummageSaleCard';

interface BookmarkedSale {
  id: string;
  saleId: string;
  userId: string;
  createdAt: string;
  sale: any; // RummageSale type
}

interface BookmarkedSalesProps {
  bookmarkedSales: BookmarkedSale[];
  onRemoveBookmark: (saleId: string) => void;
  onShareList: () => string;
}

export const BookmarkedSales: React.FC<BookmarkedSalesProps> = ({
  bookmarkedSales,
  onRemoveBookmark,
  onShareList
}) => {
  if (bookmarkedSales.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          No bookmarked sales yet
        </h3>
        <p style={{ color: '#6b7280' }}>
          Start bookmarking sales you're interested in to see them here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
          My Bookmarked Sales ({bookmarkedSales.length})
        </h3>
        <Button onClick={() => {
          const url = onShareList();
          navigator.clipboard.writeText(url);
        }}>
          Share List
        </Button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {bookmarkedSales.map((bookmark) => (
          <RummageSaleCard
            key={bookmark.id}
            sale={bookmark.sale}
            isBookmarked={true}
            onBookmark={onRemoveBookmark}
          />
        ))}
      </div>
    </div>
  );
};