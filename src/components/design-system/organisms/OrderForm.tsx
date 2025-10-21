"use client";

import React, { useState, useEffect } from 'react';
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
  selectedService?: { id: string; name: string } | null;
  isSuccess?: boolean;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  services,
  loading = false,
  onSubmit,
  onCancel,
  className,
  selectedService,
  isSuccess = false
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(5);

  // Validate WhatsApp number
  const validateWhatsApp = (whatsapp: string): string => {
    if (!whatsapp) return 'Nomor WhatsApp wajib diisi';
    
    // Remove all non-digit characters
    const cleanNumber = whatsapp.replace(/\D/g, '');
    
    // Check if starts with 62
    if (cleanNumber.startsWith('62')) {
      // Must be 10-13 digits after 62 (total 12-15 digits)
      if (cleanNumber.length >= 12 && cleanNumber.length <= 15) {
        return '';
      }
      return 'Nomor WhatsApp harus 10-13 digit setelah 62';
    }
    
    // Check if starts with 08 (convert to 62)
    if (cleanNumber.startsWith('08')) {
      const convertedNumber = '62' + cleanNumber.substring(1);
      if (convertedNumber.length >= 12 && convertedNumber.length <= 15) {
        return '';
      }
      return 'Nomor WhatsApp harus 10-13 digit setelah 08';
    }
    
    return 'Nomor WhatsApp harus dimulai dengan 62 atau 08';
  };

  // Set selected service when prop changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        service: selectedService.name,
        serviceId: selectedService.id
      }));
    }
  }, [selectedService]);

  // Auto refresh page after 5 seconds when success
  useEffect(() => {
    if (isSuccess) {
      setCountdown(5);
      
      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            window.location.reload();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [isSuccess]);

  const serviceOptions: SelectOption[] = services.map(service => ({
    value: service.name,
    label: service.name,
    disabled: false
  }));

  // Format WhatsApp number
  const formatWhatsApp = (value: string): string => {
    // Remove all non-digit characters
    const cleanNumber = value.replace(/\D/g, '');
    
    // If starts with 08, convert to 62
    if (cleanNumber.startsWith('08')) {
      return '62' + cleanNumber.substring(1);
    }
    
    // If starts with 62, keep as is
    if (cleanNumber.startsWith('62')) {
      return cleanNumber;
    }
    
    // If starts with other numbers, add 62
    if (cleanNumber.length > 0 && !cleanNumber.startsWith('62') && !cleanNumber.startsWith('08')) {
      return '62' + cleanNumber;
    }
    
    return cleanNumber;
  };

  const handleInputChange = (field: keyof OrderFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;
    
    // Special handling for WhatsApp field
    if (field === 'whatsapp') {
      value = formatWhatsApp(value);
      // Validate WhatsApp number
      const error = validateWhatsApp(value);
      setErrors(prev => ({
        ...prev,
        whatsapp: error
      }));
    }
    
    if (field === 'service' && e.target instanceof HTMLSelectElement) {
      // Find the service by name to get the correct serviceId
      const selectedService = services.find(service => service.name === value);
      const serviceId = selectedService?.id || '';
      setFormData(prev => ({
        ...prev,
        service: value,
        serviceId: serviceId
      }));
      
      // Clear any service selection error
      setErrors(prev => ({
        ...prev,
        service: ''
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
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    
    // Validate WhatsApp
    const whatsappError = validateWhatsApp(formData.whatsapp);
    if (whatsappError) {
      newErrors.whatsapp = whatsappError;
    }
    
    // Validate other required fields
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Nama wajib diisi';
    }
    if (!formData.websiteName.trim()) {
      newErrors.websiteName = 'Nama website wajib diisi';
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Nama perusahaan wajib diisi';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi wajib diisi';
    }
    if (!formData.service) {
      newErrors.service = 'Service wajib dipilih';
    }
    
    setErrors(newErrors);
    
    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  if (isSuccess) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 text-emerald-400 font-semibold text-xl">
              <FaCheckCircle className="w-8 h-8" />
              Terima Kasih!
            </div>
            <div className="text-slate-300 text-lg">
              Pesanan Anda telah berhasil dikirim
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <div className="text-slate-200 font-medium mb-2">
                Langkah Selanjutnya:
              </div>
              <div className="text-slate-300 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">1.</span>
                  <span>Tim Soulcode akan menghubungi Anda melalui WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">2.</span>
                  <span>Kami akan mendiskusikan detail proyek dan timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">3.</span>
                  <span>Proses development akan dimulai setelah konfirmasi</span>
                </div>
              </div>
            </div>
            <div className="text-slate-400 text-sm mb-4">
              Mohon tunggu konfirmasi dalam 1x24 jam
            </div>
            <div className="text-slate-500 text-xs mb-6">
              Halaman akan di-refresh otomatis dalam {countdown} detik...
            </div>
            {onCancel && (
              <Button
                onClick={onCancel}
                variant="outline"
                className="mt-4"
              >
                Kembali ke Katalog
              </Button>
            )}
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
              
              <FormField label="Nomor WhatsApp" required error={errors.whatsapp}>
                <Input
                  value={formData.whatsapp}
                  onChange={handleInputChange('whatsapp')}
                  placeholder="08xxxxxxxxx atau 62xxxxxxxxx"
                  required
                  helperText="Format: 08xxxxxxxxx atau 62xxxxxxxxx (10-13 digit)"
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
                {selectedService && formData.service === selectedService.name && (
                  <p className="text-sm text-emerald-400 mt-1">
                    ✓ Service &quot;{selectedService.name}&quot; telah dipilih
                  </p>
                )}
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
