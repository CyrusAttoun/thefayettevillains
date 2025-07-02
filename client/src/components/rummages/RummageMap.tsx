
import { useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/simple-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { MapPin, Plus, List, Bookmark, Map } from "../icons";
import { RummageSaleForm } from "./RummageSaleForm";
import { RummageSearchFilters } from "./RummageSearchFilters";
import { RummageSaleCard } from "./RummageSaleCard";
import { BookmarkedSales } from "../BookmarkedSales";
import { RummageSale, SearchFilters, BookmarkedSale } from "../../types/rummage";

// Mock data - in a real app this would come from a database
const mockSales: RummageSale[] = [
  {
    id: "1",
    title: "Multi-Family Sale - Wilson Park",
    description: "Huge selection! Clothes, toys, furniture, electronics, and household items. Something for everyone!",
    saleType: "rummage",
    address: "123 Wilson Park Dr, Fayetteville, AR",
    startDate: "2025-07-05T00:00:00Z",
    startTime: "08:00",
    photos: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"],
    createdBy: "johnson-family",
    createdAt: "2025-07-01T00:00:00Z",
    updatedAt: "2025-07-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Estate Sale - Antiques & Collectibles",
    description: "Beautiful vintage furniture, china, books, and collectibles. Preview Friday 4-6 PM.",
    saleType: "estate",
    address: "456 Historic St, Fayetteville, AR",
    startDate: "2025-07-06T00:00:00Z",
    endDate: "2025-07-07T00:00:00Z",
    startTime: "09:00",
    photos: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
    createdBy: "estate-services",
    createdAt: "2025-06-30T00:00:00Z",
    updatedAt: "2025-06-30T00:00:00Z",
  },
  {
    id: "3",
    title: "Moving Sale - Everything Must Go!",
    description: "Tools, appliances, outdoor furniture, and much more. Prices negotiable!",
    saleType: "rummage",
    address: "789 Springdale Rd, Fayetteville, AR",
    startDate: "2025-07-04T00:00:00Z",
    startTime: "07:00",
    photos: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"],
    createdBy: "roberts-family",
    createdAt: "2025-07-01T00:00:00Z",
    updatedAt: "2025-07-01T00:00:00Z",
  },
];

const RummageMap = () => {
  const [sales, setSales] = useState<RummageSale[]>(mockSales);
  const [bookmarkedSales, setBookmarkedSales] = useState<BookmarkedSale[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSale, setEditingSale] = useState<RummageSale | null>(null);
  const [activeTab, setActiveTab] = useState("list");
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    saleType: "",
    dateRange: "",
    location: "",
  });

  const handleCreateSale = (saleData: Omit<RummageSale, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSale: RummageSale = {
      ...saleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSales([newSale, ...sales]);
    setShowCreateForm(false);
  };

  const handleEditSale = (saleData: Omit<RummageSale, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingSale) return;
    
    const updatedSale: RummageSale = {
      ...saleData,
      id: editingSale.id,
      createdAt: editingSale.createdAt,
      updatedAt: new Date().toISOString(),
    };
    
    setSales(sales.map(sale => sale.id === editingSale.id ? updatedSale : sale));
    setEditingSale(null);
  };

  const handleDeleteSale = (saleId: string) => {
    setSales(sales.filter(sale => sale.id !== saleId));
    setBookmarkedSales(bookmarkedSales.filter(bookmark => bookmark.saleId !== saleId));
  };

  const handleBookmarkSale = (saleId: string) => {
    const isBookmarked = bookmarkedSales.some(bookmark => bookmark.saleId === saleId);
    
    if (isBookmarked) {
      setBookmarkedSales(bookmarkedSales.filter(bookmark => bookmark.saleId !== saleId));
    } else {
      const newBookmark: BookmarkedSale = {
        id: Date.now().toString(),
        saleId,
        userId: "current-user",
        createdAt: new Date().toISOString(),
      };
      setBookmarkedSales([...bookmarkedSales, newBookmark]);
    }
  };

  const handleShareSale = (sale: RummageSale) => {
    const shareUrl = `${window.location.origin}/rummage/${sale.id}`;
    navigator.clipboard.writeText(shareUrl);
    // In a real app, you'd show a toast notification here
    console.log("Sale link copied to clipboard:", shareUrl);
  };

  const handleShareBookmarkedList = () => {
    const bookmarkIds = bookmarkedSales.map(b => b.saleId).join(',');
    const shareUrl = `${window.location.origin}/rummage/list/${btoa(bookmarkIds)}`;
    return shareUrl;
  };

  const filteredSales = sales.filter(sale => {
    if (filters.query && !sale.title.toLowerCase().includes(filters.query.toLowerCase()) && 
        !sale.description.toLowerCase().includes(filters.query.toLowerCase())) {
      return false;
    }
    if (filters.saleType && sale.saleType !== filters.saleType) {
      return false;
    }
    // Add more filter logic here for date range and location
    return true;
  });

  const bookmarkedSalesWithData = bookmarkedSales.map(bookmark => ({
    ...bookmark,
    sale: sales.find(sale => sale.id === bookmark.saleId)!,
  })).filter(item => item.sale);

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MapPin style={{ height: '2.5rem', width: '2.5rem', color: '#ea580c', marginRight: '1rem' }} />
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Rummage Sale Map</h1>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', margin: 0 }}>Find yard sales, estate sales, and treasure hunts near you</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            style={{ backgroundColor: '#ea580c', color: 'white' }}
          >
            <Plus style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
            Post Your Sale
          </Button>
        </div>

        {/* Search and Filters */}
        <div style={{ marginBottom: '2rem' }}>
          <RummageSearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSaveSearch={(filters) => console.log("Save search:", filters)}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <TabsList style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '100%' }}>
            <TabsTrigger value="list" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <List style={{ height: '1rem', width: '1rem' }} />
              Sales List ({filteredSales.length})
            </TabsTrigger>
            <TabsTrigger value="map" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Map style={{ height: '1rem', width: '1rem' }} />
              Map View
            </TabsTrigger>
            <TabsTrigger value="bookmarks" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bookmark style={{ height: '1rem', width: '1rem' }} />
              My Bookmarks ({bookmarkedSales.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredSales.map((sale) => (
                <RummageSaleCard
                  key={sale.id}
                  sale={sale}
                  isBookmarked={bookmarkedSales.some(b => b.saleId === sale.id)}
                  canEdit={sale.createdBy === "current-user"} // Mock auth check
                  onBookmark={handleBookmarkSale}
                  onEdit={setEditingSale}
                  onDelete={handleDeleteSale}
                  onShare={handleShareSale}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div style={{ 
              background: 'linear-gradient(to bottom right, #fed7aa, #fecaca)',
              borderRadius: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <MapPin style={{ height: '4rem', width: '4rem', color: '#ea580c', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Interactive Map Coming Soon!</h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>We're working on an interactive map to help you find sales near you.</p>
              <Button style={{ backgroundColor: '#ea580c', color: 'white' }}>
                Get Notified When It's Ready
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="bookmarks">
            <BookmarkedSales
              bookmarkedSales={bookmarkedSalesWithData}
              onRemoveBookmark={handleBookmarkSale}
              onShareList={handleShareBookmarkedList}
            />
          </TabsContent>
        </Tabs>

        {/* Create Sale Dialog */}
        <Dialog.Root open={showCreateForm} onOpenChange={setShowCreateForm}>
          <Dialog.Portal>
            <Dialog.Overlay style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'fixed',
              inset: 0,
              zIndex: 50
            }} />
            <Dialog.Content style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '64rem',
              maxHeight: '90vh',
              width: '90vw',
              overflowY: 'auto',
              padding: '1.5rem',
              zIndex: 50
            }}>
              <Dialog.Title style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Create New Sale
              </Dialog.Title>
              <RummageSaleForm
                onSubmit={handleCreateSale}
                onCancel={() => setShowCreateForm(false)}
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Edit Sale Dialog */}
        <Dialog.Root open={!!editingSale} onOpenChange={(open) => !open && setEditingSale(null)}>
          <Dialog.Portal>
            <Dialog.Overlay style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'fixed',
              inset: 0,
              zIndex: 50
            }} />
            <Dialog.Content style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '64rem',
              maxHeight: '90vh',
              width: '90vw',
              overflowY: 'auto',
              padding: '1.5rem',
              zIndex: 50
            }}>
              <Dialog.Title style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Edit Sale
              </Dialog.Title>
              {editingSale && (
                <RummageSaleForm
                  sale={editingSale}
                  onSubmit={handleEditSale}
                  onCancel={() => setEditingSale(null)}
                />
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default RummageMap;