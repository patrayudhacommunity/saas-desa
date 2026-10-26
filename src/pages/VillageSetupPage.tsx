import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, ArrowRight, Check, Building2, Globe, User, Lock, Map } from 'lucide-react';
import { useApp, Village } from '../App';
import L from 'leaflet';

export default function VillageSetupPage() {
  const navigate = useNavigate();
  const { addVillage } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createdVillage, setCreatedVillage] = useState<Village | null>(null);
  const [formData, setFormData] = useState({ name: '', lat: -2.5, lng: 118.0, population: '', area: '', district: '', regency: '', province: '' });

  const generateSubdomain = (name: string) => name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').trim();
  const subdomain = generateSubdomain(formData.name);
  const adminUser = subdomain;
  const adminPass = subdomain ? `${subdomain}123` : '';

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (step !== 2 || !mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current, { center: [formData.lat, formData.lng], zoom: 5 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OSM' }).addTo(map);
    const marker = L.marker([formData.lat, formData.lng], { draggable: true }).addTo(map);
    marker.bindPopup('Geser marker untuk memilih koordinat').openPopup();
    marker.on('dragend', (e: any) => { const pos = e.target.getLatLng(); setFormData(prev => ({ ...prev, lat: pos.lat, lng: pos.lng })); });
    map.on('click', (e: any) => { marker.setLatLng(e.latlng); setFormData(prev => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng })); });
    mapInstanceRef.current = map;
    markerRef.current = marker;
    return () => { map.remove(); mapInstanceRef.current = null; };
  }, [step]);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newVillage: Village = {
      id: Date.now().toString(), name: formData.name, subdomain, lat: formData.lat, lng: formData.lng,
      adminUser, adminPass, createdAt: new Date().toISOString().split('T')[0], status: 'pending',
      population: parseInt(formData.population) || 0, area: formData.area, district: formData.district, regency: formData.regency, province: formData.province,
    };
    addVillage(newVillage);
    setCreatedVillage(newVillage);
    setStep(4);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Kembali</span></button>
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center"><MapPin className="w-5 h-5 text-white" /></div><span className="font-bold">TanahAir</span></div>
          <div className="w-20"></div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-12">
          {[{ num: 1, label: 'Info Desa', icon: Building2 }, { num: 2, label: 'Koordinat', icon: Map }, { num: 3, label: 'Konfirmasi', icon: Check }].map((s, i) => (
            <React.Fragment key={s.num}>
              <div className={`flex items-center gap-2 ${step >= s.num ? 'text-emerald-400' : 'text-slate-500'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${step >= s.num ? 'border-emerald-400 bg-emerald-400/10' : 'border-slate-600 bg-slate-800'}`}>
                  {step > s.num ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
              </div>
              {i < 2 && <div className={`w-16 sm:w-24 h-0.5 mx-2 ${step > s.num ? 'bg-emerald-400' : 'bg-slate-700'}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8">
            <div className="text-center mb-8"><h2 className="text-2xl font-bold mb-2">Informasi Desa</h2><p className="text-slate-400">Masukkan informasi dasar desa Anda</p></div>
            <div className="space-y-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nama Desa <span className="text-red-400">*</span></label>
                <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Contoh: Remai" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                {formData.name && <p className="mt-2 text-sm text-slate-400">Subdomain: <code className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{subdomain}.tanahair.id</code></p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-300 mb-2">Kecamatan</label><input type="text" value={formData.district} onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
                <div><label className="block text-sm font-medium text-slate-300 mb-2">Kabupaten/Kota</label><input type="text" value={formData.regency} onChange={(e) => setFormData(prev => ({ ...prev, regency: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Provinsi</label>
                <select value={formData.province} onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option value="" className="bg-slate-800">Pilih Provinsi</option>
                  {['Aceh', 'Sumatera Utara', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali', 'Kalimantan Selatan', 'Kalimantan Tengah', 'Sulawesi Selatan', 'Papua'].map(p => <option key={p} value={p} className="bg-slate-800">{p}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-300 mb-2">Jumlah Penduduk</label><input type="number" value={formData.population} onChange={(e) => setFormData(prev => ({ ...prev, population: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
                <div><label className="block text-sm font-medium text-slate-300 mb-2">Luas Wilayah</label><input type="text" value={formData.area} onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))} placeholder="15.2 km²" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => setStep(2)} disabled={!formData.name.trim()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-medium hover:from-emerald-600 hover:to-blue-600 transition disabled:opacity-50">Selanjutnya <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8">
            <div className="text-center mb-8"><h2 className="text-2xl font-bold mb-2">Koordinat Desa</h2><p className="text-slate-400">Tentukan lokasi desa pada peta</p></div>
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-6" style={{ height: '400px' }}><div ref={mapRef} style={{ width: '100%', height: '100%' }} /></div>
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <div><label className="block text-sm font-medium text-slate-300 mb-2">Latitude</label><input type="number" step="0.0001" value={formData.lat} onChange={(e) => setFormData(prev => ({ ...prev, lat: parseFloat(e.target.value) || 0 }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
              <div><label className="block text-sm font-medium text-slate-300 mb-2">Longitude</label><input type="number" step="0.0001" value={formData.lng} onChange={(e) => setFormData(prev => ({ ...prev, lng: parseFloat(e.target.value) || 0 }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition"><ArrowLeft className="w-4 h-4" /> Kembali</button>
              <button onClick={() => setStep(3)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-medium hover:from-emerald-600 hover:to-blue-600 transition">Selanjutnya <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8">
            <div className="text-center mb-8"><h2 className="text-2xl font-bold mb-2">Konfirmasi Setup</h2><p className="text-slate-400">Periksa kembali informasi desa</p></div>
            <div className="max-w-lg mx-auto space-y-6">
              <div className="bg-slate-800/50 rounded-2xl p-6">
                <h3 className="font-bold text-emerald-400 mb-4">Informasi Desa</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-slate-400">Nama:</span></div><div className="font-medium">{formData.name}</div>
                  <div><span className="text-slate-400">Kecamatan:</span></div><div className="font-medium">{formData.district || '-'}</div>
                  <div><span className="text-slate-400">Kabupaten:</span></div><div className="font-medium">{formData.regency || '-'}</div>
                  <div><span className="text-slate-400">Provinsi:</span></div><div className="font-medium">{formData.province || '-'}</div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6">
                <h3 className="font-bold text-blue-400 mb-4">Domain & Subdomain</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Subdomain:</span><code className="text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">{subdomain}.tanahair.id</code></div>
                  <div className="flex justify-between"><span className="text-slate-400">Koordinat:</span><span className="font-medium">{formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}</span></div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6">
                <h3 className="font-bold text-purple-400 mb-4">Kredensial Admin Desa</h3>
                <div className="text-sm space-y-3">
                  <div className="flex items-center gap-3"><User className="w-4 h-4 text-slate-400" /><div><span className="text-slate-400">Username: </span><code className="text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">{adminUser}</code></div></div>
                  <div className="flex items-center gap-3"><Lock className="w-4 h-4 text-slate-400" /><div><span className="text-slate-400">Password: </span><code className="text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">{adminPass}</code></div></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition"><ArrowLeft className="w-4 h-4" /> Kembali</button>
              <button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-medium hover:from-emerald-600 hover:to-blue-600 transition disabled:opacity-50">
                {loading ? 'Mendaftarkan...' : <><Check className="w-5 h-5" /> Daftarkan Desa</>}
              </button>
            </div>
          </div>
        )}

        {step === 4 && createdVillage && (
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-emerald-400" /></div>
            <h2 className="text-2xl font-bold mb-2">Desa Berhasil Didaftarkan!</h2>
            <p className="text-slate-400 mb-8">Desa {createdVillage.name} telah terdaftar di platform TanahAir</p>
            <div className="max-w-md mx-auto bg-slate-800/50 rounded-2xl p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between text-sm"><span className="text-slate-400">Domain:</span><code className="text-emerald-300">{createdVillage.subdomain}.tanahair.id</code></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">Admin User:</span><code className="text-emerald-300">{createdVillage.adminUser}</code></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">Admin Pass:</span><code className="text-emerald-300">{createdVillage.adminPass}</code></div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate(`/preview/${createdVillage.id}`)} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition">Lihat Profil Desa</button>
              <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-medium hover:from-emerald-600 hover:to-blue-600 transition">Ke Dashboard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
