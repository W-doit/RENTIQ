import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LandlordShell } from './components/layout/LandlordShell'
import { TenantShell } from './components/layout/TenantShell'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/landlord/DashboardPage'
import { PropertiesPage } from './pages/landlord/PropertiesPage'
import { PropertyDetailLayout } from './pages/landlord/PropertyDetailLayout'
import { PropertyOverviewTab } from './pages/landlord/PropertyOverviewTab'
import { ListingGeneratorPage } from './pages/landlord/ListingGeneratorPage'
import { ScreeningPage } from './pages/landlord/ScreeningPage'
import { AgreementPage } from './pages/landlord/AgreementPage'
import { PropertyTenantsTab } from './pages/landlord/PropertyTenantsTab'
import { PropertyMaintenanceTab } from './pages/landlord/PropertyMaintenanceTab'
import { PropertyComplianceTab } from './pages/landlord/PropertyComplianceTab'
import { PropertyFinancialsTab } from './pages/landlord/PropertyFinancialsTab'
import { MaintenancePage } from './pages/landlord/MaintenancePage'
import { CompliancePage } from './pages/landlord/CompliancePage'
import { FinancialsPage } from './pages/landlord/FinancialsPage'
import { SettingsPage } from './pages/landlord/SettingsPage'
import { TenantDashboardPage } from './pages/tenant/TenantDashboardPage'
import { TenantMaintenancePage } from './pages/tenant/TenantMaintenancePage'
import { TenantDocumentsPage } from './pages/tenant/TenantDocumentsPage'
import { TenantChatPage } from './pages/tenant/TenantChatPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage role="landlord" />} />
          <Route path="/tenant/login" element={<LoginPage role="tenant" />} />

          <Route element={<ProtectedRoute role="landlord" />}>
            <Route element={<LandlordShell />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:id" element={<PropertyDetailLayout />}>
                <Route index element={<PropertyOverviewTab />} />
                <Route path="listing" element={<ListingGeneratorPage />} />
                <Route path="tenants" element={<PropertyTenantsTab />} />
                <Route path="maintenance" element={<PropertyMaintenanceTab />} />
                <Route path="compliance" element={<PropertyComplianceTab />} />
                <Route path="financials" element={<PropertyFinancialsTab />} />
                <Route path="screening" element={<ScreeningPage />} />
                <Route path="agreement" element={<AgreementPage />} />
              </Route>
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/financials" element={<FinancialsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute role="tenant" />}>
            <Route element={<TenantShell />}>
              <Route path="/tenant/dashboard" element={<TenantDashboardPage />} />
              <Route path="/tenant/maintenance" element={<TenantMaintenancePage />} />
              <Route path="/tenant/documents" element={<TenantDocumentsPage />} />
              <Route path="/tenant/chat" element={<TenantChatPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
