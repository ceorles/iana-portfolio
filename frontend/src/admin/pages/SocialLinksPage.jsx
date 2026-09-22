import ResourceManager from '../components/ResourceManager'
import { socialLinkConfig } from '../config/resourceConfigs'

export default function SocialLinksPage() {
  return <ResourceManager config={socialLinkConfig} />
}
