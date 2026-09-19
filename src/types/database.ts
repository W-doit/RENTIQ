export type UserRole = 'landlord' | 'tenant'
export type SubscriptionTier = 'entry' | 'gold' | 'premium'
export type PropertyStatus = 'occupied' | 'vacant' | 'compliance-due'
export type TicketStatus = 'new' | 'triaged' | 'assigned' | 'complete'
export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'
export type CreditCheckStatus = 'pending' | 'clear' | 'review' | 'failed'

export interface AppUser {
  id: string
  email: string
  full_name: string
  role: UserRole
  phone?: string
  subscription_tier?: SubscriptionTier
  avatar_url?: string
  notification_prefs?: {
    email: boolean
    push: boolean
    sms: boolean
    maintenance: boolean
    rent: boolean
    compliance: boolean
  }
}

export interface Property {
  id: string
  landlord_id: string
  address: string
  suburb: string
  city: string
  bedrooms: number
  bathrooms: number
  rent_weekly: number
  status: PropertyStatus
  image_url: string
  healthy_homes_score: number
  created_at: string
}

export interface Tenant {
  id: string
  user_id: string
  property_id: string
  full_name: string
  email: string
  phone: string
  lease_start: string
  lease_end: string
  rent_weekly: number
  bond_amount: number
  bond_status: 'lodged' | 'pending' | 'refunded'
}

export interface Listing {
  id: string
  property_id: string
  title: string
  description: string
  rent_weekly: number
  available_from: string
  photos: string[]
  status: 'draft' | 'published' | 'archived'
  platform_preview: 'trademe' | 'realestate'
}

export interface Application {
  id: string
  property_id: string
  applicant_name: string
  email: string
  phone: string
  ai_score: number
  credit_check: CreditCheckStatus
  income_weekly: number
  employment: string
  status: ApplicationStatus
  notes: string
  applied_at: string
}

export interface MaintenanceTicket {
  id: string
  property_id: string
  property_address: string
  title: string
  description: string
  status: TicketStatus
  severity: Severity
  ai_severity_note: string
  tradesperson?: string
  photo_url?: string
  reported_by: string
  created_at: string
  updated_at: string
}

export interface ComplianceRecord {
  id: string
  property_id: string
  property_address: string
  heating: number
  insulation: number
  ventilation: number
  moisture: number
  draught: number
  next_review: string
  overall: number
}

export interface Transaction {
  id: string
  property_id: string
  property_address: string
  type: 'rent' | 'expense' | 'bond' | 'maintenance'
  description: string
  amount: number
  date: string
  status: 'paid' | 'pending' | 'overdue'
  xero_synced: boolean
}

export interface Database {
  public: {
    Tables: {
      users: { Row: AppUser; Insert: Partial<AppUser>; Update: Partial<AppUser> }
      properties: { Row: Property; Insert: Partial<Property>; Update: Partial<Property> }
      tenants: { Row: Tenant; Insert: Partial<Tenant>; Update: Partial<Tenant> }
      listings: { Row: Listing; Insert: Partial<Listing>; Update: Partial<Listing> }
      applications: { Row: Application; Insert: Partial<Application>; Update: Partial<Application> }
      maintenance_tickets: {
        Row: MaintenanceTicket
        Insert: Partial<MaintenanceTicket>
        Update: Partial<MaintenanceTicket>
      }
      compliance: {
        Row: ComplianceRecord
        Insert: Partial<ComplianceRecord>
        Update: Partial<ComplianceRecord>
      }
      transactions: {
        Row: Transaction
        Insert: Partial<Transaction>
        Update: Partial<Transaction>
      }
    }
  }
}
