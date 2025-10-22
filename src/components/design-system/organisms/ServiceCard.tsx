import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    otc_range: string;
    monthly_range: string;
    info: string[];
    features: string[];
  };
  onSelect: (serviceId: string, serviceName: string) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  className
}) => {
  return (
    <Card 
      className={`hover:scale-105 transition-transform duration-300 h-full flex flex-col ${className}`}
      hover
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-emerald-400 text-lg mb-2">
              {service.name}
            </CardTitle>
            <p className="text-slate-400 text-sm italic">
              {service.description}
            </p>
          </div>
          <Badge variant="outline" size="sm">
            Service
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 flex-1 flex flex-col">
        {/* Pricing */}
        <div className="space-y-3">
          <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded px-3 py-2">
            <div className="text-xs uppercase font-semibold text-emerald-400">
              OTC (One Time)
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {service.otc_range}
            </div>
          </div>
          
          <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded px-3 py-2">
            <div className="text-xs uppercase font-semibold text-emerald-400">
              Monthly (Min. 6 Bulan)
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {service.monthly_range}
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Fitur Unggulan</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Informasi Tambahan</h4>
          <ul className="space-y-1">
            {service.info.map((info, index) => (
              <li key={index} className="text-xs text-slate-400">
                • {info}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4 mt-auto">
          <Button
            onClick={() => onSelect(service.id, service.name)}
            className="w-full"
            size="sm"
          >
            Pilih & Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
