import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User, Mail, Phone, MapPin, Shield, Eye, EyeOff, CheckCircle, AlertCircle, Save, Key } from 'lucide-react';
import { useApp } from '../App';

export default function AccountSettingsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { villages, updateVillage } = useApp();
  const village = villages.find(v => v.id === id);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [accountInfo, setAccountInfo] = useState({ name: '', email: '', phone: '', address: '', description: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'password' | 'security'>('info');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!village) { setAuthError('Desa tidak ditemukan'); return; }
    if (authForm.username === village.adminUser && authForm.password === village.adminPass) {
      setIsAuthenticated(true);
      setAccountInfo({ name: village.name, email: `admin@${village.subdomain}.tanahair.id`, phone: '', address: `${village.district || ''}, ${village.regency || ''}, ${village.province || ''}`, description: `Website resmi Desa ${village.name}` });
    } else { setAuthError('Username atau password salah'); }
  };

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (village) { updateVillage(village.id, { name: accountInfo.name }); setSuccessMessage('Informasi akun berhasil diperbarui'); setTimeout(() => setSuccessMessage(''), 3000); }
    setLoading(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!passwordForm.currentPassword) { setErrorMessage('Password saat ini harus diisi'); return; }
    if (passwordForm.currentPassword !== village?.adminPass) { setErrorMessage('Password saat ini salah'); return; }
    if (passwordForm.newPassword.length < 6) { setErrorMessage('Password baru minimal 6 karakter'); return; }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) { setErrorMessage('Konfirmasi password tidak cocok'); return; }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (village) { updateVillage(village.id, { adminPass: passwordForm.newPassword }); setSuccessMessage('Password berhasil diubah'); setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); setTimeout(() => setSuccessMessage(''), 3000); }
    setLoading(false);
  };

  if (!village) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white"><div className="text-center"><p className="text-xl mb-4">Desa tidak ditemukan</p><button onClick={() => navigate('/')} className="text-emerald-400 hover:underline">Kembali</button></div></div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button onClick={() => navigate(`/preview/${village.id}`)} className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Kembali</span></button>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-emerald-400" /></div>
              <h1 className="text-2xl font-bold text-white">Pengaturan Akun</h1>
              <p className="text-emerald-200/60 text-sm mt-2">Login untuk mengelola akun Desa {village.name}</p>
            </div>
            {authError && <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6"><AlertCircle className="w-4 h-4 text-red-400" /><p className="text-sm text-red-300">{authError}</p></div>}
            <form onSubmit={handleAuth} className="space-y-5">
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Username</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" /><input type="text" value={authForm.username} onChange={(e) => setAuthForm(prev => ({ ...prev, username: e.target.value }))} placeholder={village.adminUser} className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required /></div></div>
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" /><input type="password" value={authForm.password} onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required /></div></div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-semibold text-white transition">Login</button>
            </form>
            <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"><p className="text-xs text-emerald-200/60 text-center"><strong className="text-emerald-300">Kredensial Default:</strong><br />Username: {village.adminUser}<br />Password: {village.adminPass}</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(`/preview/${village.id}`)} className="flex items-center gap-2 text-white/70 hover:text-white transition"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Kembali</span></button>
          <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-400" /><span className="font-medium text-sm">Pengaturan Akun</span></div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-white/70 hover:text-white transition">Logout</button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {successMessage && <div className="mb-6 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"><CheckCircle className="w-5 h-5 text-emerald-400" /><p className="text-sm text-emerald-300">{successMessage}</p></div>}
        {errorMessage && <div className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-4"><AlertCircle className="w-5 h-5 text-red-400" /><p className="text-sm text-red-300">{errorMessage}</p></div>}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {[{ id: 'info', label: 'Informasi Akun', icon: User }, { id: 'password', label: 'Ganti Password', icon: Key }, { id: 'security', label: 'Keamanan', icon: Shield }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition border-b-2 ${activeTab === tab.id ? 'border-emerald-400 text-emerald-300' : 'border-transparent text-white/60 hover:text-white'}`}><tab.icon className="w-4 h-4" /><span className="hidden sm:inline">{tab.label}</span></button>
          ))}
        </div>
        {activeTab === 'info' && (
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6">Informasi Akun</h2>
            <form onSubmit={handleUpdateInfo} className="space-y-6">
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Nama Desa</label><input type="text" value={accountInfo.name} onChange={(e) => setAccountInfo(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required /></div>
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Email Admin</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" /><input type="email" value={accountInfo.email} onChange={(e) => setAccountInfo(prev => ({ ...prev, email: e.target.value }))} className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div></div>
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Nomor Telepon</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" /><input type="tel" value={accountInfo.phone} onChange={(e) => setAccountInfo(prev => ({ ...prev, phone: e.target.value }))} placeholder="08xx-xxxx-xxxx" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" /></div></div>
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Alamat</label><div className="relative"><MapPin className="absolute left-3 top-3 w-5 h-5 text-emerald-400/50" /><textarea value={accountInfo.address} onChange={(e) => setAccountInfo(prev => ({ ...prev, address: e.target.value }))} rows={3} className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none" /></div></div>
              <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-medium transition disabled:opacity-50">{loading ? 'Menyimpan...' : <><Save className="w-5 h-5" />Simpan Perubahan</>}</button>
            </form>
          </div>
        )}
        {activeTab === 'password' && (
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6">Ganti Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Password Saat Ini</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" /><input type={showCurrentPassword ? 'text' : 'password'} value={passwordForm.currentPassword} onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))} className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required /><button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">{showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Password Baru</label><div className="relative"><Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" /><input type={showNewPassword ? 'text' : 'password'} value={passwordForm.newPassword} onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))} placeholder="Minimal 6 karakter" className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required /><button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">{showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
              <div><label className="block text-sm font-medium text-emerald-100 mb-2">Konfirmasi Password Baru</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" /><input type={showConfirmPassword ? 'text' : 'password'} value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))} className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" required /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
              <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-medium transition disabled:opacity-50">{loading ? 'Mengubah...' : <><Key className="w-5 h-5" />Ubah Password</>}</button>
            </form>
          </div>
        )}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Pengaturan Keamanan</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl"><div><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-emerald-200/60">Lapisan keamanan ekstra</p></div><div className="w-12 h-6 bg-slate-600 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div></div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl"><div><p className="font-medium">Login Notification</p><p className="text-sm text-emerald-200/60">Notifikasi login baru</p></div><div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div></div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl"><div><p className="font-medium">Session Timeout</p><p className="text-sm text-emerald-200/60">Auto logout 30 menit</p></div><div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
