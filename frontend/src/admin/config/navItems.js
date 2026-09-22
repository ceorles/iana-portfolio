import {
  Award, Briefcase, Camera, GraduationCap, Image, LayoutDashboard,
  Link2, MessageSquare, Sparkles, User, Users,
} from 'lucide-react'

export const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/certifications', label: 'Certifications', icon: Award },
  { to: '/admin/projects', label: 'Projects', icon: Sparkles },
  { to: '/admin/project-media', label: 'Project Media', icon: Image },
  { to: '/admin/services', label: 'Services', icon: Camera },
  { to: '/admin/skills', label: 'Skills', icon: Sparkles },
  { to: '/admin/skill-profiles', label: 'Skill Profiles', icon: Sparkles },
  { to: '/admin/social-links', label: 'Social Links', icon: Link2 },
  { to: '/admin/contact-messages', label: 'Contact Messages', icon: MessageSquare },
  { to: '/admin/users', label: 'Users', icon: Users },
]
