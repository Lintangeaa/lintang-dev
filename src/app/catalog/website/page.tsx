"use client";

import { OrderPayload } from "@/lib/api/ordersClient";
import { useRef, useState } from "react";
import { FaArrowLeft, FaEnvelope, FaWhatsapp, FaDownload, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle, OrderForm, ServiceCard } from "@/components/design-system";
import { useServices, useCreateOrder, useErrorHandler } from "@/lib/hooks";

export default function WebsiteCatalogPage() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedService, setSelectedService] = useState<{id: string, name: string} | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  // TanStack Query hooks
  const { data: services = [], isLoading: loadingServices, error: servicesError } = useServices();
  const createOrderMutation = useCreateOrder();
  const { handleApiError } = useErrorHandler();

  const openFormForService = (serviceId?: string, serviceName?: string) => {
    if (serviceId && serviceName) {
      setSelectedService({ id: serviceId, name: serviceName });
    }
    setShowOrderForm(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleOrderSubmit = async (formData: {
    serviceId: string;
    customerName: string;
    whatsapp: string;
    websiteName: string;
    companyName: string;
    description: string;
    colorPrimary: string;
    colorSecondary: string;
  }) => {
    try {
      const payload: OrderPayload = {
        serviceId: formData.serviceId,
        customerName: formData.customerName,
        whatsapp: formData.whatsapp,
        websiteName: formData.websiteName,
        companyName: formData.companyName,
        description: formData.description,
        colorPrimary: formData.colorPrimary,
        colorSecondary: formData.colorSecondary,
      };
      
      await createOrderMutation.mutateAsync(payload);
      // Don't close form immediately - let OrderForm handle success state
      // setShowOrderForm(false); 
      // setSelectedService(null);
    } catch (err) {
      handleApiError(err, 'mengirim pesanan');
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
          <Link href="/catalog">
            <Button variant="outline" leftIcon={<FaArrowLeft />}>
              Back to Catalog
            </Button>
          </Link>
        </div>

        {/* Cover */}
        <div className="-mx-6 md:-mx-10 mb-8">
          <div className="px-6 md:px-10 py-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white border-b-2 border-emerald-500">
            <div className="text-4xl font-extrabold tracking-widest">SOULCODE</div>
            <div className="mt-2 text-base italic opacity-90">Where Code Meet Soul</div>
            <div className="mt-6 text-2xl font-bold">Paket Pembuatan Website Professional</div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button
                onClick={() => openFormForService()}
                leftIcon={<FaShoppingCart />}
                size="lg"
              >
                Order Sekarang
              </Button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-stretch">
          {loadingServices ? (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-400">Loading services...</div>
            </div>
          ) : servicesError ? (
            <div className="col-span-full text-center py-12">
              <div className="text-red-400">
                Error loading services: {servicesError instanceof Error ? servicesError.message : 'Unknown error'}
              </div>
            </div>
          ) : (
            services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={openFormForService}
              />
            ))
          )}
        </div>

        {/* Specs */}
        <div className="mt-12">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-white bg-gradient-to-br from-slate-900 to-slate-800 border-b-2 border-emerald-500 px-6 py-4 text-xl font-bold rounded-t-lg -m-6 mb-6">
                Spesifikasi Hosting Soulcode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
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
                  <Card key={box.title} variant="outlined" className="p-6">
                    <h4 className="text-emerald-500 font-semibold mb-4">{box.title}</h4>
                    <ul className="list-none space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      {box.items.map((item) => (
                        <li key={item} className="pl-5 relative">
                          <span className="absolute left-0 top-1.5 text-emerald-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div className="-mx-6 md:-mx-10 mt-12">
          <div className="px-6 md:px-10 py-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white border-t-2 border-emerald-500 rounded-t-lg">
            <h2 className="text-2xl font-bold mb-8">Hubungi Soulcode</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="mailto:soulcode.sc@gmail.com" 
                className="bg-white/20 px-8 py-6 rounded-lg text-center hover:bg-white/30 transition-all duration-300"
                title="Email: soulcode.sc@gmail.com"
              >
                <FaEnvelope className="text-4xl text-emerald-400 mx-auto" />
              </a>
              <a 
                href="https://wa.me/62881080537675?text=Halo%20Soulcode%2C%20saya%20tertarik%20dengan%20layanan%20pembuatan%20website%20professional%20Anda.%20Bisa%20saya%20konsultasi%20lebih%20lanjut%3F" 
                target="_blank" 
                className="bg-white/20 px-8 py-6 rounded-lg text-center hover:bg-white/30 transition-all duration-300"
                title="WhatsApp: Chat Sekarang"
              >
                <FaWhatsapp className="text-4xl text-emerald-400 mx-auto" />
              </a>
            </div>
            <div className="mt-8 italic">Where Code Meet Soul</div>
          </div>
        </div>

        {/* Order Form */}
        {showOrderForm && (
          <div ref={formRef} className="mt-12">
            <OrderForm
              services={services.map(s => ({ id: s.id, name: s.name, description: s.description }))}
              loading={createOrderMutation.isPending}
              onSubmit={handleOrderSubmit}
              onCancel={() => {
                setShowOrderForm(false);
                setSelectedService(null);
              }}
              selectedService={selectedService}
              isSuccess={createOrderMutation.isSuccess}
            />
          </div>
        )}

        {/* Print Button */}
        <Button
          onClick={handlePrint}
          className="fixed bottom-6 right-6 rounded-full shadow-lg print:hidden"
          leftIcon={<FaDownload />}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
}

