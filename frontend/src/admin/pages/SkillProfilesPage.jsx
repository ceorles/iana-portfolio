import ResourceManager from '../components/ResourceManager'
import { skillProfileConfig } from '../config/resourceConfigs'

export default function SkillProfilesPage() {
  return <ResourceManager config={skillProfileConfig} />
}
