import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, CheckCircle, MapPin, Phone, Mail, Calendar, ChevronRight } from 'lucide-react';
import { useApp } from '../App';

const serviceData: Record<string, { title: string; icon: string; category: string; description: string; requirements: string[]; procedures: string[]; costs: string; duration: string; contact: { phone: string; email: string; hours: string }; form: { fields: { name: string; type: string; required: boolean; placeholder: string }[] }; relatedServices: { title: string; slug: string }[] }> = {
  'surat-pengantar-ktp': { title: 'Surat Pengantar KTP', icon: '📄', category: 'Administrasi', description: 'Surat pengantar untuk pembuatan KTP baru, perpanjangan, atau perubahan data.', requirements: ['Fotokopi KK', 'Fotokopi Akta Kelahiran', 'Pas foto 3x4 (2 lembar)', 'Surat pengantar RT/RW'], procedures: ['Menghadap RT/RW untuk surat pengantar', 'Membawa berkas ke kantor desa', 'Verifikasi berkas oleh petugas', 'Penerbitan Surat Pengantar', 'Proses di Disdukcapil'], costs: 'GRATIS', duration: '1-2 hari kerja', contact: { phone: '(0XX) XXX-XXXX', email: 'desa.admin@tanahair.id', hours: 'Senin - Jumat, 08:00 - 15:00' }, form: { fields: [{ name: 'nama_lengkap', type: 'text', required: true, placeholder: 'Nama lengkap' }, { name: 'nik', type: 'text', required: true, placeholder: '16 digit NIK' }, { name: 'alamat', type: 'text', required: true, placeholder: 'Alamat lengkap' }] }, relatedServices: [{ title: 'Surat Pengantar KK', slug: 'surat-pengantar-kk' }, { title: 'Surat Keterangan Domisili', slug: 'surat-keterangan-domisili' }] },
  'surat-pengantar-kk': { title: 'Surat Pengantar KK', icon: '📋', category: 'Administrasi', description: 'Surat pengantar untuk pembuatan Kartu Keluarga baru atau perubahan data.', requirements: ['Fotokopi KTP seluruh anggota', 'Fotokopi KK lama', 'Fotokopi Akta Nikah', 'Surat pengantar RT/RW'], procedures: ['Mendapat pengantar RT/RW', 'Menyerahkan berkas di kantor desa', 'Verifikasi data', 'Penerbitan Surat Pengantar'], costs: 'GRATIS', duration: '1-3 hari kerja', contact: { phone: '(0XX) XXX-XXXX', email: 'desa.admin@tanahair.id', hours: 'Senin - Jumat, 08:00 - 15:00' }, form: { fields: [{ name: 'nama_kepala_keluarga', type: 'text', required: true, placeholder: 'Nama kepala keluarga' }, { name: 'nik_kepala', type: 'text', required: true, placeholder: 'NIK' }] }, relatedServices: [{ title: 'Surat Pengantar KTP', slug: 'surat-pengantar-ktp' }, { title: 'Surat Keterangan Domisili', slug: 'surat-keterangan-domisili' }] },
  'surat-keterangan-domisili': { title: 'Surat Keterangan Domisili', icon: '🏠', category: 'Keterangan', description: 'Surat keterangan domisili untuk keperluan administrasi.', requirements: ['Fotokopi KTP', 'Fotokopi KK', 'Surat pengantar RT/RW'], procedures: ['Mendapat pengantar RT/RW', 'Menyerahkan berkas', 'Verifikasi data', 'Penerbitan surat'], costs: 'GRATIS', duration: '1 hari kerja', contact: { phone: '(0XX) XXX-XXXX', email: 'desa.admin@tanahair.id', hours: 'Senin - Jumat, 08:00 - 15:00' }, form: { fields: [{ name: 'nama', type: 'text', required: true, placeholder: 'Nama lengkap' }, { name: 'nik', type: 'text', required: true, placeholder: 'NIK' }, { name: 'keperluan', type: 'textarea', required: true, placeholder: 'Keperluan surat' }] }, relatedServices: [{ title: 'Surat Pengantar KTP', slug: 'surat-pengantar-ktp' }, { title: 'SKTM', slug: 'surat-keterangan-tidak-mampu' }] },
  'surat-keterangan-tidak-mampu': { title: 'SKTM', icon: '💰', category: 'Keterangan', description: 'Surat Keterangan Tidak Mampu untuk bantuan sosial atau keringanan biaya.', requirements: ['Fotokopi KTP', 'Fotokopi KK', 'Surat pengantar RT/RW', 'Surat pernyataan tidak mampu'], procedures: ['Mendapat pengantar RT/RW', 'Menyerahkan berkas', 'Verifikasi kondisi ekonomi', 'Penerbitan SKTM'], costs: 'GRATIS', duration: '2-3 hari kerja', contact: { phone: '(0XX) XXX-XXXX', email: 'desa.admin@tanahair.id', hours: 'Senin - Jumat, 08:00 - 15:00' }, form: { fields: [{ name: 'nama', type: 'text', required: true, placeholder: 'Nama lengkap' }, { name: 'nik', type: 'text', required: true, placeholder: 'NIK' }, { name: 'keperluan', type: 'textarea', required: true, placeholder: 'Keperluan SKTM' }] }, relatedServices: [{ title: 'Bantuan Sosial', slug: 'data-bantuan-sosial' }, { title: 'Surat Keterangan Domisili', slug: 'surat-keterangan-domisili' }] },
  'surat-keterangan-usaha': { title: 'Surat Keterangan Usaha', icon: '🏪', category: 'Keterangan', description: 'Surat keterangan usaha untuk pengurusan izin atau kredit usaha.', requirements: ['Fotokopi KTP pemilik usaha', 'Fotokopi KK', 'Surat pengantar RT/RW', 'Foto lokasi usaha'], procedures: ['Mendapat pengantar RT/RW', 'Menyerahkan berkas', 'Verifikasi data usaha', 'Penerbitan SKU'], costs: 'GRATIS', duration: '1-2 hari kerja', contact: { phone: '(0XX) XXX-XXXX', email: 'desa.admin@tanahair.id', hours: 'Senin - Jumat, 08:00 - 15:00' }, form: { fields: [{ name: 'nama_pemilik', type: 'text', required: true, placeholder: 'Nama pemilik' }, { name: 'nama_usaha', type: 'text', required: true, placeholder: 'Nama usaha' }, { name: 'jenis_usaha', type: 'text', required: true, placeholder: 'Jenis usaha' }] }, relatedServices: [{ title: 'SKTM', slug: 'surat-keterangan-tidak-mampu' }, { title: 'Surat Keterangan Domisili', slug: 'surat-keterangan-domisili' }] },
  'data-bantuan-sosial': { title: 'Data Bantuan Sosial', icon: '🎁', category: 'Bantuan', description: 'Informasi program bantuan sosial yang disalurkan melalui desa.', requirements: ['Terdaftar sebagai warga desa', 'Memenuhi kriteria penerima', 'Memiliki KTP dan KK', 'Terdata dalam DTKS'], procedures: ['Pendaftaran oleh RT/RW', 'Verifikasi data', 'Musyawarah desa', 'Pengusulan ke dinas', 'Penyaluran bantuan'], costs: 'GRATIS', duration: 'Sesuai jadwal', contact: { phone: '(0XX) XXX-XXXX', email: 'desa.admin@tanahair.id', hours: 'Senin - Jumat, 08:00 - 15:00' }, form: { fields: [{ name: 'nama', type: 'text', required: true, placeholder: 'Nama lengkap' }, { name: 'nik', type: 'text', required: true, placeholder: 'NIK' }, { name: 'jenis_bantuan', type: 'text', required: true, placeholder: 'Jenis bantuan' }] }, relatedServices: [{ title: 'SKTM', slug: 'surat-keterangan-tidak-mampu' }, { title: 'APBDes', slug: 'apbdes' }] },
  'apbdes': { title: 'APBDes', icon: '📊', category: 'Keuangan', description: 'Informasi transparansi Anggaran Pendapatan dan Belanja Desa.', requirements: ['Warga desa atau pihak berkepentingan'], procedures: ['Musrenbangdes', 'Pembahasan RKPDes dan APBDes', 'Pengesahan APBDes', 'Pelaksanaan anggaran', 'Pelaporan'], costs: 'GRATIS', duration: 'Tersedia sepanjang tahun', contact: { phone: '(0XX) XXX-XXXX', email: 'desa.admin@tanahair.id', hours: 'Senin - Jumat, 08:00 - 15:00' }, form: { fields: [{ name: 'nama', type: 'text', required: true, placeholder: 'Nama lengkap' }, { name: 'keperluan', type: 'textarea', required: true, placeholder: 'Keperluan informasi' }] }, relatedServices: [{ title: 'Bantuan Sosial', slug: 'data-bantuan-sosial' }, { title: 'Profil Desa', slug: 'profil-desa' }] },
};

export default function ServiceDetailPage() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { villages } = useApp();
  const village = villages.find(v => v.id === id);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const service = serviceData[slug || ''];

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormSubmitted(true);
    setFormLoading(false);
  };

  if (!village || !service) return <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center text-white"><div className="text-center"><p className="text-xl mb-4">Layanan tidak ditemukan</p><button onClick={() => navigate(`/preview/${id}`)} className="text-emerald-300 hover:underline">Kembali</button></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white">
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10"><div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between"><button onClick={() => navigate(`/preview/${village.id}`)} className="flex items-center gap-2 text-white/70 hover:text-white transition"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Kembali</span></button><div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /><span className="text-sm font-medium">Desa {village.name}</span></div></div></div>
      <div className="max-w-4xl mx-auto px-4 py-4"><div className="flex items-center gap-2 text-sm text-emerald-200/60"><button onClick={() => navigate(`/preview/${village.id}`)} className="hover:text-white transition">Beranda</button><ChevronRight className="w-3 h-3" /><span className="text-emerald-300">Layanan</span><ChevronRight className="w-3 h-3" /><span className="text-white">{service.title}</span></div></div>
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl overflow-hidden mb-6">
          <div className="bg-gradient-to-br from-emerald-600/30 to-teal-600/30 p-8 md:p-12 border-b border-white/10"><div className="flex flex-col md:flex-row items-start gap-6"><div className="text-6xl">{service.icon}</div><div className="flex-1"><span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full mb-3">{service.category}</span><h1 className="text-2xl md:text-3xl font-bold mb-3">{service.title}</h1><p className="text-emerald-100/80 leading-relaxed">{service.description}</p></div></div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-6 flex items-center gap-4"><div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center"><FileText className="w-6 h-6 text-emerald-400" /></div><div><p className="text-xs text-emerald-200/60">Biaya</p><p className="font-bold text-emerald-300">{service.costs}</p></div></div>
            <div className="p-6 flex items-center gap-4"><div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6 text-blue-400" /></div><div><p className="text-xs text-emerald-200/60">Estimasi</p><p className="font-bold">{service.duration}</p></div></div>
            <div className="p-6 flex items-center gap-4"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center"><Calendar className="w-6 h-6 text-purple-400" /></div><div><p className="text-xs text-emerald-200/60">Jam Layanan</p><p className="font-bold text-sm">{service.contact.hours}</p></div></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"><h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-400" />Persyaratan</h2><ul className="space-y-3">{service.requirements.map((req, i) => <li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-emerald-100/80">{req}</span></li>)}</ul></div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"><h2 className="text-lg font-bold mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-400" />Prosedur</h2><ol className="space-y-3">{service.procedures.map((proc, i) => <li key={i} className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span><span className="text-sm text-emerald-100/80 pt-0.5">{proc}</span></li>)}</ol></div>
        </div>
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-emerald-400" />Kontak Layanan</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-emerald-400" /><div><p className="text-xs text-emerald-200/60">Telepon</p><p className="text-sm font-medium">{service.contact.phone}</p></div></div>
            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-emerald-400" /><div><p className="text-xs text-emerald-200/60">Email</p><p className="text-sm font-medium">{service.contact.email}</p></div></div>
            <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-emerald-400" /><div><p className="text-xs text-emerald-200/60">Jam Operasional</p><p className="text-sm font-medium">{service.contact.hours}</p></div></div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-400" />Formulir Pengajuan Online</h2>
          {formSubmitted ? (
            <div className="text-center py-8"><div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-emerald-400" /></div><h3 className="text-xl font-bold mb-2">Pengajuan Berhasil!</h3><p className="text-emerald-200/70 mb-6">Pengajuan Anda sedang diproses.</p><button onClick={() => { setFormSubmitted(false); setFormData({}); }} className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl transition">Buat Pengajuan Baru</button></div>
          ) : (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              {service.form.fields.map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-emerald-100 mb-2">{field.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}{field.required && <span className="text-red-400 ml-1">*</span>}</label>
                  {field.type === 'textarea' ? (
                    <textarea required={field.required} value={formData[field.name] || ''} onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))} placeholder={field.placeholder} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none" />
                  ) : (
                    <input type={field.type} required={field.required} value={formData[field.name] || ''} onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))} placeholder={field.placeholder} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                  )}
                </div>
              ))}
              <button type="submit" disabled={formLoading} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-medium transition disabled:opacity-50 flex items-center justify-center gap-2">{formLoading ? 'Mengirim...' : <><FileText className="w-5 h-5" />Kirim Pengajuan</>}</button>
            </form>
          )}
        </div>
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Layanan Terkait</h2>
          <div className="grid sm:grid-cols-3 gap-3">{service.relatedServices.map((related, i) => <button key={i} onClick={() => { navigate(`/layanan/${village.id}/${related.slug}`); window.scrollTo(0, 0); }} className="flex items-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition text-left group"><span className="text-emerald-400 group-hover:text-emerald-300 text-sm font-medium">{related.title}</span><ChevronRight className="w-4 h-4 text-emerald-400/50 ml-auto" /></button>)}</div>
        </div>
      </main>
    </div>
  );
}
