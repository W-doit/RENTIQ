import type {
  Application,
  AppUser,
  ComplianceRecord,
  Listing,
  MaintenanceTicket,
  Property,
  Tenant,
  Transaction,
} from '../types/database'

export const mockLandlord: AppUser = {
  id: 'user-landlord-1',
  email: 'sam@rentiq.nz',
  full_name: 'Sam Aroha',
  role: 'landlord',
  phone: '+64 21 555 0142',
  subscription_tier: 'gold',
  notification_prefs: {
    email: true,
    push: true,
    sms: false,
    maintenance: true,
    rent: true,
    compliance: true,
  },
}

export const mockTenantUser: AppUser = {
  id: 'user-tenant-1',
  email: 'mahuta@email.nz',
  full_name: 'Māhuta Rangi',
  role: 'tenant',
  phone: '+64 27 555 0198',
}

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    landlord_id: 'user-landlord-1',
    address: '12 Oriental Parade',
    suburb: 'Oriental Bay',
    city: 'Wellington',
    bedrooms: 3,
    bathrooms: 1,
    rent_weekly: 680,
    status: 'occupied',
    image_url:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    healthy_homes_score: 92,
    created_at: '2024-03-12T00:00:00Z',
  },
  {
    id: 'prop-2',
    landlord_id: 'user-landlord-1',
    address: '4B Hawker Street',
    suburb: 'Mount Victoria',
    city: 'Wellington',
    bedrooms: 2,
    bathrooms: 1,
    rent_weekly: 520,
    status: 'compliance-due',
    image_url:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    healthy_homes_score: 74,
    created_at: '2023-11-02T00:00:00Z',
  },
  {
    id: 'prop-3',
    landlord_id: 'user-landlord-1',
    address: '19 Mt Victoria Rise',
    suburb: 'Mount Victoria',
    city: 'Wellington',
    bedrooms: 4,
    bathrooms: 2,
    rent_weekly: 850,
    status: 'vacant',
    image_url:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    healthy_homes_score: 88,
    created_at: '2025-01-18T00:00:00Z',
  },
  {
    id: 'prop-4',
    landlord_id: 'user-landlord-1',
    address: '88 Karori Road',
    suburb: 'Karori',
    city: 'Wellington',
    bedrooms: 3,
    bathrooms: 2,
    rent_weekly: 610,
    status: 'occupied',
    image_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    healthy_homes_score: 96,
    created_at: '2022-07-09T00:00:00Z',
  },
]

export const mockTenants: Tenant[] = [
  {
    id: 'ten-1',
    user_id: 'user-tenant-1',
    property_id: 'prop-1',
    full_name: 'Māhuta Rangi',
    email: 'mahuta@email.nz',
    phone: '+64 27 555 0198',
    lease_start: '2025-02-01',
    lease_end: '2026-01-31',
    rent_weekly: 680,
    bond_amount: 2720,
    bond_status: 'lodged',
  },
  {
    id: 'ten-2',
    user_id: 'user-tenant-2',
    property_id: 'prop-2',
    full_name: 'Elena Soto',
    email: 'elena.soto@email.nz',
    phone: '+64 21 555 0331',
    lease_start: '2024-09-15',
    lease_end: '2025-09-14',
    rent_weekly: 520,
    bond_amount: 2080,
    bond_status: 'lodged',
  },
  {
    id: 'ten-3',
    user_id: 'user-tenant-3',
    property_id: 'prop-4',
    full_name: 'James & Priya Chen',
    email: 'chen.family@email.nz',
    phone: '+64 22 555 0444',
    lease_start: '2024-04-01',
    lease_end: '2026-03-31',
    rent_weekly: 610,
    bond_amount: 2440,
    bond_status: 'lodged',
  },
]

export const mockListings: Listing[] = [
  {
    id: 'list-1',
    property_id: 'prop-3',
    title: 'Sunlit 4-bed villa with harbour glimpses — Mt Victoria',
    description:
      'A calm, well-kept weatherboard home on Mt Victoria Rise. Four bedrooms, two bathrooms, heat pump, and Healthy Homes compliant. Walk to town, cafés, and the green belt. Ideal for a professional flat or small family.',
    rent_weekly: 850,
    available_from: '2026-04-01',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    status: 'draft',
    platform_preview: 'trademe',
  },
]

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    property_id: 'prop-3',
    applicant_name: 'Tane Williams',
    email: 'tane.w@email.nz',
    phone: '+64 21 555 0110',
    ai_score: 91,
    credit_check: 'clear',
    income_weekly: 1850,
    employment: 'Software engineer · Trade Me',
    status: 'pending',
    notes: 'Strong references. Rent-to-income 46%. Stable 4-year tenure previous.',
    applied_at: '2026-03-14T09:20:00Z',
  },
  {
    id: 'app-2',
    property_id: 'prop-3',
    applicant_name: 'Sophie & Mark Reid',
    email: 'reid.home@email.nz',
    phone: '+64 27 555 0220',
    ai_score: 78,
    credit_check: 'review',
    income_weekly: 2100,
    employment: 'Nurse + teacher',
    status: 'pending',
    notes: 'One late payment 2023 flagged by Centrix. Otherwise clean.',
    applied_at: '2026-03-13T16:45:00Z',
  },
  {
    id: 'app-3',
    property_id: 'prop-3',
    applicant_name: 'Alex Nguyen',
    email: 'alex.n@email.nz',
    phone: '+64 22 555 0330',
    ai_score: 64,
    credit_check: 'pending',
    income_weekly: 1200,
    employment: 'Hospitality · casual',
    status: 'pending',
    notes: 'Income borderline for weekly rent. Guarantor offered.',
    applied_at: '2026-03-12T11:10:00Z',
  },
]

export const mockTickets: MaintenanceTicket[] = [
  {
    id: 'mt-1',
    property_id: 'prop-1',
    property_address: '12 Oriental Parade',
    title: 'Dishwasher leak',
    description: 'Slow leak under dishwasher overnight. Inlet tap closed.',
    status: 'triaged',
    severity: 'medium',
    ai_severity_note: 'Contained leak · plumbing visit recommended within 48h',
    tradesperson: 'Wellington Plumbing Co',
    photo_url:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
    reported_by: 'Māhuta Rangi',
    created_at: '2026-03-16T20:12:00Z',
    updated_at: '2026-03-17T08:00:00Z',
  },
  {
    id: 'mt-2',
    property_id: 'prop-2',
    property_address: '4B Hawker Street',
    title: 'Heat pump not heating',
    description: 'Unit runs but air stays cool. Error code E7 flashing.',
    status: 'new',
    severity: 'high',
    ai_severity_note: 'Heating failure in cooler months · prioritise',
    reported_by: 'Elena Soto',
    created_at: '2026-03-17T07:30:00Z',
    updated_at: '2026-03-17T07:30:00Z',
  },
  {
    id: 'mt-3',
    property_id: 'prop-4',
    property_address: '88 Karori Road',
    title: 'Bathroom extractor noisy',
    description: 'Rattling when on. Still ventilates.',
    status: 'assigned',
    severity: 'low',
    ai_severity_note: 'Non-urgent · schedule with next visit',
    tradesperson: 'Harbour Electrical',
    reported_by: 'James Chen',
    created_at: '2026-03-10T14:00:00Z',
    updated_at: '2026-03-15T09:00:00Z',
  },
  {
    id: 'mt-4',
    property_id: 'prop-1',
    property_address: '12 Oriental Parade',
    title: 'Smoke alarm chirp',
    description: 'Hallway alarm chirping overnight.',
    status: 'complete',
    severity: 'medium',
    ai_severity_note: 'Battery swap completed · compliance logged',
    tradesperson: 'SafeHome Checks',
    reported_by: 'Māhuta Rangi',
    created_at: '2026-03-01T19:00:00Z',
    updated_at: '2026-03-02T11:00:00Z',
  },
]

export const mockCompliance: ComplianceRecord[] = [
  {
    id: 'comp-1',
    property_id: 'prop-1',
    property_address: '12 Oriental Parade',
    heating: 100,
    insulation: 100,
    ventilation: 90,
    moisture: 85,
    draught: 90,
    next_review: '2026-07-10',
    overall: 93,
  },
  {
    id: 'comp-2',
    property_id: 'prop-2',
    property_address: '4B Hawker Street',
    heating: 60,
    insulation: 80,
    ventilation: 75,
    moisture: 70,
    draught: 85,
    next_review: '2026-04-02',
    overall: 74,
  },
  {
    id: 'comp-3',
    property_id: 'prop-3',
    property_address: '19 Mt Victoria Rise',
    heating: 95,
    insulation: 90,
    ventilation: 85,
    moisture: 80,
    draught: 90,
    next_review: '2026-09-02',
    overall: 88,
  },
  {
    id: 'comp-4',
    property_id: 'prop-4',
    property_address: '88 Karori Road',
    heating: 100,
    insulation: 100,
    ventilation: 95,
    moisture: 95,
    draught: 90,
    next_review: '2026-11-18',
    overall: 96,
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    property_id: 'prop-1',
    property_address: '12 Oriental Parade',
    type: 'rent',
    description: 'Weekly rent · Māhuta Rangi',
    amount: 680,
    date: '2026-03-14',
    status: 'paid',
    xero_synced: true,
  },
  {
    id: 'tx-2',
    property_id: 'prop-2',
    property_address: '4B Hawker Street',
    type: 'rent',
    description: 'Weekly rent · Elena Soto',
    amount: 520,
    date: '2026-03-14',
    status: 'overdue',
    xero_synced: false,
  },
  {
    id: 'tx-3',
    property_id: 'prop-4',
    property_address: '88 Karori Road',
    type: 'rent',
    description: 'Weekly rent · Chen family',
    amount: 610,
    date: '2026-03-14',
    status: 'paid',
    xero_synced: true,
  },
  {
    id: 'tx-4',
    property_id: 'prop-1',
    property_address: '12 Oriental Parade',
    type: 'maintenance',
    description: 'Smoke alarm service',
    amount: -85,
    date: '2026-03-02',
    status: 'paid',
    xero_synced: true,
  },
  {
    id: 'tx-5',
    property_id: 'prop-4',
    property_address: '88 Karori Road',
    type: 'expense',
    description: 'Rates · Q1',
    amount: -1240,
    date: '2026-02-28',
    status: 'paid',
    xero_synced: true,
  },
  {
    id: 'tx-6',
    property_id: 'prop-2',
    property_address: '4B Hawker Street',
    type: 'rent',
    description: 'Weekly rent · Elena Soto',
    amount: 520,
    date: '2026-03-07',
    status: 'paid',
    xero_synced: true,
  },
]

export const monthlyPnL = [
  { month: 'Oct', income: 6840, expenses: 2100 },
  { month: 'Nov', income: 7120, expenses: 1890 },
  { month: 'Dec', income: 6980, expenses: 2450 },
  { month: 'Jan', income: 7240, expenses: 1720 },
  { month: 'Feb', income: 7160, expenses: 2310 },
  { month: 'Mar', income: 7240, expenses: 1980 },
]

export const aiInsights = [
  "Rent's landed on all three occupied properties and nothing is overdue. Next on the horizon: the heating statement for 4B Hawker St is due in 14 days — say the word and I'll book the assessor.",
  'Elena at 4B Hawker is 3 days late. A firmer reminder is drafted with the arrears figure and ready for your sign-off.',
  '19 Mt Victoria Rise has 3 strong applicants. Tane Williams scores 91 with a clear Centrix check — worth reviewing first.',
]

export const subscriptionTiers = [
  {
    id: 'entry' as const,
    name: 'Entry',
    price: 29,
    features: ['Up to 2 properties', 'AI triage', 'Healthy Homes tracker', 'Rent ledger'],
  },
  {
    id: 'gold' as const,
    name: 'Gold',
    price: 39,
    features: [
      'Up to 8 properties',
      'Everything in Entry',
      'Screening + Centrix',
      'Xero CSV sync',
      'AI listing writer',
    ],
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    price: 69,
    features: [
      'Unlimited properties',
      'Everything in Gold',
      'Priority Iris',
      'DocuSign + bond lodgement',
      'Portfolio analytics',
    ],
  },
]

/** Active demo tenancy — single home for the tenant portal */
export const tenantHome = {
  tenant: mockTenants[0],
  property: mockProperties[0],
  landlordName: 'Sam Aroha',
  landlordEmail: 'sam@rentiq.nz',
  nextRentDue: '2026-03-21',
  paymentRef: 'RENT-ORIENTAL-12',
}

export type MessageSender = 'tenant' | 'landlord' | 'system'

export interface ThreadMessage {
  id: string
  sender: MessageSender
  senderName: string
  body: string
  sentAt: string
  read: boolean
}

export interface MessageThread {
  id: string
  property_id: string
  subject: string
  participants: string
  unread: number
  updatedAt: string
  messages: ThreadMessage[]
}

export const mockMessageThreads: MessageThread[] = [
  {
    id: 'thread-1',
    property_id: 'prop-1',
    subject: 'Dishwasher leak',
    participants: 'You · Sam Aroha',
    unread: 1,
    updatedAt: '2026-03-17T08:12:00Z',
    messages: [
      {
        id: 'm1',
        sender: 'tenant',
        senderName: 'You',
        body: 'Kia ora Sam — dishwasher started leaking last night. I’ve shut the inlet tap. Not urgent but wanted you to know.',
        sentAt: '2026-03-16T20:15:00Z',
        read: true,
      },
      {
        id: 'm2',
        sender: 'system',
        senderName: 'RentIQ',
        body: 'Maintenance ticket opened · medium severity. Iris suggested Wellington Plumbing Co.',
        sentAt: '2026-03-16T20:16:00Z',
        read: true,
      },
      {
        id: 'm3',
        sender: 'landlord',
        senderName: 'Sam Aroha',
        body: 'Thanks Māhuta — plumber booked for Thursday morning. Quote capped at $280. Text me if it worsens.',
        sentAt: '2026-03-17T08:12:00Z',
        read: false,
      },
    ],
  },
  {
    id: 'thread-2',
    property_id: 'prop-1',
    subject: 'Rent reminder',
    participants: 'RentIQ · You',
    unread: 0,
    updatedAt: '2026-03-14T09:00:00Z',
    messages: [
      {
        id: 'm4',
        sender: 'system',
        senderName: 'RentIQ',
        body: 'Friendly heads-up: weekly rent of $680 is due Friday 21 Mar. Reference RENT-ORIENTAL-12.',
        sentAt: '2026-03-14T09:00:00Z',
        read: true,
      },
    ],
  },
  {
    id: 'thread-3',
    property_id: 'prop-1',
    subject: 'Annual inspection',
    participants: 'You · Sam Aroha',
    unread: 0,
    updatedAt: '2026-03-10T11:30:00Z',
    messages: [
      {
        id: 'm5',
        sender: 'landlord',
        senderName: 'Sam Aroha',
        body: 'Hi Māhuta — annual inspection booked for 4 Apr, 10am. 48 hours’ notice as required. Let me know if that time doesn’t work.',
        sentAt: '2026-03-10T11:30:00Z',
        read: true,
      },
      {
        id: 'm6',
        sender: 'tenant',
        senderName: 'You',
        body: 'That works for me. See you then.',
        sentAt: '2026-03-10T12:05:00Z',
        read: true,
      },
    ],
  },
]

export const mockTenantNotifications = [
  {
    id: 'n1',
    title: 'Plumber booked',
    body: 'Wellington Plumbing Co · Thursday AM · dishwasher leak',
    at: '2026-03-17T08:12:00Z',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Rent due Friday',
    body: '$680 · ref RENT-ORIENTAL-12',
    at: '2026-03-14T09:00:00Z',
    unread: false,
  },
  {
    id: 'n3',
    title: 'Inspection notice',
    body: '4 Apr 10am · 12 Oriental Parade',
    at: '2026-03-10T11:30:00Z',
    unread: false,
  },
]
