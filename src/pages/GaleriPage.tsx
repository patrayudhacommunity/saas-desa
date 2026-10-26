import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Camera, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../App';

const galeriData = [
  { id: 1, title: 'Balai Desa', category: 'Fasilitas', emoji: '🏛️', desc: 'Gedung Balai Desa tempat pelayanan publik' },
  { id: 2, title: 'Masjid Desa', category: 'Ibadah', emoji: '🕌', desc: 'Masjid utama desa' },
  { id: 3, title: 'Sekolah Dasar', category: 'Pendidikan', emoji: '🏫', desc: 'SDN di desa' },
  { id: 4, title: 'Sawah', category: 'Pertanian', emoji: '🌾', desc: 'Hamparan sawah warga' },
  { id: 5, title: 'Pasar Desa', category: 'Ekonomi', emoji: '🏪', desc: 'Pasar tradisional desa' },
  { id: 6, title: 'Posyandu', category: 'Kesehatan', emoji: '🏥', desc: 'Pos pelayanan terpadu' },
  { id: 7, title: 'Jalan Desa', category: 'Infrastruktur', emoji: '🛣️', desc: 'Jalan utama desa' },
  { id: 8, title: 'Musyawarah Desa', category: 'Kegiatan', emoji: '👥', desc: 'Kegiatan musyawarah desa' },
  { id: 9, title: 'Kegiatan Gotong Royong', category: 'Kegiatan', emoji: '🤝', desc: 'Kerja bakti warga' },
  { id: 10, title: 'Perayaan HUT RI', category: 'Kegiatan', emoji: '🎉', desc: 'Perayaan kemerdekaan' },
  { id: 11, title: 'Hasil Pertanian', category: 'Pertanian', emoji: '🌽', desc: 'Hasil panen warga' },
  { id: 12, title: 'Kerajinan Tangan', category: 'UMKM', emoji: '🧶', desc: 'Produk kerajinan warga' },
];

export default function GaleriPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { villages } = useApp();
  const village = villages.find(v => v.id === id);

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
            <Camera className="w-4 h-4 text-emerald-300" />
            <span className="text-sm text-emerald-300">Galeri Foto</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Galeri Desa {village.name}</h1>
          <p className="text-emerald-200/70 max-w-2xl mx-auto">Dokumentasi kegiatan, fasilitas, dan potensi desa</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galeriData.map((item) => (
            <div key={item.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-emerald-600/20 to-teal-600/20 flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition">{item.emoji}</div>
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full mb-2">{item.category}</span>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-emerald-200/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-emerald-200/60 text-sm">Menampilkan {galeriData.length} foto dari Desa {village.name}</p>
        </div>
      </main>
    </div>
  );
}
