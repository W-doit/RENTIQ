-- RentIQ schema: users, properties, tenants, listings, applications,
-- maintenance_tickets, compliance, transactions

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  role text not null check (role in ('landlord', 'tenant')),
  phone text,
  subscription_tier text check (subscription_tier in ('entry', 'gold', 'premium')),
  avatar_url text,
  notification_prefs jsonb default '{"email":true,"push":true,"sms":false,"maintenance":true,"rent":true,"compliance":true}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid not null references public.users(id) on delete cascade,
  address text not null,
  suburb text not null,
  city text not null default 'Wellington',
  bedrooms int not null default 2,
  bathrooms int not null default 1,
  rent_weekly numeric(10,2) not null,
  status text not null check (status in ('occupied', 'vacant', 'compliance-due')) default 'vacant',
  image_url text,
  healthy_homes_score int default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  property_id uuid not null references public.properties(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  lease_start date not null,
  lease_end date not null,
  rent_weekly numeric(10,2) not null,
  bond_amount numeric(10,2) not null,
  bond_status text not null check (bond_status in ('lodged', 'pending', 'refunded')) default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  title text not null,
  description text not null,
  rent_weekly numeric(10,2) not null,
  available_from date,
  photos text[] default '{}',
  status text not null check (status in ('draft', 'published', 'archived')) default 'draft',
  platform_preview text check (platform_preview in ('trademe', 'realestate')) default 'trademe',
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  applicant_name text not null,
  email text not null,
  phone text,
  ai_score int not null check (ai_score between 1 and 100),
  credit_check text not null check (credit_check in ('pending', 'clear', 'review', 'failed')) default 'pending',
  income_weekly numeric(10,2),
  employment text,
  status text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
  notes text,
  applied_at timestamptz not null default now()
);

create table if not exists public.maintenance_tickets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  property_address text,
  title text not null,
  description text not null,
  status text not null check (status in ('new', 'triaged', 'assigned', 'complete')) default 'new',
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')) default 'medium',
  ai_severity_note text,
  tradesperson text,
  photo_url text,
  reported_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.compliance (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  property_address text,
  heating int not null default 0 check (heating between 0 and 100),
  insulation int not null default 0 check (insulation between 0 and 100),
  ventilation int not null default 0 check (ventilation between 0 and 100),
  moisture int not null default 0 check (moisture between 0 and 100),
  draught int not null default 0 check (draught between 0 and 100),
  next_review date,
  overall int generated always as (
    ((heating + insulation + ventilation + moisture + draught) / 5)
  ) stored,
  created_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  property_address text,
  type text not null check (type in ('rent', 'expense', 'bond', 'maintenance')),
  description text not null,
  amount numeric(12,2) not null,
  date date not null default current_date,
  status text not null check (status in ('paid', 'pending', 'overdue')) default 'pending',
  xero_synced boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.properties enable row level security;
alter table public.tenants enable row level security;
alter table public.listings enable row level security;
alter table public.applications enable row level security;
alter table public.maintenance_tickets enable row level security;
alter table public.compliance enable row level security;
alter table public.transactions enable row level security;

create policy "users_select_own" on public.users for select using (auth.uid() = id);
create policy "users_update_own" on public.users for update using (auth.uid() = id);

create policy "properties_landlord_all" on public.properties for all using (landlord_id = auth.uid());
create policy "tenants_landlord_select" on public.tenants for select using (
  exists (select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
  or user_id = auth.uid()
);
create policy "listings_landlord_all" on public.listings for all using (
  exists (select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
);
create policy "applications_landlord_all" on public.applications for all using (
  exists (select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
);
create policy "maintenance_landlord_all" on public.maintenance_tickets for all using (
  exists (select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
);
create policy "maintenance_tenant_insert" on public.maintenance_tickets for insert with check (true);
create policy "compliance_landlord_all" on public.compliance for all using (
  exists (select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
);
create policy "transactions_landlord_all" on public.transactions for all using (
  exists (select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
);

alter publication supabase_realtime add table public.maintenance_tickets;
alter publication supabase_realtime add table public.transactions;
