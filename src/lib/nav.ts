/*
 * Services and service areas: the spine of the site's search strategy.
 *
 * The prototype drove both off query params (`Service.dc.html?s=3`,
 * `Service Area.dc.html?area=boerne`). REBUILD.md is explicit that these
 * become real static routes, so slugs live here and the route segments
 * are generated from this file.
 *
 * `label` is the nav wording, `shortLabel` the footer's tighter wording
 * where the prototype differs. `line`, `detail` and `image` drive the
 * homepage service cards. All copy is client-approved and lifted verbatim.
 */

export type Service = {
  slug: string
  label: string
  shortLabel?: string
  /** Homepage card: one-line summary shown at rest. */
  line: string
  /** Homepage card: longer copy revealed on hover. */
  detail: string
  /** Homepage card photo, in public/assets. */
  image: string
}

export const SERVICES: Service[] = [
  {
    slug: 'roof-replacement',
    label: 'Roof Replacement & Re-Roofing',
    line: 'Complete tear-off and rebuild, documented daily.',
    detail:
      'IKO architectural shingle or standing-seam metal — a fixed written proposal, a dedicated foreman, and a 25-year workmanship guarantee.',
    image: '/assets/svc-replacement-photo.webp',
  },
  {
    slug: 'roof-repair',
    label: 'Roof Repair',
    line: 'Leaks, flashing, and missing shingles — fixed for good.',
    detail:
      'We repair the cause, not the symptom, and photograph every step so you can see exactly what was done.',
    image: '/assets/svc-repair-photo.webp',
  },
  {
    slug: 'roof-inspections',
    label: 'Roof Inspections',
    line: 'Complimentary, with written findings in 48 hours.',
    detail:
      'A trained eye on your roof before you buy, sell, or file a claim — and no pressure to act on what we find.',
    image: '/assets/svc-inspection-photo.webp',
  },
  {
    slug: 'storm-damage-insurance-claims',
    label: 'Storm Damage & Insurance Claims',
    shortLabel: 'Storm & Insurance Claims',
    line: 'We document; you recover.',
    detail:
      'Full photographic documentation, a meeting with your adjuster on site, and a scope that matches what your policy owes you.',
    image: '/assets/svc-storm-photo.webp',
  },
  {
    slug: 'gutter-installation',
    label: 'Gutter Installation',
    line: 'Seamless gutters hung by the same crew.',
    detail:
      'Formed on site and hung while the crew is already on your roofline — one firm, one proposal, one guarantee for the roof and the gutters.',
    image: '/assets/svc-gutters-photo.webp',
  },
  {
    slug: 'new-construction-roofing',
    label: 'New Construction Roofing',
    line: 'From bare deck to ridge on new builds.',
    detail:
      'Coordinated with the builder, inspected at every stage, and finished to the same standard as our restorations.',
    image: '/assets/svc-newbuild-photo.webp',
  },
  {
    slug: 'roof-maintenance',
    label: 'Roof Maintenance & Care Plans',
    shortLabel: 'Roof Maintenance Programs',
    line: 'Annual tune-ups, moss and debris removal.',
    detail:
      'A seasonal program that catches small problems early — documented visits with photos, and priority scheduling when weather hits.',
    image: '/assets/svc-maintenance-photo.webp',
  },
  {
    slug: 'emergency-services',
    label: 'Temporary Emergency Services',
    line: 'Roof tarps and waterproofing, fast.',
    detail:
      'When a storm opens up your roof, we tarp and waterproof it the same day to protect the inside of your home — documented for your carrier, which in most policies reimburses emergency mitigation.',
    /* The prototype reuses a project photo here; there is no dedicated
       emergency-services image in the asset set. */
    image: '/assets/proj2-mid.webp',
  },
  {
    slug: 'skylight-installation',
    label: 'Skylight Installation & Repair',
    line: 'Installed or replaced during your re-roof.',
    detail:
      'Curb and deck-mounted skylights, flashed and sealed by the crew that owns the warranty on the roof around them.',
    image: '/assets/svc-skylight-photo.webp',
  },
  {
    slug: 'commercial-flat-roofing',
    label: 'Commercial & Flat Roofing',
    line: 'TPO, EPDM, and metal for working buildings.',
    detail:
      'Low-slope systems scheduled around your operations, with maintenance plans that keep small issues from becoming closures.',
    image: '/assets/svc-commercial-photo.webp',
  },
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
