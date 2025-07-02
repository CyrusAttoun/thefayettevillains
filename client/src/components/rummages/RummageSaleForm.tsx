
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/simple-popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/simple-select";
import { format } from "../../lib/date-utils";
import { CalendarIcon, Plus, X } from "../icons";
import { RummageSale } from "../../types/rummage";

interface RummageSaleFormProps {
  sale?: RummageSale;
  onSubmit: (sale: Omit<RummageSale, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const RummageSaleForm = ({ sale, onSubmit, onCancel }: RummageSaleFormProps) => {
  const [title, setTitle] = useState(sale?.title || "");
  const [description, setDescription] = useState(sale?.description || "");
  const [saleType, setSaleType] = useState<RummageSale['saleType']>(sale?.saleType || "rummage");
  const [address, setAddress] = useState(sale?.address || "");
  const [startDate, setStartDate] = useState<Date | undefined>(
    sale?.startDate ? new Date(sale.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    sale?.endDate ? new Date(sale.endDate) : undefined
  );
  const [startTime, setStartTime] = useState(sale?.startTime || "");
  const [photos, setPhotos] = useState<string[]>(sale?.photos || []);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotos([...photos, newPhotoUrl.trim()]);
      setNewPhotoUrl("");
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) return;

    onSubmit({
      title,
      description,
      saleType,
      address,
      startDate: startDate.toISOString(),
      endDate: endDate?.toISOString(),
      startTime,
      photos,
      createdBy: "current-user", // This would come from auth
    });
  };

  return (
    <Card style={{ width: '100%', maxWidth: '48rem', margin: '0 auto' }}>
      <CardHeader>
        <CardTitle>{sale ? 'Edit Sale' : 'Create New Sale'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="title">Sale Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Multi-Family Garage Sale"
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="saleType">Sale Type</Label>
            <Select value={saleType} onValueChange={(value: string) => setSaleType(value as RummageSale['saleType'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rummage">Rummage Sale</SelectItem>
                <SelectItem value="estate">Estate Sale</SelectItem>
                <SelectItem value="auction">Auction</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, Fayetteville, AR"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      fontWeight: 'normal',
                      color: !startDate ? '#9ca3af' : 'inherit'
                    }}
                  >
                    <CalendarIcon style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent style={{ width: 'auto', padding: 0 }} align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    style={{ padding: '0.75rem' }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Label>End Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      fontWeight: 'normal',
                      color: !endDate ? '#9ca3af' : 'inherit'
                    }}
                  >
                    <CalendarIcon style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent style={{ width: 'auto', padding: 0 }} align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    style={{ padding: '0.75rem' }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what items you'll have for sale..."
              rows={4}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Label>Photos</Label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Input
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Enter photo URL"
              />
              <Button type="button" onClick={handleAddPhoto} size="sm">
                <Plus style={{ height: '1rem', width: '1rem' }} />
              </Button>
            </div>
            {photos.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {photos.map((photo, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={photo}
                      alt={`Sale photo ${index + 1}`}
                      style={{ width: '100%', height: '6rem', objectFit: 'cover', borderRadius: '0.375rem' }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', height: '1.5rem', width: '1.5rem', padding: 0 }}
                      onClick={() => handleRemovePhoto(index)}
                    >
                      <X style={{ height: '0.75rem', width: '0.75rem' }} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button type="submit" style={{ flex: 1 }}>
              {sale ? 'Update Sale' : 'Create Sale'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};