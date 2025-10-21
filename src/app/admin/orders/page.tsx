"use client";

import { OrdersTable, InvoicePreview } from "@/components/design-system";
import { useOrders, useUpdateOrder } from "@/lib/hooks/useOrders";
import { useInvoice } from "@/lib/hooks/useInvoice";
import { OrderItem } from "@/lib/api/ordersClient";

export default function OrdersAdminPage() {
  const { data: orders = [], isLoading: loading, error } = useOrders();
  const updateOrderMutation = useUpdateOrder();
  const {
    previewOrder,
    invoiceNo,
    setInvoiceNo,
    openInvoicePreview,
    closeInvoicePreview,
    printInvoice,
    downloadInvoice,
    isOpen
  } = useInvoice();

  const handleUpdateOrder = async (id: string, data: Partial<OrderItem>) => {
    await updateOrderMutation.mutateAsync({ id, data });
  };

  const handlePreviewInvoice = (order: OrderItem) => {
    openInvoicePreview(order);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Orders Admin</h1>
      
      {error && (
        <div className="text-red-600 mb-4">
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

      <OrdersTable
        orders={orders}
        loading={loading}
        onUpdateOrder={handleUpdateOrder}
        onPreviewInvoice={handlePreviewInvoice}
      />

      {isOpen && previewOrder && (
        <InvoicePreview
          order={previewOrder}
          invoiceNo={invoiceNo}
          onInvoiceNoChange={setInvoiceNo}
          onPrint={printInvoice}
          onDownload={downloadInvoice}
          onClose={closeInvoicePreview}
        />
      )}
    </div>
  );
}

