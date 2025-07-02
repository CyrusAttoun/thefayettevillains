import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/simple-select";
import { Search, Filter, Bell, BellOff } from "../icons";
import { SearchFilters } from "../../types/rummage";

interface RummageSearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSaveSearch?: (filters: SearchFilters) => void;
  hasSavedSearch?: boolean;
}

export const RummageSearchFilters = ({
  filters,
  onFiltersChange,
  onSaveSearch,
  hasSavedSearch = false,
}: RummageSearchFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleQueryChange = (query: string) => {
    onFiltersChange({ ...filters, query });
  };

  const handleSaleTypeChange = (saleType: string) => {
    onFiltersChange({ ...filters, saleType });
  };

  const handleDateRangeChange = (dateRange: string) => {
    onFiltersChange({ ...filters, dateRange });
  };

  const handleLocationChange = (location: string) => {
    onFiltersChange({ ...filters, location });
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', height: '1.25rem', width: '1.25rem' }} />
          <Input
            placeholder="Search for items, keywords..."
            value={filters.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Filter style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
            {showAdvanced ? 'Hide' : 'Show'} Filters
          </Button>
          {onSaveSearch && (
            <Button
              variant="outline"
              onClick={() => onSaveSearch(filters)}
              style={{ 
                backgroundColor: hasSavedSearch ? '#fed7aa' : 'transparent',
                color: '#ea580c'
              }}
            >
              {hasSavedSearch ? <Bell style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} /> : <BellOff style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />}
              {hasSavedSearch ? 'Notifications On' : 'Notify Me'}
            </Button>
          )}
        </div>
      </div>

      {showAdvanced && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6', marginTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Sale Type</label>
            <Select value={filters.saleType} onValueChange={handleSaleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="rummage">Rummage Sale</SelectItem>
                <SelectItem value="estate">Estate Sale</SelectItem>
                <SelectItem value="auction">Auction</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Date Range</label>
            <Select value={filters.dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="weekend">This Weekend</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Location</label>
            <Input
              placeholder="City or ZIP code"
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};