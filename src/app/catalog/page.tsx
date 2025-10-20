"use client";

import { createOrder, OrderPayload } from "@/lib/api/ordersClient";
import { useEffect, useRef } from "react";
import { listServices, ServiceItem } from "@/lib/api/serviceClient";

import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaWhatsapp, FaDownload, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function CatalogPage() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    whatsapp: "",
    websiteName: "",
    companyName: "",
    description: "",
    colorPrimary: "#10b981",
    colorSecondary: "#1e293b",
    service: "",
    serviceId: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "service" && e.target instanceof HTMLSelectElement) {
      const selectedOption = e.target.selectedOptions[0];
      const sid = selectedOption?.getAttribute("data-id") || "";
      setForm((f) => ({ ...f, service: value, serviceId: sid }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  useEffect(() => {
    listServices()
      .then((items) => {
        setServices(items);
        setForm((f) => ({ ...f, service: items[0]?.name || "", serviceId: items[0]?.id || "" }));
      })
      .catch((e) => setServicesError(e instanceof Error ? e.message : "Unknown error"))
      .finally(() => setLoadingServices(false));
  }, []);

  const openFormForService = (serviceName?: string, serviceId?: string) => {
    if (serviceName) {
      setForm((f) => ({ ...f, service: serviceName, serviceId: serviceId || f.serviceId }));
    }
    setSubmitted(false);
    setShowOrderForm(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload: OrderPayload = {
        serviceId: form.serviceId,
        customerName: form.customerName,
        whatsapp: form.whatsapp,
        websiteName: form.websiteName,
        companyName: form.companyName,
        description: form.description,
        colorPrimary: form.colorPrimary,
        colorSecondary: form.colorSecondary,
      };
      await createOrder(payload);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim pesanan. Coba lagi atau hubungi kami.");
    } finally {
      setSubmitting(false);
    }
  };
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Back */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200/50 dark:border-emerald-700/50 rounded-lg px-4 py-2 bg-emerald-50/40 dark:bg-emerald-900/20 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/30 transition"
          >
            <FaArrowLeft /> Back to Portfolio
          </Link>
        </div>

        {/* Cover */}
        <div className="-mx-6 md:-mx-10 mb-8">
          <div className="px-6 md:px-10 py-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white border-b-2 border-emerald-500">
            <div className="text-4xl font-extrabold tracking-widest">SOULCODE</div>
            <div className="mt-2 text-base italic opacity-90">Coding with Soul, Building with Passion</div>
            <div className="mt-6 text-2xl font-bold">Paket Pembuatan Website Professional</div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => openFormForService()}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-3 rounded-lg shadow transition"
              >
                <FaShoppingCart /> Order Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Table (Services) */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-b-2 border-emerald-500">Paket</th>
                <th className="text-left p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-b-2 border-emerald-500">Harga</th>
                <th className="text-left p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-b-2 border-emerald-500">Fitur Unggulan</th>
              </tr>
            </thead>
            <tbody>
              {(services || []).map((svc) => (
                <tr key={svc.id || svc.name} className="odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/60">
                  <td className="align-top p-4">
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-base">{svc.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 italic mt-1">{svc.description}</div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => openFormForService(svc.name, svc.id)}
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md shadow transition text-xs"
                      >
                        Pilih & Order
                      </button>
                    </div>
                  </td>
                  <td className="align-top p-4">
                    <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded px-3 py-2 mb-2">
                      <div className="text-[11px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">OTC (One Time)</div>
                      <div className="text-sm font-bold mt-1">{svc.otc_range}</div>
                    </div>
                    <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded px-3 py-2">
                      <div className="text-[11px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">Monthly (Min. 6 Bulan)</div>
                      <div className="text-sm font-bold mt-1">{svc.monthly_range}</div>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 leading-relaxed">
                      {svc.info.map((i) => (
                        <div key={i}>• {i}</div>
                      ))}
                    </div>
                  </td>
                  <td className="align-top p-4">
                    <ul className="list-none space-y-2 text-slate-700 dark:text-slate-200 text-sm">
                      {svc.features.map((f) => (
                        <li key={f} className="pl-5 relative">
                          <span className="absolute left-0 top-1.5 text-emerald-500">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Specs */}
        <div className="mt-12">
          <div className="text-white bg-gradient-to-br from-slate-900 to-slate-800 border-b-2 border-emerald-500 px-6 py-4 text-xl font-bold rounded-t-lg">
            Spesifikasi Hosting Soulcode
          </div>
          <div className="grid md:grid-cols-3 gap-6 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-b-lg">
            {[
              {
                title: "🔒 Security Features",
                items: [
                  "Free SSL Certificate",
                  "DDoS Protection",
                  "Malware Scanner",
                  "Daily Backup",
                  "Firewall Protection",
                  "Spam Protection",
                ],
              },
              {
                title: "⚡ Performance",
                items: [
                  "SSD Storage (Super cepat)",
                  "CloudFlare CDN Ready",
                  "HTTP/2 & HTTP/3 Support",
                  "Redis Cache Available",
                  "99.9% Uptime SLA",
                ],
              },
              {
                title: "📋 Syarat & Ketentuan",
                items: [
                  "Harga sudah termasuk PPN 11%",
                  "Minimal kontrak 6 bulan",
                  "Biaya setup dibayar sekali",
                  "Domain & hosting per tahun",
                  "Pembayaran monthly di awal bulan",
                  "Gratis migrasi hosting lama",
                ],
              },
            ].map((box) => (
              <div key={box.title} className="border-2 border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <h4 className="text-emerald-500 font-semibold mb-4">{box.title}</h4>
                <ul className="list-none space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {box.items.map((it) => (
                    <li key={it} className="pl-5 relative">
                      <span className="absolute left-0 top-1.5 text-emerald-500">•</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="-mx-6 md:-mx-10 mt-12">
          <div className="px-6 md:px-10 py-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white border-t-2 border-emerald-500 rounded-t-lg">
            <h2 className="text-2xl font-bold mb-8">Hubungi Soulcode</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/20 px-8 py-5 rounded-lg">
                <strong className="text-sm mb-2 flex items-center gap-2"><FaEnvelope /> Email</strong>
                <a href="mailto:soulcode.sc@gmail.com" className="font-semibold hover:text-emerald-300 transition">soulcode.sc@gmail.com</a>
              </div>
              <div className="bg-white/20 px-8 py-5 rounded-lg">
                <strong className="text-sm mb-2 flex items-center gap-2"><FaWhatsapp /> WhatsApp</strong>
                <a href="https://wa.me/6285158032556" target="_blank" className="font-semibold hover:text-emerald-300 transition">wa.me/6285158032556</a>
              </div>
            </div>
            <div className="mt-8 italic">Coding with Soul, Building with Passion</div>
          </div>
        </div>

        {/* Order Form */}
        {showOrderForm && (
          <div ref={formRef} className="mt-12">
            <div className="text-white bg-gradient-to-br from-slate-900 to-slate-800 border-b-2 border-emerald-500 px-6 py-4 text-xl font-bold rounded-t-lg">
              Form Pemesanan Website
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-b-lg">
              {!submitted ? (
                <form onSubmit={onSubmit} className="space-y-8">
                  {/* Data Pemesan */}
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Data Pemesan</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1" htmlFor="customerName">Nama</label>
                        <input
                          id="customerName"
                          name="customerName"
                          value={form.customerName}
                          onChange={onChange}
                          required
                          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                          placeholder="Nama lengkap"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1" htmlFor="whatsapp">Nomor WhatsApp</label>
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          value={form.whatsapp}
                          onChange={onChange}
                          required
                          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                          placeholder="08xxxx / 62xxxx"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detail Website */}
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Detail Website</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1" htmlFor="service">Pilih Paket/Service</label>
                        <select
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={onChange}
                          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                          {loadingServices && <option>Loading services...</option>}
                          {servicesError && <option disabled>Error load services</option>}
                          {!loadingServices && !servicesError && services.map((s) => (
                            <option key={s.id} value={s.name} data-id={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-1" htmlFor="websiteName">Nama Website</label>
                        <input
                          id="websiteName"
                          name="websiteName"
                          value={form.websiteName}
                          onChange={onChange}
                          required
                          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                          placeholder="contoh: mystartup.id"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1" htmlFor="companyName">Nama Perusahaan</label>
                        <input
                          id="companyName"
                          name="companyName"
                          value={form.companyName}
                          onChange={onChange}
                          required
                          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                          placeholder="contoh: PT Maju Jaya"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1" htmlFor="description">Deskripsi</label>
                        <textarea
                          id="description"
                          name="description"
                          value={form.description}
                          onChange={onChange}
                          required
                          rows={4}
                          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                          placeholder="Tuliskan deskripsi kebutuhan website anda..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Warna */}
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Warna</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4">
                        <div>
                          <label className="block text-sm mb-1" htmlFor="colorPrimary">Primer</label>
                          <input
                            type="color"
                            id="colorPrimary"
                            name="colorPrimary"
                            value={form.colorPrimary}
                            onChange={onChange}
                            className="h-10 w-16 cursor-pointer rounded border border-slate-300 dark:border-slate-700 bg-transparent"
                          />
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{form.colorPrimary}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <label className="block text-sm mb-1" htmlFor="colorSecondary">Sekunder</label>
                          <input
                            type="color"
                            id="colorSecondary"
                            name="colorSecondary"
                            value={form.colorSecondary}
                            onChange={onChange}
                            className="h-10 w-16 cursor-pointer rounded border border-slate-300 dark:border-slate-700 bg-transparent"
                          />
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{form.colorSecondary}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-lg shadow transition"
                    >
                      {submitting ? "Mengirim..." : "Kirim Pesanan"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <FaCheckCircle /> Terima kasih! Pesanan Anda diterima. Mohon tunggu konfirmasi.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="fixed bottom-6 right-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition print:hidden"
        >
          <FaDownload /> Download PDF
        </button>
      </div>
    </div>
  );
}


