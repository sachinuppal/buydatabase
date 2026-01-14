-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  first_name text,
  last_name text,
  display_name text,
  billing_address jsonb, -- { line1, city, state, postal_code, country }
  shipping_address jsonb,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(display_name) >= 3)
);

-- RLS for Profiles
alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on profiles;
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

drop policy if exists "Users can insert their own profile." on profiles;
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

drop policy if exists "Users can update their own profile." on profiles;
create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. ORDERS
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  status text check (status in ('pending', 'completed', 'failed')) default 'pending',
  total_amount numeric(10,2) not null,
  currency text default 'INR',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Orders
alter table public.orders enable row level security;

drop policy if exists "Users can view their own orders." on orders;
create policy "Users can view their own orders."
  on orders for select
  using ( auth.uid() = user_id );

drop policy if exists "Users can insert their own orders." on orders;
create policy "Users can insert their own orders."
  on orders for insert
  with check ( auth.uid() = user_id );
  

-- 3. ORDER ITEMS
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders not null,
  package_id text not null, -- Stores the static ID or Slug of the sold package
  package_title text not null,
  price numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Order Items
alter table public.order_items enable row level security;

drop policy if exists "Users can view their own order items." on order_items;
create policy "Users can view their own order items."
  on order_items for select
  using ( 
    exists ( select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid() )
  );

drop policy if exists "Users can insert their own order items." on order_items;
create policy "Users can insert their own order items."
  on order_items for insert
  with check ( 
    exists ( select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid() )
  );


-- 4. PRODUCTS (Catalog)
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  slug text not null unique,
  title text not null,
  description text,
  price_inr numeric(10,2) not null, -- Display Price
  sale_price_inr numeric(10,2) not null, -- Actual Buy Price
  currency text default 'INR',
  
  -- Metadata for filtering
  region text, -- 'India', 'USA'
  city text, -- 'Bangalore'
  role text, -- 'HR', 'Founder'
  industry text, -- 'SaaS'
  seniority text, -- 'C-Level'
  
  records_count text, -- '50K'
  delivery_time text, -- 'Instant' or '24 Hours'
  format text default 'Excel/CSV',
  
  -- Delivery / Fulfillment
  asset_url text, -- Secure link to file (Drive/S3)
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Products
alter table public.products enable row level security;

-- Public read access
drop policy if exists "Products are viewable by everyone." on products;
create policy "Products are viewable by everyone."
  on products for select
  using ( true );

-- Admin only write access (Simplified: allow authenticated for MVP admin demo, or use service role)
drop policy if exists "Authenticated users can manage products." on products;
create policy "Authenticated users can manage products."
  on products for all
  using ( auth.role() = 'authenticated' );


-- 5. LEADS (Inquiries)
create table if not exists public.leads (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  name text,
  company text,
  description text,
  status text default 'new', -- new, contacted, closed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Leads
alter table public.leads enable row level security;

-- Public insert (for contact forms)
drop policy if exists "Anyone can insert leads." on leads;
create policy "Anyone can insert leads."
  on leads for insert
  with check ( true );

-- Admin read (Authenticated users for MVP)
drop policy if exists "Authenticated users can view leads." on leads;
create policy "Authenticated users can view leads."
  on leads for select
  using ( auth.role() = 'authenticated' );
