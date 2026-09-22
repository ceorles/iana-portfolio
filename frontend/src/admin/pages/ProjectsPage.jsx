import ResourceManager from '../components/ResourceManager'
import { projectConfig } from '../config/resourceConfigs'

export default function ProjectsPage() {
  return <ResourceManager config={projectConfig} />
}
