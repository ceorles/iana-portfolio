import { Navigate, Route, Routes } from 'react-router-dom'

import AdminLayout from './admin/components/AdminLayout'
import ProtectedRoute from './admin/components/ProtectedRoute'
import { AuthProvider } from './admin/context/AuthContext'
import CertificationsPage from './admin/pages/CertificationsPage'
import ContactMessagesPage from './admin/pages/ContactMessagesPage'
import DashboardPage from './admin/pages/DashboardPage'
import EducationPage from './admin/pages/EducationPage'
import ExperiencePage from './admin/pages/ExperiencePage'
import LoginPage from './admin/pages/LoginPage'
import ProfilePage from './admin/pages/ProfilePage'
import ProjectMediaPage from './admin/pages/ProjectMediaPage'
import ProjectsPage from './admin/pages/ProjectsPage'
import ServicesPage from './admin/pages/ServicesPage'
import SkillProfilesPage from './admin/pages/SkillProfilesPage'
import SkillsPage from './admin/pages/SkillsPage'
import SocialLinksPage from './admin/pages/SocialLinksPage'
import UsersPage from './admin/pages/UsersPage'
import Home from './pages/Home'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="project-media" element={<ProjectMediaPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="skill-profiles" element={<SkillProfilesPage />} />
          <Route path="social-links" element={<SocialLinksPage />} />
          <Route path="contact-messages" element={<ContactMessagesPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
