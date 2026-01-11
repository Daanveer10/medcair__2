import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Toaster } from './components/ui/toaster';
import Layout from './components/Layout';

// Auth
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientProfile from './pages/patient/PatientProfile';
import ClinicSearch from './pages/patient/ClinicSearch';
import ClinicDetail from './pages/patient/ClinicDetail';
import PatientAppointments from './pages/patient/PatientAppointments';

// Hospital Pages
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import ManageClinics from './pages/hospital/ManageClinics';
import ManageDoctors from './pages/hospital/ManageDoctors';
import ManageTimeSlots from './pages/hospital/ManageTimeSlots';

// Shared/Legacy Pages
import CallManagement from './pages/CallManagement';
import FollowUpScheduling from './pages/FollowUpScheduling';

// Route Protection Components
const ProtectedRoute = ({ children, allowedType }) => {
  const { isAuthenticated, userType } = useAppContext();
  
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (allowedType && userType !== allowedType) {
    return <Navigate to={userType === 'patient' ? '/patient/dashboard' : '/hospital/dashboard'} replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, userType } = useAppContext();
  if (isAuthenticated) {
    return <Navigate to={userType === 'patient' ? '/patient/dashboard' : '/hospital/dashboard'} replace />;
  }
  return children;
};

const AppContent = () => {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

        {/* Patient Routes */}
        <Route path="/patient/*" element={<ProtectedRoute allowedType="patient"><Routes>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="search" element={<ClinicSearch />} />
          <Route path="clinic/:id" element={<ClinicDetail />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="*" element={<Navigate to="/patient/dashboard" replace />} />
        </Routes></ProtectedRoute>} />

        {/* Hospital Routes */}
        <Route path="/hospital/*" element={<ProtectedRoute allowedType="hospital"><Routes>
          <Route path="dashboard" element={<HospitalDashboard />} />
          <Route path="clinics" element={<ManageClinics />} />
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="slots" element={<ManageTimeSlots />} />
          <Route path="*" element={<Navigate to="/hospital/dashboard" replace />} />
        </Routes></ProtectedRoute>} />

        {/* Shared / Specific Routes */}
        <Route path="/calls" element={<ProtectedRoute allowedType="hospital"><CallManagement /></ProtectedRoute>} />
        <Route path="/follow-ups" element={<ProtectedRoute allowedType="hospital"><FollowUpScheduling /></ProtectedRoute>} />
        
        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
        <Toaster />
      </Router>
    </AppProvider>
  );
}

export default App;
