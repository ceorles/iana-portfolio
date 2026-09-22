import ResourceManager from '../components/ResourceManager'
import { profileConfig } from '../config/resourceConfigs'

export default function ProfilePage() {
  return <ResourceManager config={profileConfig} />
}
