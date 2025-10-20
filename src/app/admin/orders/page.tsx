"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { exportInvoiceElementToPdf } from "@/lib/invoice/generator";
import { listOrders, OrderItem, updateOrder } from "@/lib/api/ordersClient";

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [previewOrder, setPreviewOrder] = useState<OrderItem | null>(null);
  const [invoiceNo, setInvoiceNo] = useState<string>("");

  useEffect(() => {
    listOrders()
      .then(setOrders)
      .catch((e) => setError(e instanceof Error ? e.message : "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Orders Admin</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">WhatsApp</th>
                <th className="p-3 text-left">Service ID</th>
                <th className="p-3 text-left">Website</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Colors</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Actions</th>
                <th className="p-3 text-left">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/60">
                  <td className="p-3 whitespace-nowrap">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3">
                    <a className="text-emerald-600" href={`https://wa.me/${o.whatsapp}`} target="_blank" rel="noreferrer">
                      {o.whatsapp}
                    </a>
                  </td>
                  <td className="p-3">{o.serviceId}</td>
                  <td className="p-3">{o.websiteName}</td>
                  <td className="p-3">{o.companyName}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 rounded" style={{ background: o.colorPrimary }} />
                      <span className="inline-block w-4 h-4 rounded" style={{ background: o.colorSecondary }} />
                    </div>
                  </td>
                  <td className="p-3 max-w-[28rem]">
                    <div className="line-clamp-4 whitespace-pre-wrap">{o.description}</div>
                  </td>
                  <td className="p-3 w-40">
                    <input
                      type="number"
                      className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm"
                      value={o.totalPrice}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setOrders((prev) => prev.map((x) => x.id === o.id ? { ...x, totalPrice: v } : x));
                      }}
                    />
                  </td>
                  <td className="p-3 w-28">
                    <button
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-sm disabled:opacity-60"
                      disabled={savingId === o.id}
                      onClick={async () => {
                        try {
                          setSavingId(o.id);
                          await updateOrder(o.id, {
                            serviceId: o.serviceId,
                            customerName: o.customerName,
                            whatsapp: o.whatsapp,
                            websiteName: o.websiteName,
                            companyName: o.companyName,
                            description: o.description,
                            colorPrimary: o.colorPrimary,
                            colorSecondary: o.colorSecondary,
                            totalPrice: o.totalPrice,
                          });
                        } catch (e) {
                          console.error(e);
                          alert("Gagal menyimpan total price");
                        } finally {
                          setSavingId(null);
                        }
                      }}
                    >
                      {savingId === o.id ? 'Saving...' : 'Save'}
                    </button>
                  </td>
                  <td className="p-3 w-36">
                    <button
                      className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-60"
                      disabled={!o.totalPrice || o.totalPrice <= 0}
                      onClick={() => {
                        if (!o.totalPrice || o.totalPrice <= 0) {
                          alert('Set total price terlebih dahulu');
                          return;
                        }
                        const ym = new Date(o.createdAt).toISOString().slice(0,7).replace('-', '');
                        const def = `INV-${ym}-${o.id.slice(0,6).toUpperCase()}`;
                        setInvoiceNo(def);
                        setPreviewOrder(o);
                      }}
                    >
                      Preview Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {previewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 print:bg-transparent">
          <div id="invoice-print-area" className="print-area bg-white text-slate-900 w-[840px] max-w-full max-h-[90vh] overflow-auto rounded-lg shadow-xl print:shadow-none print:bg-white print:w-full print:max-w-none print:h-auto print:max-h-none">
            <div className="flex items-center justify-between border-b px-6 py-4 sticky top-0 bg-white print:hidden">
              <h2 className="font-semibold">Invoice Preview</h2>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50"
                  onClick={() => window.print()}
                >
                  Print
                </button>
                <button
                  className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50"
                  onClick={async () => {
                    try {
                      const el = document.getElementById("invoice-print-area");
                      if (el) {
                        await exportInvoiceElementToPdf(el, `invoice-${previewOrder.id}.pdf`);
                      }
                    } catch (e) {
                      console.error(e);
                      alert("Gagal export PDF. Coba gunakan tombol Print.");
                    }
                  }}
                >
                  Download PDF
                </button>
                <button
                  className="px-3 py-1.5 rounded bg-slate-900 text-white hover:bg-slate-800"
                  onClick={() => setPreviewOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-8 print:p-0">
              <div className="border-b pb-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image src="/images/soulcode-logo.png" alt="Soulcode" width={120} height={120} className="h-12 w-auto" />
                  <div>
                    <div className="text-2xl font-bold tracking-wide">SOULCODE</div>
                    <div className="text-xs text-slate-500 tracking-wide uppercase">Where Code Meets Soul</div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-sm text-slate-600">Invoice</div>
                  <div className="flex items-center justify-end gap-3">
                    <div className="hidden print:flex items-center gap-2">
                      <span className="inline-block w-4 h-4 rounded" style={{ background: previewOrder.colorPrimary }} />
                      <span className="inline-block w-4 h-4 rounded" style={{ background: previewOrder.colorSecondary }} />
                    </div>
                    <input
                      className="print:hidden border border-slate-300 rounded px-2 py-1 text-sm w-48"
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}
                      placeholder="Invoice No"
                    />
                    <div className="print:block hidden text-sm font-semibold">{invoiceNo}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6 print:hidden">
                <span className="text-xs text-slate-500">Colors:</span>
                <span className="inline-block w-4 h-4 rounded" style={{ background: previewOrder.colorPrimary }} />
                <span className="inline-block w-4 h-4 rounded" style={{ background: previewOrder.colorSecondary }} />
                <span className="text-xs text-slate-600">{previewOrder.colorPrimary} / {previewOrder.colorSecondary}</span>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-xs text-slate-500">Invoice ID</div>
                  <div className="font-semibold">{previewOrder.id}</div>
                  <div className="text-xs text-slate-500 mt-3">Date</div>
                  <div>{new Date(previewOrder.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Total</div>
                  <div className="text-2xl font-bold text-emerald-600">Rp {previewOrder.totalPrice.toLocaleString('id-ID')}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-xs text-slate-500">Bill To</div>
                  <div className="font-semibold">{previewOrder.customerName}</div>
                  <div>{previewOrder.companyName}</div>
                  <div className="text-sm text-slate-600">WA: {previewOrder.whatsapp}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Project</div>
                  <div className="font-semibold">{previewOrder.websiteName}</div>
                  <div className="text-sm text-slate-600">Service ID: {previewOrder.serviceId}</div>
                </div>
              </div>
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
                    <td className="p-3 whitespace-pre-wrap">{previewOrder.description}</td>
                    <td className="p-3 text-right">Rp {previewOrder.totalPrice.toLocaleString('id-ID')}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-3" colSpan={2}></td>
                    <td className="p-3 text-right text-xl font-bold">Rp {previewOrder.totalPrice.toLocaleString('id-ID')}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="mt-8 text-xs text-slate-500">
                Warna pilihan: {previewOrder.colorPrimary} / {previewOrder.colorSecondary}
              </div>
              <div className="mt-10 text-xs text-slate-500">
                Terima kasih atas kepercayaannya. Pembayaran dilakukan sesuai kesepakatan.
              </div>
            </div>
          </div>
        </div>
      )}
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
}


