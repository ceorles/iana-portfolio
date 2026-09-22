import ResourceManager from '../components/ResourceManager'
import { serviceOfferingConfig } from '../config/resourceConfigs'

export default function ServicesPage() {
  return <ResourceManager config={serviceOfferingConfig} />
}
