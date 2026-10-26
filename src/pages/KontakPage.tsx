import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, CheckCircle, User, MessageSquare } from 'lucide-react';
import { useApp } from '../App';

export default function KontakPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { villages } = useApp();
  const village = villages.find(v => v.id === id);

  const [formData, setFormData] = useState({ nama: '', email: '', subjek: '', pesan: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  if (!village) return <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center text-white"><div className="text-center"><p className="text-xl mb-4">Desa tidak ditemukan</p><button onClick={() => navigate('/')} className="text-emerald-300 hover:underline">Kembali</button></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white">
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(`/preview/${village.id}`)} className="flex items-center gap-2 text-white/70 hover:text-white transition"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Kembali</span></button>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /><span className="text-sm font-medium">Desa {village.name}</span></div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            <MessageSquare className="w-4 h-4 text-emerald-300" />
            <span className="text-sm text-emerald-300">Hubungi Kami</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Kontak Desa {village.name}</h1>
          <p className="text-emerald-200/70 max-w-2xl mx-auto">Silakan hubungi kami untuk informasi lebih lanjut atau sampaikan aspirasi Anda</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Alamat</h3>
                    <p className="text-emerald-200/70 text-sm">
                      Kantor Desa {village.name}<br />
                      {village.district && `${village.district}, `}{village.regency}<br />
                      {village.province}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Telepon</h3>
                    <p className="text-emerald-200/70 text-sm">(0XX) XXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-emerald-200/70 text-sm">desa.{village.subdomain}@tanahair.id</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Jam Operasional</h3>
                    <p className="text-emerald-200/70 text-sm">
                      Senin - Jumat: 08:00 - 16:00 WIB<br />
                      Sabtu: 08:00 - 12:00 WIB<br />
                      Minggu & Hari Libur: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-4">Media Sosial</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition">
                  <span className="text-2xl">📘</span>
                  <span className="text-sm">Facebook</span>
                </button>
                <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition">
                  <span className="text-2xl">📷</span>
                  <span className="text-sm">Instagram</span>
                </button>
                <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition">
                  <span className="text-2xl">🐦</span>
                  <span className="text-sm">Twitter</span>
                </button>
                <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition">
                  <span className="text-2xl">💬</span>
                  <span className="text-sm">WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6">Kirim Pesan</h2>
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pesan Terkirim!</h3>
                <p className="text-emerald-200/70 mb-6">Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ nama: '', email: '', subjek: '', pesan: '' }); }} className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl transition">Kirim Pesan Lain</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-100 mb-2">Nama Lengkap <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" />
                    <input type="text" value={formData.nama} onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))} placeholder="Nama lengkap Anda" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-100 mb-2">Email <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" />
                    <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="email@contoh.com" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-100 mb-2">Subjek <span className="text-red-400">*</span></label>
                  <input type="text" value={formData.subjek} onChange={(e) => setFormData(prev => ({ ...prev, subjek: e.target.value }))} placeholder="Subjek pesan" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-100 mb-2">Pesan <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-emerald-400/50" />
                    <textarea value={formData.pesan} onChange={(e) => setFormData(prev => ({ ...prev, pesan: e.target.value }))} placeholder="Tulis pesan Anda di sini..." rows={5} className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none" required />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-medium transition disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? 'Mengirim...' : <><Send className="w-5 h-5" />Kirim Pesan</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
