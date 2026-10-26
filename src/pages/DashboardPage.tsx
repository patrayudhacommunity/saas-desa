import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Building2, Globe, Settings, LogOut, Plus, Trash2, Eye, Search, BarChart3, Activity, Menu, User, Bell } from 'lucide-react';
import { useApp } from '../App';
import IndonesiaMap from '../components/IndonesiaMap';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { auth, logout, villages, deleteVillage, updateVillage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'villages' | 'map' | 'settings'>('overview');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.isLoggedIn) navigate('/login');
  }, [auth.isLoggedIn, navigate]);

  const handleLogout = () => { logout(); navigate('/'); };
  const filteredVillages = villages.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) || v.province?.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPopulation = villages.reduce((a, v) => a + (v.population || 0), 0);
  const activeVillages = villages.filter(v => v.status === 'active').length;
  const pendingVillages = villages.filter(v => v.status === 'pending').length;

  if (!auth.isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/10 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div><h1 className="font-bold text-lg">TanahAir</h1><p className="text-xs text-slate-400">Admin Dashboard</p></div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {[{ id: 'overview', icon: BarChart3, label: 'Overview' }, { id: 'villages', icon: Building2, label: 'Kelola Desa' }, { id: 'map', icon: Globe, label: 'Peta Desa' }, { id: 'settings', icon: Settings, label: 'Pengaturan' }].map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id as any); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <item.icon className="w-5 h-5" />{item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-slate-300" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">SaaS Admin</p><p className="text-xs text-slate-400 truncate">{auth.user}</p></div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
              <LogOut className="w-5 h-5" />Logout
            </button>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <main className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
              <h2 className="text-xl font-bold">{activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'villages' ? 'Kelola Desa' : activeTab === 'map' ? 'Peta Desa' : 'Pengaturan'}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-white/5 rounded-lg transition"><Bell className="w-5 h-5 text-slate-400" /><span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span></button>
              <button onClick={() => navigate('/setup')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-blue-600 transition">
                <Plus className="w-4 h-4" /><span className="hidden sm:inline">Tambah Desa</span>
              </button>
            </div>
          </div>
        </header>
        <div className="p-4 lg:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4"><Building2 className="w-8 h-8 text-emerald-400" /><span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">+{activeVillages} aktif</span></div>
                  <div className="text-3xl font-bold">{villages.length}</div><div className="text-sm text-slate-400 mt-1">Total Desa</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4"><Users className="w-8 h-8 text-blue-400" /><Activity className="w-4 h-4 text-blue-400" /></div>
                  <div className="text-3xl font-bold">{totalPopulation.toLocaleString()}</div><div className="text-sm text-slate-400 mt-1">Total Penduduk</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4"><Globe className="w-8 h-8 text-purple-400" /><span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">{pendingVillages} pending</span></div>
                  <div className="text-3xl font-bold">{new Set(villages.map(v => v.province)).size}</div><div className="text-sm text-slate-400 mt-1">Provinsi</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4"><BarChart3 className="w-8 h-8 text-orange-400" /><span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">99.9%</span></div>
                  <div className="text-3xl font-bold">99.9%</div><div className="text-sm text-slate-400 mt-1">Uptime</div>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10"><h3 className="text-lg font-bold">Peta Sebaran Desa</h3><p className="text-sm text-slate-400">Lokasi desa-desa yang terdaftar</p></div>
                <div style={{ height: '400px' }}><IndonesiaMap villages={villages} /></div>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div><h3 className="text-lg font-bold">Desa Terbaru</h3><p className="text-sm text-slate-400">Desa yang baru bergabung</p></div>
                  <button onClick={() => setActiveTab('villages')} className="text-sm text-emerald-400 hover:text-emerald-300 transition">Lihat Semua →</button>
                </div>
                <div className="divide-y divide-white/5">
                  {villages.slice(0, 5).map((village) => (
                    <div key={village.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-xl flex items-center justify-center"><Building2 className="w-5 h-5 text-emerald-400" /></div>
                        <div><p className="font-medium">Desa {village.name}</p><p className="text-sm text-slate-400">{village.province}</p></div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${village.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : village.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>
                        {village.status === 'active' ? 'Aktif' : village.status === 'pending' ? 'Pending' : 'Nonaktif'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'villages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" placeholder="Cari desa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                </div>
                <button onClick={() => navigate('/setup')} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-medium hover:from-emerald-600 hover:to-blue-600 transition">
                  <Plus className="w-5 h-5" />Tambah Desa
                </button>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-white/10">
                      <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Desa</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Subdomain</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-slate-400 hidden md:table-cell">Provinsi</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Status</th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">Aksi</th>
                    </tr></thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredVillages.map((village) => (
                        <tr key={village.id} className="hover:bg-white/5 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-xl flex items-center justify-center"><Building2 className="w-5 h-5 text-emerald-400" /></div>
                              <div><p className="font-medium">Desa {village.name}</p><p className="text-xs text-slate-400">{village.district}, {village.regency}</p></div>
                            </div>
                          </td>
                          <td className="px-6 py-4"><code className="text-sm bg-slate-800 px-2 py-1 rounded text-emerald-300">{village.subdomain}.tanahair.id</code></td>
                          <td className="px-6 py-4 text-sm text-slate-300 hidden md:table-cell">{village.province}</td>
                          <td className="px-6 py-4">
                            <button onClick={() => updateVillage(village.id, { status: village.status === 'active' ? 'inactive' : 'active' })} className={`px-3 py-1 rounded-full text-xs font-medium transition ${village.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : village.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>
                              {village.status === 'active' ? 'Aktif' : village.status === 'pending' ? 'Pending' : 'Nonaktif'}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => navigate(`/preview/${village.id}`)} className="p-2 hover:bg-white/10 rounded-lg transition" title="Preview"><Eye className="w-4 h-4 text-slate-400" /></button>
                              {showDeleteConfirm === village.id ? (
                                <div className="flex items-center gap-1">
                                  <button onClick={() => { deleteVillage(village.id); setShowDeleteConfirm(null); }} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">Hapus</button>
                                  <button onClick={() => setShowDeleteConfirm(null)} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">Batal</button>
                                </div>
                              ) : (
                                <button onClick={() => setShowDeleteConfirm(village.id)} className="p-2 hover:bg-red-500/10 rounded-lg transition" title="Hapus"><Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" /></button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'map' && (
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10"><h3 className="text-lg font-bold">Peta Interaktif Desa</h3><p className="text-sm text-slate-400">Klik marker untuk melihat detail desa</p></div>
                <div style={{ height: '600px' }}><IndonesiaMap villages={villages} /></div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6">Pengaturan Sistem</h3>
                <div className="space-y-6">
                  <div><label className="block text-sm font-medium text-slate-300 mb-2">Nama Platform</label><input type="text" defaultValue="TanahAir" className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
                  <div><label className="block text-sm font-medium text-slate-300 mb-2">Domain Utama</label><input type="text" defaultValue="tanahair.id" className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
                  <div><label className="block text-sm font-medium text-slate-300 mb-2">Email Admin</label><input type="email" defaultValue="societyspatial@gmail.com" className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div>
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-medium hover:from-emerald-600 hover:to-blue-600 transition">Simpan Pengaturan</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
