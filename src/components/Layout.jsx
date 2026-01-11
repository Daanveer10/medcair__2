import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Phone, Clock, User, Settings, Home, LogOut, Search, Building2, PlusCircle } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from './ui/button';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userType, isAuthenticated, logout } = useAppContext();

  // Navigation config based on role
  const patientNav = [
    { path: '/patient/dashboard', label: 'Dashboard', icon: Home },
    { path: '/patient/search', label: 'Find Clinic', icon: Search },
    { path: '/patient/appointments', label: 'My Appointments', icon: Calendar },
    { path: '/patient/profile', label: 'Profile', icon: User },
  ];

  const hospitalNav = [
    { path: '/hospital/dashboard', label: 'Dashboard', icon: Home },
    { path: '/hospital/clinics', label: 'Clinics', icon: Building2 },
    { path: '/hospital/doctors', label: 'Doctors', icon: User },
    { path: '/hospital/slots', label: 'Slots', icon: Clock },
    { path: '/calls', label: 'Reception', icon: Phone }, // Using existing
  ];

  const currentNav = userType === 'hospital' ? hospitalNav : patientNav;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // If not authenticated (and not on auth pages), show basic layout or redirect
  // But here we just render children for auth pages typically
  const isAuthPage = ['/', '/signup'].includes(location.pathname);

  if (!isAuthenticated && !isAuthPage) {
    // This is handled by router protection usually, but for layout cleanliness:
    return <main>{children}</main>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-slate-900 to-[#0F1419]">
      {isAuthenticated && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-40"
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <Link to={userType === 'hospital' ? '/hospital/dashboard' : '/patient/dashboard'} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AI Receptionist</span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {currentNav.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                <Button variant="ghost" onClick={handleLogout} className="ml-4 text-red-400 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </nav>
            </div>
          </div>
        </motion.header>
      )}

      <main>{children}</main>

      {isAuthenticated && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 z-40"
        >
          <div className="grid grid-cols-5 gap-1 p-2">
            {currentNav.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-400 hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
             <button onClick={handleLogout} className="flex flex-col items-center gap-1 p-2 text-red-400">
                <LogOut className="w-5 h-5" />
                <span className="text-xs font-medium">Logout</span>
             </button>
          </div>
        </motion.nav>
      )}

      <footer className="bg-slate-900/50 backdrop-blur-lg border-t border-slate-700/50 py-8 mt-12 mb-16 md:mb-0">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 AI Receptionist. Streamlining healthcare reception.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
