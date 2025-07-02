
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Share2,
  Edit,
  Trash2,
  Eye,
} from "../icons";
import { RummageSale } from "../../types/rummage";
import { format } from "../../lib/date-utils";

interface RummageSaleCardProps {
  sale: RummageSale;
  isBookmarked?: boolean;
  canEdit?: boolean;
  onBookmark?: (saleId: string) => void;
  onEdit?: (sale: RummageSale) => void;
  onDelete?: (saleId: string) => void;
  onShare?: (sale: RummageSale) => void;
  onView?: (sale: RummageSale) => void;
}

export const RummageSaleCard = ({
  sale,
  isBookmarked = false,
  canEdit = false,
  onBookmark,
  onEdit,
  onDelete,
  onShare,
  onView,
}: RummageSaleCardProps) => {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const formatSaleType = (type: string) => {
    switch (type) {
      case 'rummage': return 'Rummage Sale';
      case 'estate': return 'Estate Sale';
      case 'auction': return 'Auction';
      default: return 'Sale';
    }
  };

  const formatDateRange = () => {
    const start = new Date(sale.startDate);
    const end = sale.endDate ? new Date(sale.endDate) : null;
    
    if (end && start.toDateString() !== end.toDateString()) {
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    }
    return format(start, 'MMM d, yyyy');
  };

  const validPhotos = sale.photos.filter((_, index) => !imageError[index]);

  return (
    <Card style={{ 
      transition: 'all 0.3s ease',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      overflow: 'hidden'
    }}>
      {validPhotos.length > 0 && (
        <div style={{ position: 'relative', height: '12rem', overflow: 'hidden' }}>
          <img
            src={validPhotos[0]}
            alt={sale.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onError={() => setImageError({ ...imageError, 0: true })}
          />
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
            <Badge style={{ backgroundColor: '#f97316', color: 'white' }}>
              {formatSaleType(sale.saleType)}
            </Badge>
          </div>
          {validPhotos.length > 1 && (
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
              <Badge variant="secondary">
                +{validPhotos.length - 1} photos
              </Badge>
            </div>
          )}
        </div>
      )}

      <CardContent style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3 style={{ 
            fontWeight: '600', 
            fontSize: '1.125rem', 
            color: '#111827',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {sale.title}
          </h3>
          {onBookmark && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBookmark(sale.id)}
              style={{ color: isBookmarked ? '#ef4444' : '#9ca3af' }}
            >
              <Heart style={{ 
                height: '1rem', 
                width: '1rem',
                fill: isBookmarked ? 'currentColor' : 'none'
              }} />
            </Button>
          )}
        </div>

        <p style={{ 
          color: '#6b7280', 
          marginBottom: '0.75rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {sale.description}
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            <Calendar style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
            {formatDateRange()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            <Clock style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
            {sale.startTime}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            <MapPin style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
            {sale.address}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {onView && (
              <Button variant="outline" size="sm" onClick={() => onView(sale)}>
                <Eye style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                View
              </Button>
            )}
            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(sale)}
                style={{ color: '#6b7280' }}
              >
                <Share2 style={{ height: '1rem', width: '1rem' }} />
              </Button>
            )}
          </div>

          {canEdit && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(sale)}
                  style={{ color: '#6b7280' }}
                >
                  <Edit style={{ height: '1rem', width: '1rem' }} />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(sale.id)}
                  style={{ color: '#6b7280' }}
                >
                  <Trash2 style={{ height: '1rem', width: '1rem' }} />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};