"use client";

import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { Select, SelectOption } from '../atoms/Select';
import { ColorPicker } from '../molecules/ColorPicker';
import { FormField } from '../molecules/FormField';
import { Card, CardContent, CardHeader, CardTitle } from '../atoms/Card';
import { FaCheckCircle } from 'react-icons/fa';

export interface OrderFormData {
  customerName: string;
  whatsapp: string;
  websiteName: string;
  companyName: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
  service: string;
  serviceId: string;
}

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
}

export interface OrderFormProps {
  services: ServiceOption[];
  loading?: boolean;
  onSubmit: (data: OrderFormData) => void;
  onCancel?: () => void;
  className?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  services,
  loading = false,
  onSubmit,
  onCancel,
  className
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    whatsapp: '',
    websiteName: '',
    companyName: '',
    description: '',
    colorPrimary: '#10b981',
    colorSecondary: '#1e293b',
    service: '',
    serviceId: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const serviceOptions: SelectOption[] = services.map(service => ({
    value: service.name,
    label: service.name,
    disabled: false
  }));

  const handleInputChange = (field: keyof OrderFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    
    if (field === 'service' && e.target instanceof HTMLSelectElement) {
      const selectedOption = e.target.selectedOptions[0];
      const serviceId = selectedOption?.getAttribute('data-service-id') || '';
      setFormData(prev => ({
        ...prev,
        service: value,
        serviceId: serviceId
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (field: 'colorPrimary' | 'colorSecondary') => (color: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: color
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-12">
          <div className="flex items-center justify-center gap-3 text-emerald-400 font-semibold text-lg">
            <FaCheckCircle className="w-6 h-6" />
            Terima kasih! Pesanan Anda diterima. Mohon tunggu konfirmasi.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Form Pemesanan Website</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Data Pemesan</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Nama" required>
                <Input
                  value={formData.customerName}
                  onChange={handleInputChange('customerName')}
                  placeholder="Nama lengkap"
                  required
                />
              </FormField>
              
              <FormField label="Nomor WhatsApp" required>
                <Input
                  value={formData.whatsapp}
                  onChange={handleInputChange('whatsapp')}
                  placeholder="08xxxx / 62xxxx"
                  required
                />
              </FormField>
            </div>
          </div>

          {/* Website Details */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Detail Website</h3>
            <div className="space-y-4">
              <FormField label="Pilih Paket/Service" required>
                <Select
                  value={formData.service}
                  onChange={handleInputChange('service')}
                  options={serviceOptions}
                  placeholder="Pilih paket service"
                  required
                />
              </FormField>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Nama Website" required>
                  <Input
                    value={formData.websiteName}
                    onChange={handleInputChange('websiteName')}
                    placeholder="contoh: mystartup.id"
                    required
                  />
                </FormField>
                
                <FormField label="Nama Perusahaan" required>
                  <Input
                    value={formData.companyName}
                    onChange={handleInputChange('companyName')}
                    placeholder="contoh: PT Maju Jaya"
                    required
                  />
                </FormField>
              </div>
              
              <FormField label="Deskripsi" required>
                <Textarea
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  placeholder="Tuliskan deskripsi kebutuhan website anda..."
                  rows={4}
                  required
                />
              </FormField>
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Warna</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <ColorPicker
                label="Warna Primer"
                value={formData.colorPrimary}
                onChange={handleColorChange('colorPrimary')}
              />
              
              <ColorPicker
                label="Warna Sekunder"
                value={formData.colorSecondary}
                onChange={handleColorChange('colorSecondary')}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="flex-1 sm:flex-none"
            >
              {loading ? 'Mengirim...' : 'Kirim Pesanan'}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 sm:flex-none"
              >
                Batal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
