import { useState, useCallback } from 'react';
import { downloadInvoicePDF } from '@/lib/invoice/pdfGenerator';
import { OrderItem } from '@/lib/api/ordersClient';

export function useInvoice() {
  const [previewOrder, setPreviewOrder] = useState<OrderItem | null>(null);
  const [invoiceNo, setInvoiceNo] = useState<string>('');

  const generateInvoiceNumber = useCallback((order: OrderItem) => {
    const ym = new Date(order.createdAt).toISOString().slice(0, 7).replace('-', '');
    return `INV-${ym}-${order.id.slice(0, 6).toUpperCase()}`;
  }, []);

  const openInvoicePreview = useCallback((order: OrderItem) => {
    const invoiceNumber = generateInvoiceNumber(order);
    setInvoiceNo(invoiceNumber);
    setPreviewOrder(order);
  }, [generateInvoiceNumber]);

  const closeInvoicePreview = useCallback(() => {
    setPreviewOrder(null);
    setInvoiceNo('');
  }, []);

  const printInvoice = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }, []);

  const downloadInvoice = useCallback(async () => {
    if (!previewOrder) return;
    
    try {
      // Show loading state
      const originalText = "Download PDF";
      const button = document.querySelector('[onclick*="downloadInvoice"]') as HTMLButtonElement;
      if (button) {
        button.textContent = "Generating PDF...";
        button.disabled = true;
      }
      
      await downloadInvoicePDF(previewOrder, invoiceNo, `${invoiceNo}.pdf`);
      
      // Restore button state
      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }
    } catch (error) {
      console.error('Failed to export PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Gagal export PDF: ${errorMessage}. Coba gunakan tombol Print atau refresh halaman.`);
      
      // Restore button state on error
      const button = document.querySelector('[onclick*="downloadInvoice"]') as HTMLButtonElement;
      if (button) {
        button.textContent = "Download PDF";
        button.disabled = false;
      }
    }
  }, [previewOrder, invoiceNo]);

  return {
    previewOrder,
    invoiceNo,
    setInvoiceNo,
    openInvoicePreview,
    closeInvoicePreview,
    printInvoice,
    downloadInvoice,
    isOpen: !!previewOrder,
  };
}
