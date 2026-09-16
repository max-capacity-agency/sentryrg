/*
 * Services and service areas: the spine of the site's search strategy.
 *
 * The prototype drove both off query params (`Service.dc.html?s=3`,
 * `Service Area.dc.html?area=boerne`). REBUILD.md is explicit that these
 * become real static routes, so slugs live here and the route segments
 * are generated from this file.
 *
 * `label` is the nav wording, `shortLabel` the footer's tighter wording
 * where the prototype differs. Both are client-approved copy.
 */

export type Service = {
  slug: string
  label: string
  shortLabel?: string
}

export const SERVICES: Service[] = [
  { slug: 'roof-replacement', label: 'Roof Replacement & Re-Roofing' },
  { slug: 'roof-repair', label: 'Roof Repair' },
  { slug: 'roof-inspections', label: 'Roof Inspections' },
  {
    slug: 'storm-damage-insurance-claims',
    label: 'Storm Damage & Insurance Claims',
    shortLabel: 'Storm & Insurance Claims',
  },
  { slug: 'gutter-installation', label: 'Gutter Installation' },
  { slug: 'new-construction-roofing', label: 'New Construction Roofing' },
  {
    slug: 'roof-maintenance',
    label: 'Roof Maintenance & Care Plans',
    shortLabel: 'Roof Maintenance Programs',
  },
  { slug: 'emergency-services', label: 'Temporary Emergency Services' },
  { slug: 'skylight-installation', label: 'Skylight Installation & Repair' },
  { slug: 'commercial-flat-roofing', label: 'Commercial & Flat Roofing' },
]

export type Area = {
  slug: string
  label: string
}

export const AREAS: Area[] = [
  { slug: 'san-antonio', label: 'San Antonio' },
  { slug: 'new-braunfels', label: 'New Braunfels' },
  { slug: 'austin', label: 'Austin' },
  { slug: 'san-marcos', label: 'San Marcos' },
  { slug: 'boerne', label: 'Boerne' },
  { slug: 'fredericksburg', label: 'Fredericksburg' },
  { slug: 'schertz', label: 'Schertz' },
  { slug: 'hill-country', label: 'Texas Hill Country' },
]

export const servicePath = (slug: string) => `/services/${slug}`
export const areaPath = (slug: string) => `/roofing/${slug}`

/* Which top-level nav item is highlighted. `process` also lights up About. */
export type NavKey =
  | 'home'
  | 'services'
  | 'work'
  | 'areas'
  | 'process'
  | 'about'
  | 'journal'
  | 'contact'
