import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import VillageSetupPage from './pages/VillageSetupPage';
import VillagePreviewPage from './pages/VillagePreviewPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import InfoDetailPage from './pages/InfoDetailPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BeritaDetailPage from './pages/BeritaDetailPage';
import GaleriPage from './pages/GaleriPage';
import KontakPage from './pages/KontakPage';

// Types
export interface Village {
  id: string;
  name: string;
  subdomain: string;
  lat: number;
  lng: number;
  adminUser: string;
  adminPass: string;
  createdAt: string;
  status: 'active' | 'pending' | 'inactive';
  population?: number;
  area?: string;
  district?: string;
  regency?: string;
  province?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: string;
  role: 'saas_admin' | 'village_admin';
}

interface AppContextType {
  auth: AuthState;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  villages: Village[];
  addVillage: (village: Village) => void;
  deleteVillage: (id: string) => void;
  updateVillage: (id: string, data: Partial<Village>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

// Initial villages data
const initialVillages: Village[] = [
  {
    id: '1',
    name: 'Remai',
    subdomain: 'remai',
    lat: -3.4,
    lng: 114.8,
    adminUser: 'remai',
    adminPass: 'remai123',
    createdAt: '2024-01-15',
    status: 'active',
    population: 2500,
    area: '15.2 km²',
    district: 'Tanjung',
    regency: 'Tabalong',
    province: 'Kalimantan Selatan',
  },
  {
    id: '2',
    name: 'Sungai Bamban',
    subdomain: 'sungai-bamban',
    lat: -3.5,
    lng: 114.9,
    adminUser: 'sungai-bamban',
    adminPass: 'sungai-bamban123',
    createdAt: '2024-02-20',
    status: 'active',
    population: 1800,
    area: '12.5 km²',
    district: 'Banjarmasin',
    regency: 'Banjar',
    province: 'Kalimantan Selatan',
  },
  {
    id: '3',
    name: 'Mekar Jaya',
    subdomain: 'mekar-jaya',
    lat: -6.2,
    lng: 106.8,
    adminUser: 'mekar-jaya',
    adminPass: 'mekar-jaya123',
    createdAt: '2024-03-10',
    status: 'pending',
    population: 3200,
    area: '8.7 km²',
    district: 'Bekasi',
    regency: 'Bekasi',
    province: 'Jawa Barat',
  },
];

function AppProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    user: '',
    role: 'saas_admin',
  });
  const [villages, setVillages] = useState<Village[]>(initialVillages);

  const login = (email: string, password: string): boolean => {
    if (email === 'societyspatial@gmail.com' && password === 'societyspatial@gmail.com123') {
      setAuth({ isLoggedIn: true, user: email, role: 'saas_admin' });
      return true;
    }
    // Check village admin login
    const village = villages.find(
      (v) => v.adminUser === email && v.adminPass === password
    );
    if (village) {
      setAuth({ isLoggedIn: true, user: email, role: 'village_admin' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, user: '', role: 'saas_admin' });
  };

  const addVillage = (village: Village) => {
    setVillages((prev) => [...prev, village]);
  };

  const deleteVillage = (id: string) => {
    setVillages((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVillage = (id: string, data: Partial<Village>) => {
    setVillages((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...data } : v))
    );
  };

  return (
    <AppContext.Provider
      value={{ auth, login, logout, villages, addVillage, deleteVillage, updateVillage }}
    >
      {children}
    </AppContext.Provider>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/setup" element={<VillageSetupPage />} />
          <Route path="/preview/:id" element={<VillagePreviewPage />} />
          <Route path="/account-settings/:id" element={<AccountSettingsPage />} />
          <Route path="/info/:id/:slug" element={<InfoDetailPage />} />
          <Route path="/layanan/:id/:slug" element={<ServiceDetailPage />} />
          <Route path="/berita/:id/:slug" element={<BeritaDetailPage />} />
          <Route path="/galeri/:id" element={<GaleriPage />} />
          <Route path="/kontak/:id" element={<KontakPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
