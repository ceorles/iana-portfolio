import { certificationService } from '../../services/certificationService'
import { educationService } from '../../services/educationService'
import { experienceService } from '../../services/experienceService'
import { profileService } from '../../services/profileService'
import { projectMediaService } from '../../services/projectMediaService'
import { projectService } from '../../services/projectService'
import { serviceOfferingService } from '../../services/serviceOfferingService'
import { skillProfileService } from '../../services/skillProfileService'
import { skillService } from '../../services/skillService'
import { socialLinkService } from '../../services/socialLinkService'

const EDUCATION_LEVELS = [
  { value: 'primary', label: 'Primary Education' },
  { value: 'junior_high', label: 'Junior High School' },
  { value: 'senior_high', label: 'Senior High School' },
  { value: 'tertiary', label: 'Tertiary Education' },
]

const SKILL_CATEGORIES = [
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'media', label: 'Media' },
  { value: 'other', label: 'Other' },
]

const SOCIAL_PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'github', label: 'GitHub' },
  { value: 'discord', label: 'Discord' },
  { value: 'other', label: 'Other' },
]

export const profileConfig = {
  title: 'Profile',
  description: 'The single profile shown on the public homepage.',
  service: profileService,
  columns: [
    { key: 'full_name', label: 'Name' },
    { key: 'title', label: 'Title' },
    { key: 'is_active', label: 'Active', type: 'boolean' },
  ],
  fields: [
    { key: 'full_name', label: 'Full name', type: 'text', required: true },
    { key: 'display_name', label: 'Display name', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'school', label: 'School', type: 'text' },
    { key: 'age', label: 'Age', type: 'number' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'intro', label: 'Hero intro', type: 'textarea', required: true },
    { key: 'about', label: 'About text', type: 'textarea' },
    { key: 'photo', label: 'Photo', type: 'image' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
  ],
}

export const educationConfig = {
  title: 'Education',
  service: educationService,
  columns: [
    { key: 'school_name', label: 'School' },
    { key: 'level_display', label: 'Level' },
    { key: 'start_year', label: 'Start' },
    { key: 'end_year', label: 'End' },
  ],
  fields: [
    { key: 'level', label: 'Level', type: 'select', options: EDUCATION_LEVELS, required: true },
    { key: 'program', label: 'Program', type: 'text' },
    { key: 'school_name', label: 'School name', type: 'text', required: true },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'maps_url', label: 'Google Maps URL', type: 'text' },
    { key: 'start_year', label: 'Start year', type: 'number', required: true },
    { key: 'end_year', label: 'End year', type: 'number' },
    { key: 'is_current', label: 'Currently studying here', type: 'checkbox' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}

export const experienceConfig = {
  title: 'Experience',
  service: experienceService,
  columns: [
    { key: 'role_title', label: 'Role' },
    { key: 'organization', label: 'Organization' },
    { key: 'start_date', label: 'Start' },
    { key: 'is_current', label: 'Current', type: 'boolean' },
  ],
  fields: [
    { key: 'role_title', label: 'Role title', type: 'text', required: true },
    { key: 'organization', label: 'Organization', type: 'text', required: true },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'start_date', label: 'Start date', type: 'date', required: true },
    { key: 'end_date', label: 'End date', type: 'date' },
    { key: 'is_current', label: 'Currently working here', type: 'checkbox' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}

export const certificationConfig = {
  title: 'Certifications',
  service: certificationService,
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'issuer', label: 'Issuer' },
    { key: 'issue_date', label: 'Issued' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'issuer', label: 'Issuer', type: 'text' },
    { key: 'issue_date', label: 'Issue date', type: 'date' },
    { key: 'credential_url', label: 'Credential URL', type: 'text' },
    { key: 'image', label: 'Badge image', type: 'image' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}

export const projectConfig = {
  title: 'Projects',
  service: projectService,
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'year', label: 'Year' },
    { key: 'is_featured', label: 'Featured', type: 'boolean' },
    { key: 'is_sample', label: 'Sample', type: 'boolean' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text', required: true },
    { key: 'short_description', label: 'Short description', type: 'text', required: true },
    { key: 'description', label: 'Full description', type: 'textarea' },
    { key: 'thumbnail', label: 'Thumbnail', type: 'image' },
    { key: 'project_url', label: 'Project URL', type: 'text' },
    { key: 'github_url', label: 'GitHub URL', type: 'text' },
    { key: 'technologies', label: 'Technologies (comma-separated)', type: 'tags' },
    { key: 'year', label: 'Year', type: 'text' },
    { key: 'is_featured', label: 'Featured', type: 'checkbox' },
    { key: 'is_sample', label: 'Sample / placeholder project', type: 'checkbox' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}

export const projectMediaConfig = {
  title: 'Project Media',
  service: projectMediaService,
  columns: [
    { key: 'project', label: 'Project ID' },
    { key: 'caption', label: 'Caption' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    {
      key: 'project',
      label: 'Project',
      type: 'select',
      required: true,
      optionsLoader: async () => {
        const projects = await projectService.list()
        return projects.map((project) => ({ value: project.id, label: project.title }))
      },
    },
    { key: 'image', label: 'Image', type: 'image', required: true },
    { key: 'caption', label: 'Caption', type: 'text' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}

export const serviceOfferingConfig = {
  title: 'Services',
  service: serviceOfferingService,
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'is_active', label: 'Active', type: 'boolean' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon_name', label: 'Icon name (camera, layout-panel-left, figma, clapperboard)', type: 'text' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}

export const skillConfig = {
  title: 'Skills',
  service: skillService,
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'select', options: SKILL_CATEGORIES, required: true },
    { key: 'icon_name', label: 'Icon name', type: 'text' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}

export const skillProfileConfig = {
  title: 'Skill Profiles',
  description: 'Links a skill to the proficiency shown on the public site.',
  service: skillProfileService,
  columns: [
    { key: 'skill', label: 'Skill ID' },
    { key: 'proficiency', label: 'Proficiency %' },
    { key: 'is_featured', label: 'Featured', type: 'boolean' },
  ],
  fields: [
    {
      key: 'skill',
      label: 'Skill',
      type: 'select',
      required: true,
      optionsLoader: async () => {
        const skills = await skillService.list()
        return skills.map((skill) => ({ value: skill.id, label: skill.name }))
      },
    },
    { key: 'proficiency', label: 'Proficiency (0-100)', type: 'number', required: true },
    { key: 'summary', label: 'Summary', type: 'text' },
    { key: 'is_featured', label: 'Featured', type: 'checkbox' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}

export const socialLinkConfig = {
  title: 'Social Links',
  service: socialLinkService,
  columns: [
    { key: 'platform', label: 'Platform' },
    { key: 'url', label: 'URL' },
    { key: 'is_active', label: 'Active', type: 'boolean' },
  ],
  fields: [
    { key: 'platform', label: 'Platform', type: 'select', options: SOCIAL_PLATFORMS, required: true },
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'url', label: 'URL', type: 'text' },
    { key: 'is_active', label: 'Active', type: 'checkbox' },
    { key: 'order', label: 'Display order', type: 'number' },
  ],
}
