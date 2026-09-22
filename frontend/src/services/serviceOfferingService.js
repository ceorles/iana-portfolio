import { createResourceService } from './resourceFactory'

// Named "offering" to avoid clashing with the term "service" used for API service modules.
export const serviceOfferingService = createResourceService('services')
