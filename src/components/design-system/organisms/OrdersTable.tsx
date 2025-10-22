"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { Card, CardContent } from '../atoms/Card';
import { FaSave, FaEye, FaWhatsapp } from 'react-icons/fa';

export interface OrderItem {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  whatsapp: string;
  websiteName: string;
  companyName: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
  status: string;
  createdAt: string;
  totalPrice: number;
}

export interface OrdersTableProps {
  orders: OrderItem[];
  loading?: boolean;
  onUpdateOrder: (id: string, data: Partial<OrderItem>) => Promise<void>;
  onPreviewInvoice: (order: OrderItem) => void;
  className?: string;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  loading = false,
  onUpdateOrder,
  onPreviewInvoice,
  className
}) => {
  const [savingId, setSavingId] = useState<string | null>(null);
  const [localOrders, setLocalOrders] = useState<OrderItem[]>(orders);

  // Sync localOrders with orders prop when it changes
  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handlePriceChange = (id: string, price: number) => {
    setLocalOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, totalPrice: price } : order
      )
    );
  };

  const handleSave = async (order: OrderItem) => {
    try {
      setSavingId(order.id);
      await onUpdateOrder(order.id, {
        serviceId: order.serviceId,
        customerName: order.customerName,
        whatsapp: order.whatsapp,
        websiteName: order.websiteName,
        companyName: order.companyName,
        description: order.description,
        colorPrimary: order.colorPrimary,
        colorSecondary: order.colorSecondary,
        totalPrice: order.totalPrice,
      });
    } catch (error) {
      console.error('Failed to save order:', error);
      alert('Gagal menyimpan total price');
    } finally {
      setSavingId(null);
    }
  };

  const handlePreview = (order: OrderItem) => {
    if (!order.totalPrice || order.totalPrice <= 0) {
      alert('Set total price terlebih dahulu');
      return;
    }
    onPreviewInvoice(order);
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-12">
          <div className="text-slate-400">Loading orders...</div>
        </CardContent>
      </Card>
    );
  }

  if (!localOrders || localOrders.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-12">
          <div className="text-slate-400">No orders found</div>
        </CardContent>
      </Card>
    );
  }

  console.log('localOrders', localOrders);

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">WhatsApp</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Website</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Colors</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Actions</th>
                <th className="p-3 text-left">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {localOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="odd:bg-slate-800 even:bg-slate-700"
                >
                  <td className="p-3 whitespace-nowrap text-slate-100">
                    {order.id}
                  </td>
                  
                  <td className="p-3">
                    <div className="font-medium text-slate-100">
                      {order.customerName}
                    </div>
                  </td>
                  
                  <td className="p-3">
                    <a 
                      className="text-emerald-600 hover:text-emerald-700 flex items-center justify-center" 
                      href={`https://wa.me/${order.whatsapp}?text=Halo%2C%20saya%20terkait%20dengan%20order%20${order.serviceName}%20untuk%20${order.customerName}.%20Bisa%20saya%20konsultasi%20lebih%20lanjut%3F`} 
                      target="_blank" 
                      rel="noreferrer"
                      title={`WhatsApp: ${order.whatsapp}`}
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                  </td>
                  
                  <td className="p-3 whitespace-nowrap text-slate-100">
                      {order.serviceName}
                  </td>
                  
                  <td className="p-3">
                    <div className="font-medium text-slate-100">{order.websiteName}</div>
                  </td>
                  
                  <td className="p-3">
                    <div className="text-slate-300">
                      {order.companyName}
                    </div>
                  </td>
                  
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border border-slate-300" 
                        style={{ backgroundColor: order.colorPrimary }}
                      />
                      <div 
                        className="w-4 h-4 rounded border border-slate-300" 
                        style={{ backgroundColor: order.colorSecondary }}
                      />
                    </div>
                  </td>
                  
                  <td className="p-3 max-w-[28rem]">
                    <div className="line-clamp-4 whitespace-pre-wrap text-slate-300">
                      {order.description}
                    </div>
                  </td>
                  
                  <td className="p-3 w-40">
                    <input
                      type="number"
                      className="w-full min-w-40 bg-slate-900 border border-slate-500 rounded px-2 py-1 text-sm text-slate-100" 
                      value={order.totalPrice}
                      onChange={(e) => handlePriceChange(order.id, Number(e.target.value))}
                    />
                  </td>

                  <td className="p-3 w-28 text-slate-100">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  
                  <td className="p-3 w-28">
                    <Button
                      size="sm"
                      onClick={() => handleSave(order)}
                      disabled={savingId === order.id}
                      loading={savingId === order.id}
                      leftIcon={<FaSave className="w-3 h-3" />}
                    >
                      {savingId === order.id ? 'Saving...' : 'Save'}
                    </Button>
                  </td>
                  
                  <td className="p-3 w-36">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handlePreview(order)}
                      disabled={!order.totalPrice || order.totalPrice <= 0}
                      leftIcon={<FaEye className="w-3 h-3" />}
                    >
                      Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
