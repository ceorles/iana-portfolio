import ResourceManager from '../components/ResourceManager'
import { skillConfig } from '../config/resourceConfigs'

export default function SkillsPage() {
  return <ResourceManager config={skillConfig} />
}
