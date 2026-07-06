import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Receipt, 
  UserCheck, 
  ShieldCheck, 
  Star, 
  Menu, 
  X, 
  Wrench, 
  Droplets, 
  PlusCircle, 
  TrendingDown, 
  Sparkles,
  ChevronDown,
  Info,
  Snowflake
} from "lucide-react";
const logoIcon = "/assets/logo/ACETRA 1 logo only.webp?v=2";
const bgImage = "/assets/logo/bg.webp?v=2";

// Standard Indonesian formatting details
const PHONE_NUMBER_DISPLAY = "085286660797";
const WHATSAPP_NUMBER_RAW = "6285286660797"; // standard regional code format
const BUSINESS_HOURS = "Senin - Minggu: 08.00 - 18.00 WIB";
const SERVICE_AREAS = [
  "Depok"
];

// Convert //text// markers to WhatsApp bold format (*text*)
const formatWABold = (message: string) =>
  message.replace(/\/\/(.+?)\/\//g, '*$1*');

// Custom WhatsApp message helper
const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(formatWABold(message))}`;
};

// Preset message templates for each CTA
const MESSAGES = {
  header: "Halo Acentra Service, saya ingin //berkonsultasi mengenai keluhan AC rumah saya.// Mohon infonya.",
  hero: "Halo Acentra Service, saya ingin memesan //jasa perawatan AC untuk rumah saya.// Mohon info ketersediaan jadwal.",
  pricingHelp: "Halo Acentra Service, saya butuh //estimasi biaya perbaikan AC saya.// Mohon dibantu.",
  serviceCuci: "Halo Acentra Service, saya siap memesan layanan //Cuci AC Bersih Maksimal// untuk rumah saya.",
  serviceRutin: "Halo Acentra Service, saya tertarik memesan //Servis AC Rutin berkala// agar dingin maksimal.",
  servicePerbaikan: "Halo Acentra Service, saya butuh layanan //Diagnosa & Perbaikan AC rusak// untuk rumah saya.",
  serviceFreon: "Halo Acentra Service, saya ingin memesan layanan //Tambah & Isi Freon AC// agar dingin kembali.",
  servicePasang: "Halo Acentra Service, saya tertarik untuk melakukan //Pemasangan AC Baru.// Mohon info estimasi biaya instalasi.",
  finalCta: "Halo Acentra Service, saya siap memesan teknisi sekarang agar //AC rumah// kembali dingin dan segar."
};

// Reusable ScrollReveal wrapper component using Framer Motion
function ScrollReveal({ children, delay = 0, y = 30, className, whileHover }: { children: React.ReactNode; delay?: number; y?: number; className?: string; whileHover?: React.ComponentProps<typeof motion.div>["whileHover"] }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  );
}

// CountUp: animates a number from 0 → target once it enters the viewport
function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(to * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString("id-ID")}{suffix}
    </span>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Prevent background scrolling when mobile menu full-screen overlay is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Simple service pricing query builder to engage senior users and make estimated quotes transparent
  const [selectedService, setSelectedService] = useState("cuci");
  const [unitCount, setUnitCount] = useState(1);

  const getCalculatorEstimate = () => {
    switch (selectedService) {
      case "cuci":
        return {
          price: unitCount * 80000,
          description: "Termasuk cuci filter indoor, evaporator, drainase air, dan pembersihan unit outdoor."
        };
      case "rutin":
        return {
          price: unitCount * 130000,
          description: "Termasuk cuci unit lengkap, pengecekan tekanan freon, dan arus kelistrikan kompresor."
        };
      case "freon":
        return {
          price: unitCount * 150000,
          description: "Penambahan atau pengisian ulang gas freon (R32 / R410A) agar kualitas pendinginan AC kembali maksimal."
        };
      case "pasang":
        return {
          price: unitCount * 280000,
          description: "Instalasi AC baru/pindahan secara rapi, termasuk vacum unit (tidak termasuk material pipa)."
        };
      default:
        return { price: 0, description: "Silakan konsultasikan kerusakan langsung ke teknisi kami lewat WhatsApp." };
    }
  };

  const calculatorInfo = getCalculatorEstimate();

  const faqs = [
    {
      q: "Berapa lama garansi yang diberikan?",
      a: "Kami memberikan garansi jika mengalami kendala yang sama persis setelah perbaikan selesai dilakukan."
    },
    {
      q: "Apakah biaya akan diinfokan di awal sebelum dikerjakan?",
      a: "Ya, betul sekali. Teknisi kami akan melakukan pengecekan mendetail terlebih dahulu di rumah Anda, menjelaskan kerusakannya secara jujur, dan memberikan rincian biaya resmi sebelum melakukan tindakan perbaikan apa pun."
    },
    {
      q: "Bagaimana jika teknisi datang terlambat?",
      a: "Kami sangat menghargai waktu Anda. Jika teknisi kami terlambat lebih dari 30 menit dari jadwal kesepakatan tanpa konfirmasi terlebih dahulu, kami memberikan potongan langsung Rp 20.000 sebagai bentuk komitmen kenyamanan pelayanan kami."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1e293b] font-sans antialiased selection:bg-[#F0F7FF] selection:text-[#0056B3]">
      
      {/* Dynamic Top Announcement Bar */}
      <div className="bg-[#0056B3] text-white text-xs sm:text-sm py-2 px-4 font-bold text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
        <span>Layanan Aktif Hari Ini • Teknisi Siap Dikirim ke Area Depok</span>
      </div>

      {/* Sticky Header */}
      <header className="relative sticky top-0 z-50 bg-white px-4 sm:px-10 border-b border-slate-100 flex items-center justify-between h-[80px]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-center group">
            <img src={logoIcon} alt="Logo Acentra Service – Jasa Servis AC Depok" className="h-10 sm:h-12 w-auto object-contain" width={800} height={142} fetchPriority="high" decoding="sync" style={{aspectRatio: '800/142'}} />
          </a>

          {/* Desktop Call to Action Button */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Ada Pertanyaan?</span>
              <span className="text-base font-extrabold text-[#0F172A] block">{PHONE_NUMBER_DISPLAY}</span>
            </div>
            
            <a
              href={getWhatsAppLink(MESSAGES.header)}
              target="_blank"
              rel="noopener noreferrer"
              id="header_cta_whatsapp"
              className="bg-[#15803d] hover:bg-[#166534] text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 text-base"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button - Animating Hamburger to X */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 hover:text-[#0056B3] active:bg-slate-50 transition-all focus:outline-none relative overflow-hidden"
              aria-label="Menu"
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                {/* Menu Icon */}
                <motion.div
                  animate={{ 
                    rotate: mobileMenuOpen ? 90 : 0, 
                    opacity: mobileMenuOpen ? 0 : 1,
                    scale: mobileMenuOpen ? 0.7 : 1
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute"
                >
                  <Menu className="w-7 h-7" />
                </motion.div>
                {/* X Icon */}
                <motion.div
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ 
                    rotate: mobileMenuOpen ? 0 : -90, 
                    opacity: mobileMenuOpen ? 1 : 0,
                    scale: mobileMenuOpen ? 1 : 0.7
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute"
                >
                  <X className="w-7 h-7" />
                </motion.div>
              </div>
            </button>
          </div>

        </div>

        {/* Backdrop Overlay (Dimmed Background) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Dropdown Panel sliding smoothly from top (y=0) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed inset-x-0 top-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 md:hidden flex flex-col h-auto max-h-[85vh] overflow-y-auto"
            >
              {/* Overlay Header with Logo and Close X button */}
              <div className="h-[80px] w-full border-b border-slate-100 flex items-center justify-between px-4 sm:px-10 shrink-0 bg-white">
                {/* Logo / Brand Name */}
                <div className="flex items-center">
                  <img src={logoIcon} alt="Logo Acentra Service – Jasa Servis AC Depok" className="h-10 w-auto object-contain" width={800} height={142} decoding="async" />
                </div>

                {/* Close Button with X inside the overlay */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 hover:text-[#0056B3] active:bg-slate-50 transition-all focus:outline-none"
                  aria-label="Tutup Menu"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="px-5 py-6 space-y-5 bg-slate-50/50 flex flex-col justify-start pb-8">
                
                {/* Section Title */}
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block px-1">Layanan &amp; Kontak Kami</span>

                {/* 1. Primary WhatsApp Link */}
                <a
                  href={getWhatsAppLink(MESSAGES.header)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  id="mobile_header_cta"
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#15803d] hover:bg-[#166534] active:bg-[#16a34a] active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl text-base shadow-md transition-all duration-150"
                >
                  <MessageSquare className="w-6 h-6 fill-current" />
                  <span>Chat WhatsApp Sekarang</span>
                </a>

                {/* 2. Direct Phone Dial */}
                <a
                  href={`tel:${PHONE_NUMBER_DISPLAY.replace(/\s+/g, '')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between p-4.5 bg-white hover:bg-slate-50 active:bg-slate-100 active:scale-[0.98] rounded-2xl border border-slate-100 shadow-xs transition-all text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 bg-[#F0F7FF] text-[#0056B3] rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Panggilan Telepon Langsung</span>
                      <span className="text-base font-extrabold text-[#0056B3] block mt-0.5">{PHONE_NUMBER_DISPLAY}</span>
                    </div>
                  </div>
                  <ChevronDown className="w-5.5 h-5.5 text-slate-500 rotate-270" />
                </a>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 md:py-28 lg:py-36 border-b border-slate-100 overflow-hidden flex items-center justify-center">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <img 
            src={bgImage} 
            alt="Teknisi AC profesional Acentra Service sedang mengerjakan servis AC di Depok" 
            className="w-full h-full object-cover"
            width={1600}
            height={872}
            fetchPriority="high"
          />
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/85 to-slate-950/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              
              {/* Trust Badge badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/25 font-bold text-xs sm:text-sm tracking-wide mx-auto shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Pilihan Keluarga Indonesia</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                Servis AC Depok Cepat, <br className="hidden sm:inline" />
                <span className="text-sky-400 relative">Terpercaya</span> & <br className="hidden lg:inline" />
                Bergaransi
              </h1>

              {/* Subheadline (Large & highly readable) */}
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
                Solusi AC dingin kembali dalam 60 menit. Dikerjakan oleh teknisi ahli berpengalaman untuk area perumahan Anda. Kami mengutamakan kejujuran, harga transparan, dan jaminan dingin maksimal.
              </p>

              {/* Big CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppLink(MESSAGES.hero)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero_cta_whatsapp"
                  className="w-full sm:w-auto inline-flex bg-[#15803d] hover:bg-[#166534] text-white text-lg sm:text-xl font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all items-center justify-center gap-3 active:scale-95 duration-150 transform"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Pesan via WhatsApp Sekarang</span>
                </a>
              </div>

              {/* Real-time Online Indicator */}
              <div className="flex items-center justify-center gap-3 mt-4 text-sm text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block relative">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
                </span>
                <span>Konsultasi Gratis</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white border-b border-slate-100 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0056B3] border-b-4 border-[#0056B3] w-fit mx-auto pb-2 mb-2">
                Layanan Servis AC Kami di Depok
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Pilih jenis layanan yang Anda butuhkan. Klik tombol di bawah tiap layanan untuk pesan instan langsung dengan isi pesan WhatsApp otomatis.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid Layout for Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Cuci AC */}
            <ScrollReveal delay={0} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="h-full">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#F0F7FF] text-[#0056B3] flex items-center justify-center">
                  <Droplets className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-[#0056B3] transition-colors">
                    Cuci AC Bersih Maksimal
                  </h3>
                  <p className="text-xs font-bold text-[#0056B3] uppercase tracking-widest mt-1">Saran: Setiap 3-4 Bulan</p>
                </div>
                <p className="text-[#475569] text-base leading-relaxed">
                  Pembersihan total filter debu, evaporator indoor, baki drainase air, serta kipas kondensor outdoor. Menjauhkan kuman, mencegah bocor air, dan mengembalikan AC dingin seperti baru.
                </p>
                
                {/* Visual price tag directly in card */}
                <div className="bg-slate-50 py-3 px-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">Estimasi Biaya Resmi:</span>
                  <span className="text-lg font-extrabold text-[#0056B3]">Mulai Rp 80.000 <span className="text-xs font-normal text-slate-500">/unit</span></span>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={getWhatsAppLink(MESSAGES.serviceCuci)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 px-6 rounded-xl text-base shadow-xs"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Pesan Jasa Cuci AC</span>
                </a>
              </div>
            </div>
            </ScrollReveal>

            {/* Card 2: Perbaikan AC */}
            <ScrollReveal delay={0.1} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="h-full">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Wrench className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-[#0056B3] transition-colors">
                    Perbaikan &amp; Atasi Kerusakan
                  </h3>
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mt-1">Service Bergaransi</p>
                </div>
                <p className="text-[#475569] text-base leading-relaxed">
                  Solusi tuntas untuk AC tidak dingin sama sekali, mati total, kompresor berisik, pipa membeku salju, kebocoran freon, sensor mati/eror, hingga modul elektronik rusak parah.
                </p>

                {/* Visual price tag directly in card */}
                <div className="bg-slate-50 py-3 px-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">Diagnosa Ahli di Tempat:</span>
                  <span className="text-base font-extrabold text-amber-700">Harga Transparan</span>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={getWhatsAppLink(MESSAGES.servicePerbaikan)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 px-6 rounded-xl text-base shadow-xs"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Pesan Perbaikan AC</span>
                </a>
              </div>
            </div>
            </ScrollReveal>

            {/* Card 3: Tambah Freon */}
            <ScrollReveal delay={0.2} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="h-full">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center">
                  <Snowflake className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-[#0056B3] transition-colors">
                    Tambah / Isi Freon AC
                  </h3>
                  <p className="text-xs font-bold text-sky-800 uppercase tracking-widest mt-1">Saran: Bila Tekanan Kurang</p>
                </div>
                <p className="text-[#475569] text-base leading-relaxed">
                  Isi ulang gas refrigerant resmi berkualitas tinggi (R32, R410A, R22) sesuai spesifikasi unit AC Anda. Sangat ideal untuk mengatasi kendala pipa es membeku dan AC yang kurang dingin.
                </p>

                {/* Visual price tag directly in card */}
                <div className="bg-slate-50 py-3 px-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">Estimasi Biaya Pengisian:</span>
                  <span className="text-lg font-extrabold text-[#0056B3]">Mulai Rp 150.000 <span className="text-xs font-normal text-slate-500">/unit</span></span>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={getWhatsAppLink(MESSAGES.serviceFreon)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 px-6 rounded-xl text-base shadow-xs"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Pesan Tambah Freon</span>
                </a>
              </div>
            </div>
            </ScrollReveal>

            {/* Card 4: Servis AC Rutin */}
            <ScrollReveal delay={0} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="h-full">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#F0F7FF] text-[#0056B3] flex items-center justify-center">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-[#0056B3] transition-colors">
                    Servis Rutin Berkala
                  </h3>
                  <p className="text-xs font-bold text-[#0056B3] uppercase tracking-widest mt-1">Mencegah Kerusakan AC</p>
                </div>
                <p className="text-[#475569] text-base leading-relaxed">
                  Pemeriksaan menyeluruh isi muatan freon R32/R410, pengecekan ketat amperase kompresor, kondisi komponen kelistrikan utama, serta pembersihan filter udara indoor secara optimal.
                </p>

                {/* Visual price tag directly in card */}
                <div className="bg-slate-50 py-3 px-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">Estimasi Biaya Pemeliharaan:</span>
                  <span className="text-lg font-extrabold text-[#0056B3]">Mulai Rp 130.000 <span className="text-xs font-normal text-slate-500">/unit</span></span>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={getWhatsAppLink(MESSAGES.serviceRutin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 px-6 rounded-xl text-base shadow-xs"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Pesan Servis Rutin AC</span>
                </a>
              </div>
            </div>
            </ScrollReveal>

            {/* Card 5: Pasang & Bongkar AC */}
            <ScrollReveal delay={0.1} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="h-full">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <PlusCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-[#0056B3] transition-colors">
                    Instalasi / Pasang Baru
                  </h3>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mt-1">Uji Fungsi Lengkap</p>
                </div>
                <p className="text-[#475569] text-base leading-relaxed">
                  Pemasangan unit baru/bekas secara rapi sesuai standar sirkulasi ruang. Termasuk pemvakuman udara pipa wajib, pemasangan bracket kokoh, jalurnya air, dan tes dingin maksimal.
                </p>

                {/* Visual price tag directly in card */}
                <div className="bg-slate-50 py-3 px-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">Estimasi Biaya Pasang:</span>
                  <span className="text-lg font-extrabold text-[#0056B3]">Mulai Rp 280.000 <span className="text-xs font-normal text-slate-500">/unit</span></span>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={getWhatsAppLink(MESSAGES.servicePasang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 px-6 rounded-xl text-base shadow-xs"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Pesan Pasang AC Baru</span>
                </a>
              </div>
            </div>
            </ScrollReveal>

          </div>

          {/* Simple Interactive Price Calculator widget inside Service (Great for transparent value) */}
          <ScrollReveal>
          <div className="mt-16 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 rounded-lg bg-[#F0F7FF] text-[#0056B3]">
                <Receipt className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Kalkulator Estimasi Biaya Transparan</h3>
                <p className="text-xs sm:text-sm text-slate-600">Prediksi biaya servis resmi Anda sekarang tanpa takut overcharge.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <span className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Pilih Jenis Layanan:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "cuci", label: "Cuci AC" },
                      { id: "rutin", label: "Servis Rutin" },
                      { id: "freon", label: "Tambah Freon" },
                      { id: "pasang", label: "Pasang Baru" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedService(item.id)}
                        type="button"
                        className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold border transition-all text-center ${
                          selectedService === item.id
                            ? "bg-[#0056B3] border-[#0056B3] text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="unitCountSlider" className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">
                    Jumlah Unit AC: <span className="text-lg text-[#0056B3] font-black">{unitCount} Unit</span>
                  </label>
                  <input
                    id="unitCountSlider"
                    type="range"
                    min="1"
                    max="10"
                    value={unitCount}
                    onChange={(e) => setUnitCount(parseInt(e.target.value) || 1)}
                    className="w-full accent-[#0056B3] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    aria-label="Jumlah Unit AC"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-bold mt-1">
                    <span>1 Unit</span>
                    <span>5 Unit</span>
                    <span>10 Unit</span>
                  </div>
                </div>
              </div>

              {/* Estimate Output */}
              <div className="bg-white rounded-xl p-5 border border-slate-100 text-center md:text-left space-y-4 shadow-2xs">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Estimasi Harga Jasa</span>
                  <p className="text-3xl font-black text-[#0056B3] mt-1">
                    Rp {calculatorInfo.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">
                    {selectedService === "freon"
                      ? "*Harga pengisian dapat bervariasi tergantung pada kapasitas AC (PK) dan tipe freon yang digunakan."
                      : selectedService === "pasang"
                      ? "*Harga belum termasuk material pipa, bracket, pembobokan, atau biaya bongkar AC lama."
                      : "*Harga resmi jasa, di luar suku cadang atau pengerjaan kompresor berat."}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3 text-xs text-slate-500 italic">
                  &ldquo;{calculatorInfo.description}&rdquo;
                </div>

                <a
                  href={getWhatsAppLink(
                    `Halo Acentra Service, saya ingin pesan jasa ${
                      selectedService === 'cuci' 
                        ? 'Cuci AC' 
                        : selectedService === 'rutin' 
                        ? 'Servis Rutin' 
                        : selectedService === 'freon'
                        ? 'Tambah Freon'
                        : 'Pasang Baru'
                    } sebanyak ${unitCount} unit dengan estimasi harga resmi Rp ${calculatorInfo.price.toLocaleString("id-ID")}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Pesan Estimasi Ini via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[#0056B3] text-sm font-extrabold uppercase tracking-widest block">KOMITMEN UTAMA KAMI</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0056B3] tracking-tight">
              Mengapa Pilih Acentra Service?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Kenyamanan ruang Anda adalah fokus utama kami. Kami berkomitmen memberikan layanan yang jujur, transparan, dan terpercaya.
            </p>
          </div>
          </ScrollReveal>

          {/* Core Trust Points in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Trust Point 1: Experienced Technicians */}
            <ScrollReveal delay={0}>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#F0F7FF] text-[#0056B3] flex items-center justify-center shadow-2xs">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                Teknisi Ahli
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Teknisi kami berpengalaman, ramah, terlatih bertahun-tahun, serta bekerja sopan dengan standar kebersihan tinggi di rumah anda.
              </p>
            </div>
            </ScrollReveal>

            {/* Trust Point 2: 30-Day Work Warranty */}
            <ScrollReveal delay={0.1}>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                Service Bergaransi
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Jika timbul keluhan serupa setelah perbaikan dilakukan, kami langsung kirim teknisi kembali tanpa biaya sepeser pun. Garansi tertulis jelas.
              </p>
            </div>
            </ScrollReveal>

            {/* Trust Point 3: Transparent Pricing */}
            <ScrollReveal delay={0.2}>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                Harga Transparan
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Tidak ada biaya tersembunyi atau ditutup-tutupi. Biaya pengerjaan selalu diinfokan resmi di muka sebelum pengerjaan disetujui.
              </p>
            </div>
            </ScrollReveal>

            {/* Trust Point 4: Fast Response */}
            <ScrollReveal delay={0.3}>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shadow-2xs">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                Respon Cepat
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Kami sangat menghargai waktu Anda. Layanan customer service online responsif menjawab seputar keluhan AC kapan pun Anda butuhkan.
              </p>
            </div>
            </ScrollReveal>

          </div>

          {/* Satisfied Clients Small Counter banner inside Trust Section */}
          <ScrollReveal>
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-800 block">
                <CountUp to={4.8} decimals={1} /> / 5.0
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Rating Kepuasan</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-800 block">
                <CountUp to={1000} suffix="+" />
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Unit AC Berhasil Ditangani</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-800 block">
                <CountUp to={10} suffix=" Tahun+" />
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Pengalaman</span>
            </div>
          </div>
          </ScrollReveal>

        </div>
      </section>
      {/* Accordion FAQ Section (Highly useful helper for older adults on warranty & timing) */}
      {false && (
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-extrabold text-[#0056B3] tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Ulasan singkat mengenai jaminan keamanan, kejujuran teknisi, dan tata cara garansi resmi kami.
            </p>
          </div>

          {/* Accordion Wrapper */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 rounded-xl border border-slate-150 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-4 sm:py-5 px-6 flex items-center justify-between text-left focus:outline-hidden"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#0056B3] shrink-0 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="pb-5 px-6 border-t border-slate-200/50 pt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Interactive Help Box */}
          <div className="mt-8 bg-[#F0F7FF] rounded-xl p-4 sm:p-5 border border-slate-100 flex items-start gap-3.5">
            <Info className="w-6 h-6 text-[#0056B3] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800">Punya Pertanyaan Khusus Lainnya?</p>
              <p className="text-sm text-slate-500 mt-1">
                Jangan ragu untuk tanyakan langsung ke customer service kami. Klik tombol di bawah untuk mulai chat secara cepat.
              </p>
              <a
                href={getWhatsAppLink(MESSAGES.pricingHelp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#15803d] hover:text-[#166534] mt-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Konsultasi Pertanyaan Anda Sekarang</span>
              </a>
            </div>
          </div>

        </div>
      </section>
      )}

       {/* Final Call To Action Section */}
      <section className="bg-[#F0F7FF] py-16 md:py-24 border-b border-slate-100 text-center relative overflow-hidden">
        
        <ScrollReveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full border border-emerald-100 font-bold text-xs sm:text-sm tracking-wide mx-auto">
            <Sparkles className="w-4 h-4 text-emerald-800 animate-pulse" />
            <span>SIAP DATANG HARI INI • JADWAL SANGAT FLEKSIBEL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0056B3] tracking-tight leading-tight">
            Siap AC di Rumah Anda Kembali Dingin?
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Dapatkan pengalaman servis AC tanpa repot, transparan, dan bergaransi. Cukup hubungi kami lewat WhatsApp dan teknisi kami siap ke lokasi.
          </p>

          <div className="pt-4 space-y-6">
            
            {/* Massive easy-to-tap Green Button representing high-volume core CTA */}
            <a
              href={getWhatsAppLink(MESSAGES.finalCta)}
              target="_blank"
              rel="noopener noreferrer"
              id="final_cta_whatsapp"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold py-5 px-10 rounded-2xl text-lg sm:text-2xl shadow-xl transition-all duration-150 transform active:scale-95"
            >
              <MessageSquare className="w-7 h-7 fill-current" />
              <span>Hubungi Kami Lewat WhatsApp</span>
            </a>

            {/* Repetitive highly clear fallback details for older adults */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0056B3] block">Atau hubungi manual di nomor:</span>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-800 block select-all">
                {PHONE_NUMBER_DISPLAY}
              </p>
              <span className="text-xs text-slate-700 font-medium block">
                Kami siap merespon pertanyaan Anda atau mengagendakan kunjungan.
              </span>
            </div>

          </div>

        </div>
        </ScrollReveal>
      </section>

      {/* Workshop Location & Map Section */}
      {false && (
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Workshop Card (5 cols) */}
            <ScrollReveal className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#0056B3] uppercase tracking-widest block mb-2">Lokasi Bengkel</span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Kunjungi Workshop Kami</h2>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  Kami memiliki workshop fisik resmi di Depok untuk menjamin kepercayaan Anda. Silakan berkunjung untuk konsultasi langsung atau sekadar berdiskusi mengenai keluhan AC Anda.
                </p>
              </div>

              {/* Information Detail Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-[#0056B3] text-lg">Acentra Service</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-1 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Buka 24 Jam (Hari Libur Tetap Buka)
                  </span>
                </div>
                
                <div className="text-slate-600 text-sm leading-relaxed space-y-3 pt-2">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Alamat Bengkel</span>
                    <p className="font-medium text-slate-800">
                      Jl. Wijaya Kusuma Raya No.8, Depok Jaya, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16432
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Telepon &amp; WhatsApp</span>
                    <p className="font-bold text-slate-800">{PHONE_NUMBER_DISPLAY}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Acentra+Service+Depok+Jaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0056B3] hover:bg-[#004494] active:scale-[0.98] text-white font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all shadow-xs"
                  >
                    <span>Petunjuk Arah (Google Maps) ↗</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Google Maps Embed (7 cols) */}
            <div className="lg:col-span-7 h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-md border border-slate-200/60 relative">
              <iframe
                src="https://maps.google.com/maps?q=Acentra%20Service%20Depok&t=&z=17&ie=UTF8&iwloc=A&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Google Maps Acentra Service"
              />
            </div>

          </div>
        </div>
      </section>
      )}

    </main>

      {/* Full Informational Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-800">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center">
                <img src={logoIcon} alt="Logo Acentra Service – Jasa Servis AC Depok" className="h-10 w-auto object-contain" width={800} height={142} decoding="async" />
              </div>
              <p data-nosnippet className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm">
  Acentra Service adalah penyedia jasa perbaikan, pencucian, perawatan, dan instalasi AC rumah tangga berpengalaman dengan fokus pelayanan jujur, transparan, dan bergaransi.
</p>
            </div>

            {/* Column 2: Working Hours / Availability */}
            <div data-nosnippet className="md:col-span-3 space-y-4">
              <p className="text-sm font-bold tracking-widest text-white uppercase">Waktu Operasional</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-2"></span>
                  <span>{BUSINESS_HOURS}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 animate-pulse"></span>
                  <span className="text-emerald-400 font-semibold">Tersedia di Hari Libur &amp; Tanggal Merah</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Core Address Details */}
            <div data-nosnippet className="md:col-span-4 space-y-4">
              <p className="text-sm font-bold tracking-widest text-white uppercase">Area &amp; Alamat</p>
              <div className="space-y-1">
                <p className="text-sm">
                  <strong>WhatsApp:</strong> <span className="text-emerald-400 select-all font-bold">{PHONE_NUMBER_DISPLAY}</span>
                  <br />
                  <strong>Instagram:</strong> <a href="https://www.instagram.com/acentra.id" target="_blank" rel="noopener noreferrer" className="text-pink-400 select-all font-bold">@acentra.id</a>
                </p>
                <p className="text-sm text-slate-400" suppressHydrationWarning>
                  <strong>Email:</strong> <a href="mailto:acentraservice@gmail.com" className="text-slate-400 hover:text-white transition-colors">acentraservice@gmail.com</a>
                </p>
              </div>
            </div>

          </div>


          {/* Area Layanan list for absolute transparency */}
          <div className="py-6 border-b border-slate-800 text-center md:text-left">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Wilayah Jangkauan Teknisi Kami</span>
            <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4">
              {SERVICE_AREAS.map((area, idx) => (
                <span key={idx} className="bg-slate-800 text-slate-300 text-xs py-1 px-3 rounded-md font-medium border border-slate-700/50">
                  📍 {area}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright note */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-xs text-slate-400 font-medium">
            <p suppressHydrationWarning>
              &copy; {new Date().getFullYear()} Acentra Service. Semua Hak Cipta Dilindungi.
            </p>
            <p className="text-slate-400">
              Acentra Service Landing Page • Kebijakan Privasi • Syarat &amp; Ketentuan
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
