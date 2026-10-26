import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, User, Tag, Share2, MapPin, ChevronRight, 
  Facebook, Twitter, MessageCircle, Heart, Eye, Calendar
} from 'lucide-react';
import { useApp } from '../App';

// Berita data
const beritaData: Record<string, {
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  relatedNews: { title: string; slug: string; date: string }[];
}> = {
  'musyawarah-desa-2024': {
    title: 'Musyawarah Desa Tahun 2024',
    category: 'Pemerintahan',
    date: '15 Januari 2024',
    author: 'Admin Desa',
    image: '🏛️',
    excerpt: 'Musyawarah Desa (Musdes) tahun 2024 telah dilaksanakan dengan membahas rencana kerja pemerintah desa dan anggaran untuk tahun berjalan.',
    content: [
      'Musyawarah Desa (Musdes) tahun 2024 telah dilaksanakan pada hari Senin, 15 Januari 2024 di Balai Desa. Acara ini dihadiri oleh seluruh perangkat desa, anggota BPD, tokoh masyarakat, RT/RW, serta perwakilan dari berbagai lembaga desa.',
      'Dalam musyawarah tersebut, dibahas beberapa agenda penting meliputi evaluasi pelaksanaan program kerja tahun 2023, penyusunan rencana kerja pemerintah desa (RKPDes) tahun 2024, serta pembahasan Anggaran Pendapatan dan Belanja Desa (APBDes) tahun 2024.',
      'Kepala Desa dalam sambutannya menyampaikan bahwa tahun 2024 akan menjadi tahun yang penting bagi pembangunan desa. "Kita akan fokus pada tiga prioritas utama yaitu peningkatan infrastruktur jalan desa, pemberdayaan ekonomi masyarakat melalui pengembangan UMKM, dan peningkatan kualitas layanan publik," ujarnya.',
      'Salah satu hasil penting dari musyawarah ini adalah kesepakatan untuk mengalokasikan 40% anggaran desa untuk pembangunan infrastruktur, 30% untuk pemberdayaan masyarakat, 20% untuk operasional pemerintahan, dan 10% untuk cadangan darurat.',
      'Selain itu, disepakati juga program-program unggulan seperti pelatihan keterampilan bagi pemuda, pengembangan kelompok tani, peningkatan posyandu, dan pembangunan taman bacaan masyarakat. Seluruh program ini diharapkan dapat meningkatkan kualitas hidup masyarakat desa.',
      'Musyawarah berlangsung dalam suasana yang demokratis dan partisipatif. Seluruh peserta diberikan kesempatan untuk menyampaikan aspirasi dan usulan mereka. "Ini adalah wujud nyata demokrasi di tingkat desa. Setiap suara masyarakat sangat berarti bagi pembangunan desa kita," tambah Kepala Desa.',
      'Acara ditutup dengan doa bersama dan ramamah tamah. Seluruh peserta berharap pelaksanaan program kerja tahun 2024 dapat berjalan lancar dan memberikan manfaat yang maksimal bagi masyarakat desa.',
    ],
    views: 1250,
    likes: 89,
    comments: 23,
    tags: ['Musyawarah', 'Pemerintahan', 'APBDes', 'Perencanaan'],
    relatedNews: [
      { title: 'Program Bantuan Langsung Tunai', slug: 'program-bantuan-langsung-tunai', date: '10 Jan 2024' },
      { title: 'Pembangunan Jalan Desa', slug: 'pembangunan-jalan-desa', date: '5 Jan 2024' },
      { title: 'Pelatihan UMKM', slug: 'pelatihan-umkm', date: '20 Des 2023' },
    ],
  },
  'program-bantuan-langsung-tunai': {
    title: 'Program Bantuan Langsung Tunai',
    category: 'Bantuan',
    date: '10 Januari 2024',
    author: 'Admin Desa',
    image: '💰',
    excerpt: 'Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa tahap pertama tahun 2024 telah dilaksanakan untuk 150 Keluarga Penerima Manfaat (KPM).',
    content: [
      'Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa tahap pertama tahun 2024 telah dilaksanakan pada hari Rabu, 10 Januari 2024 di Balai Desa. Sebanyak 150 Keluarga Penerima Manfaat (KPM) menerima bantuan sebesar Rp 300.000 per bulan selama 3 bulan.',
      'Kepala Desa menjelaskan bahwa penyaluran BLT ini merupakan amanat dari pemerintah pusat yang dialokasikan melalui Dana Desa. "Bantuan ini ditujukan untuk keluarga yang terdampak ekonomi dan masuk dalam Data Terpadu Kesejahteraan Sosial (DTKS)," jelasnya.',
      'Proses penyaluran dilakukan dengan tertib dan transparan. Setiap KPM harus menunjukkan KTP dan Kartu Keluarga untuk verifikasi data. Petugas desa juga melakukan pendampingan bagi KPM yang mengalami kesulitan dalam proses pencairan.',
      'Salah satu penerima bantuan, Ibu Siti (52 tahun), menyampaikan rasa terima kasihnya. "Alhamdulillah, bantuan ini sangat membantu untuk memenuhi kebutuhan sehari-hari. Terima kasih kepada pemerintah dan perangkat desa yang telah menyalurkan bantuan ini," ucapnya.',
      'Desa juga memastikan bahwa data penerima bantuan telah melalui proses musyawarah desa dan verifikasi oleh RT/RW. "Kami berkomitmen untuk menyalurkan bantuan ini secara tepat sasaran dan transparan. Tidak ada unsur diskriminasi dalam penentuan penerima," tegas Kepala Desa.',
      'Untuk tahap berikutnya, desa akan melakukan update data penerima bantuan secara berkala. Masyarakat yang merasa memenuhi kriteria namun belum terdaftar dapat mengajukan permohonan melalui RT/RW setempat.',
      'Selain BLT Dana Desa, pemerintah desa juga menyalurkan berbagai bantuan sosial lainnya seperti Program Keluarga Harapan (PKH), Bantuan Pangan Non Tunai (BPNT), dan bantuan dari pemerintah daerah.',
    ],
    views: 980,
    likes: 67,
    comments: 15,
    tags: ['BLT', 'Bantuan Sosial', 'Dana Desa', 'Kesejahteraan'],
    relatedNews: [
      { title: 'Musyawarah Desa Tahun 2024', slug: 'musyawarah-desa-2024', date: '15 Jan 2024' },
      { title: 'Posyandu Balita Rutin', slug: 'posyandu-balita-rutin', date: '1 Jan 2024' },
      { title: 'Pelatihan UMKM', slug: 'pelatihan-umkm', date: '20 Des 2023' },
    ],
  },
  'pembangunan-jalan-desa': {
    title: 'Pembangunan Jalan Desa',
    category: 'Infrastruktur',
    date: '5 Januari 2024',
    author: 'Admin Desa',
    image: '🛣️',
    excerpt: 'Proyek pembangunan jalan desa sepanjang 2 km di Dusun Krajan telah dimulai. Proyek ini diharapkan selesai dalam waktu 3 bulan.',
    content: [
      'Proyek pembangunan jalan desa sepanjang 2 kilometer di Dusun Krajan telah resmi dimulai pada hari Jumat, 5 Januari 2024. Proyek ini merupakan salah satu prioritas pembangunan tahun 2024 yang dibiayai dari Dana Desa.',
      'Kepala Desa menjelaskan bahwa jalan yang dibangun merupakan akses utama menuju lahan pertanian warga. "Selama ini jalan tersebut masih berupa jalan tanah yang sangat sulit dilalui, terutama saat musim hujan. Dengan adanya pembangunan ini, diharapkan akses masyarakat ke lahan pertanian menjadi lebih mudah," ujarnya.',
      'Proyek pembangunan jalan ini akan dilaksanakan dengan sistem swakelola yang melibatkan partisipasi masyarakat. "Kami menggunakan sistem padat karya tunai, sehingga selain mendapatkan infrastruktur yang baik, masyarakat juga mendapatkan penghasilan dari pekerjaan ini," tambah Kepala Desa.',
      'Spesifikasi jalan yang dibangun adalah jalan rabat beton dengan lebar 3 meter dan tebal 15 cm. Di sepanjang jalan juga akan dibangun drainase untuk mengatasi genangan air saat hujan.',
      'Total anggaran untuk proyek ini adalah Rp 450 juta yang bersumber dari Dana Desa. Pekerjaan ditargetkan selesai dalam waktu 3 bulan atau paling lambat akhir Maret 2024.',
      'Masyarakat menyambut baik adanya pembangunan ini. Pak Ahmad (45 tahun), salah satu petani, menyampaikan "Saya sangat bersyukur akhirnya jalan ini dibangun. Selama puluhan tahun kami kesulitan mengangkut hasil pertanian karena jalan yang buruk. Sekarang harapan kami mulai terwujud."',
      'Pemerintah desa juga mengawasi ketat pelaksanaan proyek untuk memastikan kualitas dan ketepatan waktu. Tim pengawas dari BPD dan masyarakat akan melakukan monitoring secara berkala.',
    ],
    views: 1520,
    likes: 134,
    comments: 28,
    tags: ['Infrastruktur', 'Jalan Desa', 'Pembangunan', 'Dana Desa'],
    relatedNews: [
      { title: 'Musyawarah Desa Tahun 2024', slug: 'musyawarah-desa-2024', date: '15 Jan 2024' },
      { title: 'Program Bantuan Langsung Tunai', slug: 'program-bantuan-langsung-tunai', date: '10 Jan 2024' },
      { title: 'Pelatihan UMKM', slug: 'pelatihan-umkm', date: '20 Des 2023' },
    ],
  },
  'posyandu-balita-rutin': {
    title: 'Posyandu Balita Rutin',
    category: 'Kesehatan',
    date: '1 Januari 2024',
    author: 'Admin Desa',
    image: '👶',
    excerpt: 'Kegiatan Posyandu balita rutin bulan Januari 2024 telah dilaksanakan di 5 posyandu yang tersebar di seluruh dusun dengan kehadiran 180 balita.',
    content: [
      'Kegiatan Posyandu balita rutin bulan Januari 2024 telah dilaksanakan pada hari Selasa, 1 Januari 2024 di 5 posyandu yang tersebar di seluruh dusun. Kegiatan ini diikuti oleh 180 balita dari berbagai usia.',
      'Dalam kegiatan posyandu ini, dilakukan berbagai layanan kesehatan seperti penimbangan berat badan, pengukuran tinggi badan, pemeriksaan kesehatan umum, pemberian vitamin dan obat cacing, serta imunisasi bagi balita yang membutuhkan.',
      'Kepala Desa menyampaikan bahwa posyandu merupakan program penting untuk memantau tumbuh kembang anak. "Kesehatan anak adalah investasi masa depan desa kita. Oleh karena itu, kami sangat mendukung kegiatan posyandu dan akan terus meningkatkan kualitas layanan," ujarnya.',
      'Petugas kesehatan dari Puskesmas pembimbing juga hadir dalam kegiatan ini untuk memberikan penyuluhan kesehatan kepada para ibu. Materi penyuluhan meliputi gizi seimbang untuk balita, pencegahan stunting, dan pentingnya imunisasi lengkap.',
      'Salah satu kader posyandu, Ibu Maryam (38 tahun), menyampaikan bahwa antusiasme ibu-ibu dalam membawa anak mereka ke posyandu sangat tinggi. "Alhamdulillah, kesadaran ibu-ibu tentang pentingnya pemantauan tumbuh kembang anak semakin meningkat. Ini terlihat dari kehadiran yang selalu ramai setiap bulan," ucapnya.',
      'Selain layanan kesehatan, posyandu juga memberikan makanan tambahan (PMT) bagi balita yang mengalami gizi kurang. Program ini bertujuan untuk mencegah dan mengatasi masalah gizi pada anak.',
      'Pemerintah desa berkomitmen untuk terus meningkatkan kualitas layanan posyandu dengan menyediakan fasilitas yang memadai dan meningkatkan kapasitas kader melalui pelatihan berkala.',
    ],
    views: 750,
    likes: 56,
    comments: 12,
    tags: ['Posyandu', 'Kesehatan', 'Balita', 'Gizi'],
    relatedNews: [
      { title: 'Program Bantuan Langsung Tunai', slug: 'program-bantuan-langsung-tunai', date: '10 Jan 2024' },
      { title: 'Musyawarah Desa Tahun 2024', slug: 'musyawarah-desa-2024', date: '15 Jan 2024' },
      { title: 'Pelatihan UMKM', slug: 'pelatihan-umkm', date: '20 Des 2023' },
    ],
  },
  'pelatihan-umkm': {
    title: 'Pelatihan UMKM untuk Pelaku Usaha Desa',
    category: 'Ekonomi',
    date: '20 Desember 2023',
    author: 'Admin Desa',
    image: '🏪',
    excerpt: 'Pelatihan UMKM bagi pelaku usaha desa telah dilaksanakan dengan diikuti oleh 50 peserta dari berbagai sektor usaha.',
    content: [
      'Pelatihan UMKM bagi pelaku usaha desa telah dilaksanakan pada hari Rabu, 20 Desember 2023 di Balai Desa. Kegiatan ini diikuti oleh 50 peserta yang merupakan pelaku usaha mikro, kecil, dan menengah dari berbagai sektor.',
      'Pelatihan ini bertujuan untuk meningkatkan kapasitas pelaku usaha desa dalam mengelola dan mengembangkan usaha mereka. Materi pelatihan meliputi manajemen usaha, pemasaran digital, pengemasan produk, dan akses permodalan.',
      'Kepala Desa dalam sambutannya menyampaikan pentingnya UMKM bagi perekonomian desa. "UMKM adalah tulang punggung ekonomi desa kita. Dengan meningkatkan kualitas dan daya saing produk UMKM, kita dapat meningkatkan pendapatan masyarakat dan mengurangi ketergantungan pada produk luar," ujarnya.',
      'Narasumber dalam pelatihan ini adalah praktisi bisnis dan perwakilan dari Dinas Koperasi dan UMKM. Mereka memberikan materi secara praktis dan interaktif, dilengkapi dengan studi kasus dan simulasi.',
      'Salah satu peserta, Ibu Ratna (42 tahun) yang memiliki usaha kerajinan tangan, menyampaikan rasa terima kasihnya. "Pelatihan ini sangat bermanfaat. Saya jadi tahu cara memasarkan produk secara online dan mengemas produk dengan lebih menarik. Semoga ke depan usaha saya bisa lebih berkembang," ucapnya.',
      'Selain pelatihan, pemerintah desa juga memfasilitasi akses permodalan melalui Kredit Usaha Rakyat (KUR) dan dana bergulir dari BUMDes. Pelaku usaha yang berminat dapat mengajukan permohonan melalui kantor desa.',
      'Rencana ke depan, pemerintah desa akan membentuk forum UMKM desa sebagai wadah komunikasi dan kolaborasi antar pelaku usaha. Forum ini diharapkan dapat menjadi sarana untuk saling berbagi pengalaman dan mengembangkan usaha bersama.',
    ],
    views: 890,
    likes: 78,
    comments: 19,
    tags: ['UMKM', 'Pelatihan', 'Ekonomi', 'Pemberdayaan'],
    relatedNews: [
      { title: 'Musyawarah Desa Tahun 2024', slug: 'musyawarah-desa-2024', date: '15 Jan 2024' },
      { title: 'Program Bantuan Langsung Tunai', slug: 'program-bantuan-langsung-tunai', date: '10 Jan 2024' },
      { title: 'Pembangunan Jalan Desa', slug: 'pembangunan-jalan-desa', date: '5 Jan 2024' },
    ],
  },
};

export default function BeritaDetailPage() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { villages } = useApp();
  const village = villages.find(v => v.id === id);

  const berita = beritaData[slug || ''];
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(berita?.likes || 0);

  const handleLike = () => {
    if (!liked) {
      setLikesCount(prev => prev + 1);
      setLiked(true);
    } else {
      setLikesCount(prev => prev - 1);
      setLiked(false);
    }
  };

  if (!village || !berita) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Berita tidak ditemukan</p>
          <button onClick={() => navigate(`/preview/${id}`)} className="text-emerald-300 hover:underline">
            Kembali ke Desa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white">
      {/* Top Bar */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(`/preview/${village.id}`)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Kembali</span>
          </button>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Desa {village.name}</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-emerald-200/60">
          <button onClick={() => navigate(`/preview/${village.id}`)} className="hover:text-white transition">
            Beranda
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-300">Berita</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white truncate">{berita.title}</span>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl overflow-hidden">
          {/* Header Image */}
          <div className="bg-gradient-to-br from-emerald-600/30 to-teal-600/30 p-12 text-center border-b border-white/10">
            <div className="text-7xl mb-4">{berita.image}</div>
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full mb-4">
              {berita.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold">{berita.title}</h1>
            <p className="text-emerald-100/80 mt-4 max-w-2xl mx-auto">{berita.excerpt}</p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 p-6 border-b border-white/10 text-sm text-emerald-200/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{berita.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{berita.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{berita.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{berita.comments} komentar</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-6">
            {berita.content.map((paragraph, i) => (
              <p key={i} className="text-emerald-100/90 leading-relaxed text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="px-6 md:px-10 pb-6">
            <div className="flex flex-wrap gap-2">
              {berita.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-300 text-xs rounded-full border border-emerald-500/20">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/5">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                  liked ? 'bg-red-500/20 text-red-300' : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{likesCount}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition text-white/70">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{berita.comments}</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-white/70">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-white/70">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-white/70">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Related News */}
          <div className="p-6 md:px-10 pb-10 border-t border-white/10">
            <h3 className="text-lg font-bold mb-4">Berita Terkait</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {berita.relatedNews.map((related, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigate(`/berita/${village.id}/${related.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  className="flex flex-col p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition text-left group"
                >
                  <span className="text-xs text-emerald-200/50 mb-2">{related.date}</span>
                  <span className="text-sm font-medium text-emerald-300 group-hover:text-emerald-200 transition">
                    {related.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
