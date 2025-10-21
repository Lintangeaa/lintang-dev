"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '../atoms/Button';
import { OrderItem } from '@/lib/api/ordersClient';

interface InvoicePreviewProps {
  order: OrderItem;
  invoiceNo: string;
  onInvoiceNoChange: (value: string) => void;
  onPrint: () => void;
  onDownload: () => void;
  onClose: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  order,
  invoiceNo,
  onInvoiceNoChange,
  onPrint,
  onDownload,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 print:bg-transparent">
      <div 
        id="invoice-print-area" 
        className="print-area bg-white text-slate-900 w-[840px] max-w-full max-h-[90vh] overflow-auto rounded-lg shadow-xl print:shadow-none print:bg-white print:w-full print:max-w-none print:h-auto print:max-h-none"
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between border-b px-6 py-4 sticky top-0 bg-white print:hidden">
          <h2 className="font-semibold">Invoice Preview</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrint}
            >
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
            >
              Download PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 print:p-0">
          {/* Header Section */}
          <div className="border-b pb-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="/images/soulcode-logo.png" 
                alt="Soulcode" 
                width={120} 
                height={120} 
                className="h-12 w-auto" 
              />
              <div>
                <div className="text-2xl font-bold tracking-wide">SOULCODE</div>
                <div className="text-xs text-slate-500 tracking-wide uppercase">Where Code Meets Soul</div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="text-sm text-slate-600">Invoice</div>
              <div className="flex items-center justify-end gap-3">
                <div className="hidden print:flex items-center gap-2">
                  <span 
                    className="inline-block w-4 h-4 rounded border border-slate-300" 
                    style={{ backgroundColor: order.colorPrimary }} 
                  />
                  <span 
                    className="inline-block w-4 h-4 rounded border border-slate-300" 
                    style={{ backgroundColor: order.colorSecondary }} 
                  />
                </div>
                <input
                  className="print:hidden border border-slate-300 rounded px-2 py-1 text-sm w-48"
                  value={invoiceNo}
                  onChange={(e) => onInvoiceNoChange(e.target.value)}
                  placeholder="Invoice No"
                />
                <div className="print:block hidden text-sm font-semibold">{invoiceNo}</div>
              </div>
            </div>
          </div>

          {/* Colors Section */}
          <div className="flex items-center gap-2 mb-6 print:hidden">
            <span className="text-xs text-slate-500">Colors:</span>
            <span 
              className="inline-block w-4 h-4 rounded border border-slate-300" 
              style={{ backgroundColor: order.colorPrimary }} 
            />
            <span 
              className="inline-block w-4 h-4 rounded border border-slate-300" 
              style={{ backgroundColor: order.colorSecondary }} 
            />
            <span className="text-xs text-slate-600">
              {order.colorPrimary} / {order.colorSecondary}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-xs text-slate-500">Invoice ID</div>
              <div className="font-semibold">{order.id}</div>
              <div className="text-xs text-slate-500 mt-3">Date</div>
              <div>{new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Total</div>
              <div className="text-2xl font-bold text-emerald-600">
                Rp {order.totalPrice.toLocaleString('id-ID')}
              </div>
            </div>
          </div>

          {/* Bill To & Project Info */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-xs text-slate-500">Bill To</div>
              <div className="font-semibold">{order.customerName}</div>
              <div>{order.companyName}</div>
              <div className="text-sm text-slate-600">WA: {order.whatsapp}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Project</div>
              <div className="font-semibold">{order.websiteName}</div>
              <div className="text-sm text-slate-600">Service ID: {order.serviceId}</div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3">Item</th>
                <th className="text-left p-3">Description</th>
                <th className="text-right p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Website Service</td>
                <td className="p-3 whitespace-pre-wrap">
                  {order.description}
                  <div className="text-xs text-slate-500 mt-2 italic">
                    Service ID: {order.serviceId}<br />
                    Website: {order.websiteName}<br />
                    Colors: {order.colorPrimary} / {order.colorSecondary}
                  </div>
                </td>
                <td className="p-3 text-right">
                  Rp {order.totalPrice.toLocaleString('id-ID')}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="p-3" colSpan={2}></td>
                <td className="p-3 text-right text-xl font-bold">
                  Rp {order.totalPrice.toLocaleString('id-ID')}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Footer */}
          <div className="mt-8 text-xs text-slate-500">
            Warna pilihan: {order.colorPrimary} / {order.colorSecondary}
          </div>
          <div className="mt-10 text-xs text-slate-500">
            Terima kasih atas kepercayaannya. Pembayaran dilakukan sesuai kesepakatan.
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; inset: 0; box-shadow: none !important; }
        }
        /* Force all colors to hex for html2canvas compatibility */
        .print-area,
        .print-area *,
        .print-area *::before,
        .print-area *::after {
          color: #0f172a !important;
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
        }
        .print-area .text-emerald-600,
        .print-area .text-emerald-600 * { color: #059669 !important; }
        .print-area .bg-emerald-600,
        .print-area .bg-emerald-600 * { background-color: #059669 !important; }
        .print-area .text-slate-500,
        .print-area .text-slate-500 * { color: #64748b !important; }
        .print-area .text-slate-600,
        .print-area .text-slate-600 * { color: #475569 !important; }
        .print-area .text-slate-900,
        .print-area .text-slate-900 * { color: #0f172a !important; }
        .print-area .bg-slate-100,
        .print-area .bg-slate-100 * { background-color: #f1f5f9 !important; }
        .print-area .bg-slate-800,
        .print-area .bg-slate-800 * { background-color: #1e293b !important; }
        .print-area .border-slate-300,
        .print-area .border-slate-300 * { border-color: #cbd5e1 !important; }
        .print-area .border-slate-600,
        .print-area .border-slate-600 * { border-color: #475569 !important; }
        .print-area .bg-white,
        .print-area .bg-white * { background-color: #ffffff !important; }
        .print-area .text-white,
        .print-area .text-white * { color: #ffffff !important; }
      `}</style>
    </div>
  );
};
