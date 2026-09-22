import ResourceManager from '../components/ResourceManager'
import { certificationConfig } from '../config/resourceConfigs'

export default function CertificationsPage() {
  return <ResourceManager config={certificationConfig} />
}
