import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, MapPin, ChevronRight } from 'lucide-react';
import { useApp } from '../App';

const infoData: Record<string, { title: string; category: string; date: string; author: string; image: string; content: string[]; relatedInfo: { title: string; slug: string }[] }> = {
  'profil-desa': { title: 'Profil Desa', category: 'Profil', date: '15 Januari 2024', author: 'Admin Desa', image: '🏘️', content: ['Desa ini merupakan salah satu desa yang terletak di wilayah strategis dengan potensi alam melimpah.', 'Secara administratif, desa dipimpin oleh Kepala Desa yang dipilih demokratis melalui Pilkades setiap 6 tahun.', 'Masyarakat mayoritas bermata pencaharian sebagai petani, pedagang, dan pekerja sektor informal.', 'Visi desa adalah mewujudkan masyarakat sejahtera, mandiri, dan berbudaya melalui pembangunan berkelanjutan.'], relatedInfo: [{ title: 'Sejarah Desa', slug: 'sejarah-desa' }, { title: 'Visi & Misi', slug: 'visi-misi' }, { title: 'Struktur Organisasi', slug: 'struktur-organisasi' }] },
  'sejarah-desa': { title: 'Sejarah Desa', category: 'Profil', date: '10 Januari 2024', author: 'Admin Desa', image: '📜', content: ['Desa ini memiliki sejarah panjang dan kaya akan nilai budaya.', 'Pada awal abad ke-19, sekelompok masyarakat membuka lahan untuk permukiman dan pertanian.', 'Nama desa diambil dari ciri khas alam yang ada di wilayah tersebut.', 'Seiring waktu, desa berkembang menjadi permukiman yang terorganisir.'], relatedInfo: [{ title: 'Profil Desa', slug: 'profil-desa' }, { title: 'Visi & Misi', slug: 'visi-misi' }] },
  'visi-misi': { title: 'Visi & Misi Desa', category: 'Profil', date: '5 Januari 2024', author: 'Admin Desa', image: '🎯', content: ['VISI: "Terwujudnya Desa Sejahtera, Mandiri, dan Berbudaya"', 'MISI 1: Meningkatkan kualitas SDM melalui pendidikan dan kesehatan.', 'MISI 2: Membangun infrastruktur desa yang memadai.', 'MISI 3: Memberdayakan ekonomi masyarakat melalui potensi lokal.', 'MISI 4: Mewujudkan tata kelola pemerintahan yang transparan.'], relatedInfo: [{ title: 'Profil Desa', slug: 'profil-desa' }, { title: 'Struktur Organisasi', slug: 'struktur-organisasi' }] },
  'struktur-organisasi': { title: 'Struktur Organisasi', category: 'Pemerintahan', date: '1 Januari 2024', author: 'Admin Desa', image: '🏛️', content: ['Pemerintahan desa dipimpin Kepala Desa dibantu Perangkat Desa.', '1. KEPALA DESA - Memimpin penyelenggaraan pemerintahan desa.', '2. SEKRETARIS DESA - Administrasi pemerintahan dan keuangan.', '3. KEPALA URUSAN - Melaksanakan urusan pemerintahan dan kesejahteraan.', '4. KEPALA DUSUN - Memimpin pemerintahan di tingkat dusun.'], relatedInfo: [{ title: 'Profil Desa', slug: 'profil-desa' }, { title: 'Visi & Misi', slug: 'visi-misi' }] },
  'demografi': { title: 'Data Demografi', category: 'Data', date: '20 Januari 2024', author: 'Admin Desa', image: '📊', content: ['Jumlah penduduk mencapai ribuan jiwa yang tersebar di beberapa dusun.', 'STRUKTUR USIA: Balita ±10%, Anak ±12%, Remaja ±10%, Dewasa ±55%, Lansia ±13%.', 'PENDIDIKAN: SD ±25%, SMP ±20%, SMA ±30%, Diploma/Sarjana ±17%.', 'MATA PENCAHARIAN: Petani ±40%, Pedagang ±15%, Wiraswasta ±20%, Lainnya ±25%.'], relatedInfo: [{ title: 'Profil Desa', slug: 'profil-desa' }] },
};

export default function InfoDetailPage() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { villages } = useApp();
  const village = villages.find(v => v.id === id);
  const info = infoData[slug || ''];

  if (!village || !info) return <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center text-white"><div className="text-center"><p className="text-xl mb-4">Informasi tidak ditemukan</p><button onClick={() => navigate(`/preview/${id}`)} className="text-emerald-300 hover:underline">Kembali</button></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white">
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10"><div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between"><button onClick={() => navigate(`/preview/${village.id}`)} className="flex items-center gap-2 text-white/70 hover:text-white transition"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Kembali</span></button><div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /><span className="text-sm font-medium">Desa {village.name}</span></div></div></div>
      <div className="max-w-4xl mx-auto px-4 py-4"><div className="flex items-center gap-2 text-sm text-emerald-200/60"><button onClick={() => navigate(`/preview/${village.id}`)} className="hover:text-white transition">Beranda</button><ChevronRight className="w-3 h-3" /><span className="text-emerald-300">Informasi</span><ChevronRight className="w-3 h-3" /><span className="text-white">{info.title}</span></div></div>
      <article className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-600/30 to-teal-600/30 p-12 text-center border-b border-white/10"><div className="text-7xl mb-4">{info.image}</div><span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full mb-4">{info.category}</span><h1 className="text-3xl md:text-4xl font-bold">{info.title}</h1></div>
          <div className="flex flex-wrap items-center gap-4 p-6 border-b border-white/10 text-sm text-emerald-200/70"><div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{info.date}</span></div><div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{info.author}</span></div><div className="flex items-center gap-2"><Tag className="w-4 h-4" /><span>{info.category}</span></div><button className="ml-auto flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition"><Share2 className="w-4 h-4" /><span>Bagikan</span></button></div>
          <div className="p-6 md:p-10 space-y-6">{info.content.map((paragraph, i) => <p key={i} className="text-emerald-100/90 leading-relaxed text-justify">{paragraph}</p>)}</div>
          <div className="p-6 md:p-10 border-t border-white/10 bg-white/5"><h3 className="text-lg font-bold mb-4">Informasi Terkait</h3><div className="grid sm:grid-cols-3 gap-3">{info.relatedInfo.map((related, i) => <button key={i} onClick={() => navigate(`/info/${village.id}/${related.slug}`)} className="flex items-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition text-left group"><span className="text-emerald-400 group-hover:text-emerald-300 text-sm font-medium">{related.title}</span><ChevronRight className="w-4 h-4 text-emerald-400/50 ml-auto" /></button>)}</div></div>
        </div>
      </article>
    </div>
  );
}
