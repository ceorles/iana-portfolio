import {
  Camera, Clapperboard, LayoutPanelLeft, PenTool, Sparkles,
} from 'lucide-react'
import { FaDiscord, FaFacebook, FaFigma, FaGithub } from 'react-icons/fa6'

// Maps the icon_name string stored in the backend (admin-editable) to a component.
const SERVICE_SKILL_ICONS = {
  camera: Camera,
  'layout-panel-left': LayoutPanelLeft,
  figma: FaFigma,
  clapperboard: Clapperboard,
  design: PenTool,
}

export function getContentIcon(iconName) {
  return SERVICE_SKILL_ICONS[iconName] || Sparkles
}

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  github: FaGithub,
  discord: FaDiscord,
}

export function getSocialIcon(platform) {
  return SOCIAL_ICONS[platform] || null
}
