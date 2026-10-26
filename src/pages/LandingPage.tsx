import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Building2, Globe, Shield, ArrowRight, Menu, X } from 'lucide-react';
import IndonesiaMap from '../components/IndonesiaMap';
import { useApp } from '../App';

export default function LandingPage() {
  const navigate = useNavigate();
  const { villages } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { icon: Building2, label: 'Desa Terdaftar', value: villages.length.toString() },
    { icon: Users, label: 'Total Penduduk', value: villages.reduce((a, v) => a + (v.population || 0), 0).toLocaleString() },
    { icon: Globe, label: 'Provinsi', value: new Set(villages.map(v => v.province)).size.toString() },
    { icon: Shield, label: 'Uptime', value: '99.9%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">TanahAir</h1>
                <p className="text-[10px] text-slate-400 -mt-1">Platform Desa Digital</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-slate-300 hover:text-white transition">Fitur</a>
              <a href="#map" className="text-sm text-slate-300 hover:text-white transition">Peta</a>
              <a href="#villages" className="text-sm text-slate-300 hover:text-white transition">Desa</a>
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition">Login Admin</button>
              <button onClick={() => navigate('/setup')} className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-lg transition shadow-lg shadow-emerald-500/25">Daftarkan Desa</button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-white/10 px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm text-slate-300">Fitur</a>
            <a href="#map" className="block text-sm text-slate-300">Peta</a>
            <a href="#villages" className="block text-sm text-slate-300">Desa</a>
            <button onClick={() => navigate('/login')} className="block w-full text-left text-sm text-slate-300">Login Admin</button>
            <button onClick={() => navigate('/setup')} className="block w-full text-left text-sm text-emerald-400">Daftarkan Desa</button>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-emerald-300">Platform Desa Digital Indonesia</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Kelola Desa Anda</span><br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Secara Digital</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Platform SaaS untuk digitalisasi pemerintahan desa. Kelola data wilayah, penduduk, dan layanan publik dengan peta interaktif dan dashboard modern.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/setup')} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl font-semibold text-lg transition shadow-2xl shadow-emerald-500/30 flex items-center gap-2">
              Mulai Sekarang <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/login')} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl font-semibold text-lg transition">Lihat Demo</button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center">
              <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="map" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Peta Desa Terdaftar</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Jelajahi desa-desa yang telah bergabung dengan platform TanahAir</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-3xl overflow-hidden shadow-2xl" style={{ height: '500px' }}>
            <IndonesiaMap villages={villages} />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Unggulan</h2>
            <p className="text-slate-400">Semua yang desa Anda butuhkan dalam satu platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🗺️', title: 'Peta Interaktif', desc: 'Visualisasi data wilayah dengan peta Leaflet yang interaktif' },
              { icon: '📊', title: 'Dashboard Modern', desc: 'Pantau statistik desa secara real-time' },
              { icon: '🏘️', title: 'Multi-Tenant SaaS', desc: 'Setiap desa mendapat subdomain sendiri' },
              { icon: '👥', title: 'Manajemen Penduduk', desc: 'Kelola data penduduk dengan sistem terstruktur' },
              { icon: '🔒', title: 'Keamanan Data', desc: 'Data terlindungi dengan autentikasi modern' },
              { icon: '📱', title: 'Responsif Mobile', desc: 'Akses dari perangkat manapun' },
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="villages" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Desa Terdaftar</h2>
            <p className="text-slate-400">Desa-desa yang telah menggunakan platform TanahAir</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {villages.map((village) => (
              <div key={village.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Desa {village.name}</h3>
                    <p className="text-sm text-slate-400">{village.subdomain}.tanahair.id</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Provinsi</span><span>{village.province}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Penduduk</span><span>{village.population?.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Status</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${village.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : village.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>
                      {village.status === 'active' ? 'Aktif' : village.status === 'pending' ? 'Pending' : 'Nonaktif'}
                    </span>
                  </div>
                </div>
                <button onClick={() => navigate(`/preview/${village.id}`)} className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition">Lihat Profil Desa →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Digitalisasi Desa Anda?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Daftarkan desa Anda sekarang dan mulai kelola pemerintahan secara digital.</p>
          <button onClick={() => navigate('/setup')} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl font-semibold text-lg transition shadow-2xl shadow-emerald-500/30">Daftarkan Desa Sekarang</button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-500">
          © 2024 TanahAir SaaS. All rights reserved. Powered by SocietySpatial.
        </div>
      </footer>
    </div>
  );
}
