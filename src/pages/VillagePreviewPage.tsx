import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, Users, Building2, Phone, Mail, Clock, Settings, ChevronRight, BookOpen, FileText } from 'lucide-react';
import { useApp } from '../App';
import L from 'leaflet';

export default function VillagePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { villages } = useApp();
  const mapRef = useRef<HTMLDivElement>(null);
  const village = villages.find(v => v.id === id);

  useEffect(() => {
    if (!mapRef.current || !village) return;
    const map = L.map(mapRef.current, { center: [village.lat, village.lng], zoom: 13 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OSM' }).addTo(map);
    const icon = L.divIcon({ className: 'custom-marker', html: `<div style="width:36px;height:36px;background:linear-gradient(135deg,#059669,#0d9488);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);"><div style="transform:rotate(45deg);color:white;font-size:14px;">🏘</div></div>`, iconSize: [36, 36], iconAnchor: [18, 36] });
    L.marker([village.lat, village.lng], { icon }).addTo(map).bindPopup(`<b>Desa ${village.name}</b>`).openPopup();
    return () => { map.remove(); };
  }, [village]);

  if (!village) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white"><div className="text-center"><p className="text-xl mb-4">Desa tidak ditemukan</p><button onClick={() => navigate('/')} className="text-emerald-400 hover:underline">Kembali</button></div></div>;

  const infoItems = [
    { title: 'Profil Desa', slug: 'profil-desa', icon: '🏘️', desc: 'Informasi umum desa' },
    { title: 'Sejarah Desa', slug: 'sejarah-desa', icon: '📜', desc: 'Sejarah desa' },
    { title: 'Visi & Misi', slug: 'visi-misi', icon: '🎯', desc: 'Visi misi pembangunan' },
    { title: 'Struktur Organisasi', slug: 'struktur-organisasi', icon: '🏛️', desc: 'Pemerintahan desa' },
    { title: 'Data Demografi', slug: 'demografi', icon: '📊', desc: 'Data kependudukan' },
  ];

  const serviceItems = [
    { title: 'Surat Pengantar KTP', slug: 'surat-pengantar-ktp', icon: '📄', desc: 'Pengantar KTP' },
    { title: 'Surat Pengantar KK', slug: 'surat-pengantar-kk', icon: '📋', desc: 'Kartu Keluarga' },
    { title: 'Surat Keterangan Domisili', slug: 'surat-keterangan-domisili', icon: '🏠', desc: 'Keterangan domisili' },
    { title: 'SKTM', slug: 'surat-keterangan-tidak-mampu', icon: '💰', desc: 'Tidak mampu' },
    { title: 'Surat Keterangan Usaha', slug: 'surat-keterangan-usaha', icon: '🏪', desc: 'SKU' },
    { title: 'Bantuan Sosial', slug: 'data-bantuan-sosial', icon: '🎁', desc: 'Info bansos' },
    { title: 'APBDes', slug: 'apbdes', icon: '📊', desc: 'Anggaran desa' },
  ];

  const beritaItems = [
    { title: 'Musyawarah Desa 2024', slug: 'musyawarah-desa-2024', date: '15 Jan 2024', category: 'Pemerintahan' },
    { title: 'Program BLT', slug: 'program-bantuan-langsung-tunai', date: '10 Jan 2024', category: 'Bantuan' },
    { title: 'Pembangunan Jalan', slug: 'pembangunan-jalan-desa', date: '5 Jan 2024', category: 'Infrastruktur' },
    { title: 'Posyandu Balita', slug: 'posyandu-balita-rutin', date: '1 Jan 2024', category: 'Kesehatan' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white">
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition"><ArrowLeft className="w-4 h-4" /><span>Kembali</span></button>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(`/account-settings/${village.id}`)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white/80 hover:text-white transition" title="Pengaturan"><Settings className="w-3.5 h-3.5" /><span className="hidden sm:inline">Pengaturan</span></button>
            <div className="flex items-center gap-2"><span className="text-xs text-white/50">Preview</span><div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div></div>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 to-teal-800/90"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm mb-4"><MapPin className="w-4 h-4 text-emerald-300" /><span>{village.province || 'Indonesia'}</span></div>
              <h1 className="text-3xl md:text-5xl font-black mb-3">Desa {village.name}</h1>
              <p className="text-lg text-emerald-100/80 mb-2">{village.district && `${village.district}, `}{village.regency || ''}</p>
              <p className="text-emerald-200/60 text-sm">{village.subdomain}.tanahair.id</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2"><Users className="w-5 h-5 text-emerald-300" /><span className="text-sm">{village.population?.toLocaleString() || '0'} Jiwa</span></div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2"><Building2 className="w-5 h-5 text-emerald-300" /><span className="text-sm">{village.area || 'N/A'}</span></div>
              </div>
            </div>
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur rounded-3xl border border-white/20 flex items-center justify-center"><div className="text-center"><div className="text-5xl mb-1">🏘️</div><p className="text-xs text-white/60">Logo Desa</p></div></div>
          </div>
        </div>
      </header>

      <nav className="bg-emerald-950/80 backdrop-blur border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {['Beranda', 'Profil', 'Peta', 'Berita', 'Layanan', 'Galeri', 'Kontak'].map((item, i) => (
              <button key={item} className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition ${i === 0 ? 'bg-emerald-500/20 text-emerald-300 font-medium' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>{item}</button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><span className="text-3xl">👋</span>Selamat Datang</h2>
            <p className="text-emerald-100/80 leading-relaxed">Selamat datang di website resmi Desa {village.name}. Portal informasi dan layanan digital untuk masyarakat desa.</p>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3"><span className="text-3xl">📋</span>Informasi Desa</h2>
            <div className="flex items-center gap-1 text-sm text-emerald-300"><BookOpen className="w-4 h-4" /><span>Selengkapnya</span></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infoItems.map((item, i) => (
              <button key={i} onClick={() => navigate(`/info/${village.id}/${item.slug}`)} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-500/30 transition text-left group">
                <div className="flex items-start justify-between mb-3"><div className="text-3xl">{item.icon}</div><ChevronRight className="w-5 h-5 text-emerald-400/50 group-hover:text-emerald-400 transition" /></div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-300 transition">{item.title}</h3>
                <p className="text-sm text-emerald-200/60">{item.desc}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><span className="text-3xl">🗺️</span>Peta Wilayah Desa</h2>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
            <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
            <div className="p-4 border-t border-white/10"><div className="flex items-center gap-4 text-sm text-emerald-200/70"><span>📍 Lat: {village.lat.toFixed(4)}</span><span>📍 Lng: {village.lng.toFixed(4)}</span></div></div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3"><span className="text-3xl">🏛️</span>Layanan Publik</h2>
            <div className="flex items-center gap-1 text-sm text-emerald-300"><FileText className="w-4 h-4" /><span>Semua Layanan</span></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {serviceItems.map((service, i) => (
              <button key={i} onClick={() => navigate(`/layanan/${village.id}/${service.slug}`)} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-emerald-500/30 transition cursor-pointer group text-left">
                <div className="flex items-start justify-between mb-3"><div className="text-3xl">{service.icon}</div><ChevronRight className="w-4 h-4 text-emerald-400/50 group-hover:text-emerald-400 transition" /></div>
                <h3 className="font-bold mb-1 group-hover:text-emerald-300 transition text-sm">{service.title}</h3>
                <p className="text-xs text-emerald-200/60">{service.desc}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3"><span className="text-3xl">📰</span>Berita & Pengumuman</h2>
            <button onClick={() => navigate(`/galeri/${village.id}`)} className="flex items-center gap-1 text-sm text-emerald-300 hover:text-emerald-200 transition">Lihat Galeri →</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {beritaItems.map((news, i) => (
              <button key={i} onClick={() => navigate(`/berita/${village.id}/${news.slug}`)} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/10 transition cursor-pointer text-left group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">{news.category}</span>
                  <span className="text-xs text-emerald-200/50 flex items-center gap-1"><Clock className="w-3 h-3" /> {news.date}</span>
                </div>
                <h3 className="font-bold group-hover:text-emerald-300">{news.title}</h3>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><span className="text-3xl">📞</span>Hubungi Kami</h2>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4"><div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center"><Phone className="w-6 h-6 text-emerald-400" /></div><div><p className="text-sm text-emerald-200/60">Telepon</p><p className="font-medium">(0XX) XXX-XXXX</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center"><Mail className="w-6 h-6 text-emerald-400" /></div><div><p className="text-sm text-emerald-200/60">Email</p><p className="font-medium">desa.{village.subdomain}@tanahair.id</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6 text-emerald-400" /></div><div><p className="text-sm text-emerald-200/60">Jam Operasional</p><p className="font-medium">Senin - Jumat, 08:00 - 16:00</p></div></div>
            </div>
            <div className="mt-6 text-center">
              <button onClick={() => navigate(`/kontak/${village.id}`)} className="px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl transition">Kirim Pesan →</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-emerald-950/80 border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3"><div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center"><MapPin className="w-4 h-4 text-emerald-400" /></div><div><p className="font-bold text-sm">Desa {village.name}</p><p className="text-xs text-emerald-200/50">{village.subdomain}.tanahair.id</p></div></div>
            <button onClick={() => navigate(`/account-settings/${village.id}`)} className="text-xs text-emerald-200/50 hover:text-emerald-300 transition flex items-center gap-1"><Settings className="w-3 h-3" />Pengaturan Admin</button>
            <div className="text-center md:text-right"><p className="text-xs text-emerald-200/50">Powered by <span className="text-emerald-300 font-medium">TanahAir SaaS</span></p><p className="text-xs text-emerald-200/40">© 2024 Desa {village.name}</p></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
