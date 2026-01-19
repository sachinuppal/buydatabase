import { Package } from "@/types/package";

export const ALL_PACKAGES: Package[] = [
    {
        "id": "PKG001",
        "slug": "all-india-complete-database",
        "title": "All India Complete Database",
        "category": "All India",
        "geo": { "country": "India" },
        "audience": { "group": "All", "role": "All Professionals" },
        "industry": "All",
        "record_count_estimate": "10M+",
        "fields_included": ["name", "company", "designation", "department", "work_email", "phone", "city", "state", "industry"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 60000000,
        "sale_price_inr": 30000000,
        "delivery_type": "queued",
        "image_prompt": "Product box cover, badge '98', title 'All India Complete', subtitle 'B2B contacts at scale', icons: map, building, email"
    },
    {
        "id": "PKG002",
        "slug": "advocates-lawyers-india",
        "title": "Advocates / Lawyers Database (India)",
        "category": "Professionals",
        "geo": { "country": "India" },
        "audience": { "group": "Legal", "role": "Advocates & Lawyers" },
        "industry": "Legal Services",
        "record_count_estimate": "100K–500K",
        "fields_included": ["name", "practice_area", "city", "state", "phone", "email(optional)", "address"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 800000,
        "sale_price_inr": 400000,
        "delivery_type": "instant",
        "image_prompt": "Badge '52', title 'Advocates / Lawyers', subtitle 'India', icons: scales, phone, map"
    },
    {
        "id": "PKG003",
        "slug": "agents-india",
        "title": "Agents Database (India)",
        "category": "Professionals",
        "geo": { "country": "India" },
        "audience": { "group": "Sales Network", "role": "Agents" },
        "industry": "Multi",
        "record_count_estimate": "50K–250K",
        "fields_included": ["name", "type", "city", "state", "phone", "email(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 400000,
        "sale_price_inr": 200000,
        "delivery_type": "instant",
        "image_prompt": "Badge '37', title 'Agents', subtitle 'India', icons: handshake, phone, map"
    },
    {
        "id": "PKG004",
        "slug": "all-india-students",
        "title": "All India Students Database",
        "category": "Students",
        "geo": { "country": "India" },
        "audience": { "group": "Education", "role": "Students" },
        "industry": "Education",
        "record_count_estimate": "500K–2M",
        "fields_included": ["name", "course", "college", "city", "state", "phone(optional)", "email(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 4000000,
        "sale_price_inr": 2000000,
        "delivery_type": "queued",
        "image_prompt": "Badge '2', title 'All India Students', subtitle 'Course + college details', icons: graduation cap, email"
    },

    // ---- HR / Hiring packs ----
    {
        "id": "PKG005",
        "slug": "hr-managers-india",
        "title": "HR Managers (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "HR & Talent", "role": "HR Manager" },
        "industry": "All",
        "record_count_estimate": "25K–120K",
        "fields_included": ["name", "company", "designation", "work_email", "phone", "city", "industry", "company_size"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 250000,
        "sale_price_inr": 125000,
        "delivery_type": "instant",
        "image_prompt": "Badge '65', title 'HR Managers', subtitle 'India', icons: users, briefcase, email"
    },
    {
        "id": "PKG006",
        "slug": "talent-acquisition-india",
        "title": "Talent Acquisition / Recruiters (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "HR & Talent", "role": "Recruiter / TA" },
        "industry": "All",
        "record_count_estimate": "30K–150K",
        "fields_included": ["name", "company", "designation", "work_email", "phone", "city", "linkedin(optional)"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 300000,
        "sale_price_inr": 150000,
        "delivery_type": "instant",
        "image_prompt": "Badge '70', title 'Recruiters / TA', subtitle 'India', icons: search, users, email"
    },
    {
        "id": "PKG007",
        "slug": "hr-directors-india",
        "title": "HR Directors / Heads (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "HR & Talent", "role": "HR Director/Head" },
        "industry": "All",
        "record_count_estimate": "5K–25K",
        "fields_included": ["name", "company", "designation", "work_email", "phone", "city", "company_size"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 50000,
        "sale_price_inr": 25000,
        "delivery_type": "instant",
        "image_prompt": "Badge '16', title 'HR Heads', subtitle 'India', icons: crown, users, building"
    },

    // ---- Sales / GTM packs ----
    {
        "id": "PKG008",
        "slug": "business-development-sales-pros-india",
        "title": "Business Development / Sales Professionals (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "Sales", "role": "BD/Sales" },
        "industry": "All",
        "record_count_estimate": "200K–800K",
        "fields_included": ["name", "company", "designation", "work_email", "phone", "city", "industry"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 1600000,
        "sale_price_inr": 800000,
        "delivery_type": "instant",
        "image_prompt": "Badge '439', title 'BD / Sales', subtitle 'India', icons: target, phone, email"
    },
    {
        "id": "PKG009",
        "slug": "sdr-bdr-india",
        "title": "SDR / BDR Contacts (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "Sales", "role": "SDR/BDR" },
        "industry": "IT, SaaS, Services",
        "record_count_estimate": "30K–150K",
        "fields_included": ["name", "company", "designation", "work_email", "city", "linkedin(optional)"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 300000,
        "sale_price_inr": 150000,
        "delivery_type": "instant",
        "image_prompt": "Badge '25', title 'SDR / BDR', subtitle 'India', icons: headset, email, target"
    },
    {
        "id": "PKG010",
        "slug": "marketing-managers-india",
        "title": "Marketing Managers (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "Marketing", "role": "Marketing Manager" },
        "industry": "All",
        "record_count_estimate": "20K–100K",
        "fields_included": ["name", "company", "designation", "work_email", "city", "industry", "company_size"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 200000,
        "sale_price_inr": 100000,
        "delivery_type": "instant",
        "image_prompt": "Badge '62', title 'Marketing Managers', subtitle 'India', icons: megaphone, email"
    },

    // ---- Analysts / Tech roles ----
    {
        "id": "PKG011",
        "slug": "business-analysts-india",
        "title": "Business Analysts (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "Analytics", "role": "Business Analyst" },
        "industry": "All",
        "record_count_estimate": "40K–200K",
        "fields_included": ["name", "company", "designation", "work_email", "city", "skills(optional)"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 400000,
        "sale_price_inr": 200000,
        "delivery_type": "instant",
        "image_prompt": "Badge '25', title 'Business Analysts', subtitle 'India', icons: chart, email"
    },
    {
        "id": "PKG012",
        "slug": "data-scientists-india",
        "title": "Data Scientists (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "Data", "role": "Data Scientist" },
        "industry": "IT/SaaS/Enterprise",
        "record_count_estimate": "15K–70K",
        "fields_included": ["name", "company", "designation", "work_email", "city", "skills(optional)"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 150000,
        "sale_price_inr": 75000,
        "delivery_type": "instant",
        "image_prompt": "Badge '10', title 'Data Scientists', subtitle 'India', icons: brain, code, email"
    },
    {
        "id": "PKG013",
        "slug": "it-leaders-usa",
        "title": "IT Leaders (USA) – Directors+",
        "category": "USA",
        "geo": { "country": "USA" },
        "audience": { "group": "IT Leadership", "role": "IT Director/VP/CIO" },
        "industry": "All",
        "record_count_estimate": "20K–90K",
        "fields_included": ["name", "company", "title", "work_email", "phone(optional)", "state", "employee_count"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 200000,
        "sale_price_inr": 100000,
        "delivery_type": "queued",
        "image_prompt": "Badge '37', title 'IT Leaders', subtitle 'USA (Director+)', icons: server, building, email"
    },

    // ---- Industry packs (India) ----
    {
        "id": "PKG014",
        "slug": "apparel-garments-exporters-india",
        "title": "Apparel / Garments Exporters (India)",
        "category": "By Industry",
        "geo": { "country": "India" },
        "audience": { "group": "Companies", "role": "Owners/Directors" },
        "industry": "Apparel Export",
        "record_count_estimate": "5K–30K",
        "fields_included": ["company", "contact_name(optional)", "designation(optional)", "email(optional)", "phone", "city", "website"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 50000,
        "sale_price_inr": 25000,
        "delivery_type": "instant",
        "image_prompt": "Badge '62', title 'Garments Exporters', subtitle 'India', icons: t-shirt, ship, phone"
    },
    {
        "id": "PKG015",
        "slug": "architects-interior-designers-india",
        "title": "Architects / Interior Designers (India)",
        "category": "Professionals",
        "geo": { "country": "India" },
        "audience": { "group": "Design", "role": "Architect/Interior Designer" },
        "industry": "Architecture & Design",
        "record_count_estimate": "50K–250K",
        "fields_included": ["name", "firm(optional)", "phone", "email(optional)", "city", "state"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 400000,
        "sale_price_inr": 200000,
        "delivery_type": "instant",
        "image_prompt": "Badge '65', title 'Architects & Interior', subtitle 'India', icons: compass, ruler, map"
    },
    {
        "id": "PKG016",
        "slug": "beauty-parlours-spa-india",
        "title": "Beauty Parlours / Salons / SPA (India)",
        "category": "Local Businesses",
        "geo": { "country": "India" },
        "audience": { "group": "SMB", "role": "Owner/Manager" },
        "industry": "Beauty",
        "record_count_estimate": "100K–400K",
        "fields_included": ["business_name", "owner(optional)", "phone", "city", "state", "address(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 800000,
        "sale_price_inr": 400000,
        "delivery_type": "instant",
        "image_prompt": "Badge '70', title 'Salons / SPA', subtitle 'India', icons: scissors, phone, map"
    },
    {
        "id": "PKG017",
        "slug": "bpo-call-centre-employees-india",
        "title": "BPO / Call Centre Employees (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "BPO", "role": "Agents/Team Leads" },
        "industry": "BPO",
        "record_count_estimate": "150K–600K",
        "fields_included": ["name", "company(optional)", "designation", "city", "phone(optional)", "email(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 1200000,
        "sale_price_inr": 600000,
        "delivery_type": "queued",
        "image_prompt": "Badge '261', title 'Call Centre Employees', subtitle 'India', icons: headset, phone, users"
    },
    {
        "id": "PKG018",
        "slug": "building-material-suppliers-india",
        "title": "Building Material / Requisites (India)",
        "category": "Local Businesses",
        "geo": { "country": "India" },
        "audience": { "group": "SMB", "role": "Owner/Procurement" },
        "industry": "Construction",
        "record_count_estimate": "50K–250K",
        "fields_included": ["business_name", "phone", "city", "state", "category", "address(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 400000,
        "sale_price_inr": 200000,
        "delivery_type": "instant",
        "image_prompt": "Badge '16', title 'Building Material', subtitle 'India', icons: bricks, truck, phone"
    },

    // ---- City packs (India) ----
    {
        "id": "PKG019",
        "slug": "founders-bangalore",
        "title": "Founders / Co-founders – Bangalore",
        "category": "By City",
        "geo": { "country": "India", "city": "Bangalore" },
        "audience": { "group": "Leadership", "role": "Founder/Co-founder" },
        "industry": "Startup",
        "record_count_estimate": "5K–25K",
        "fields_included": ["name", "company", "title", "work_email(optional)", "linkedin(optional)", "industry", "funding_stage(optional)"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 50000,
        "sale_price_inr": 25000,
        "delivery_type": "queued",
        "image_prompt": "Badge '10', title 'Founders', subtitle 'Bangalore', icons: rocket, building, map"
    },
    {
        "id": "PKG020",
        "slug": "hr-managers-mumbai",
        "title": "HR Managers – Mumbai",
        "category": "By City",
        "geo": { "country": "India", "city": "Mumbai" },
        "audience": { "group": "HR & Talent", "role": "HR Manager" },
        "industry": "All",
        "record_count_estimate": "3K–20K",
        "fields_included": ["name", "company", "work_email", "phone", "industry", "area(optional)"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 30000,
        "sale_price_inr": 15000,
        "delivery_type": "instant",
        "image_prompt": "Badge '12', title 'HR Managers', subtitle 'Mumbai', icons: users, map, email"
    },

    // ---- Use-case packs ----
    {
        "id": "PKG021",
        "slug": "outbound-starter-kit-india",
        "title": "Outbound Starter Kit (India) – 5,000 Contacts",
        "category": "Bundles",
        "geo": { "country": "India" },
        "audience": { "group": "GTM", "role": "Mixed" },
        "industry": "IT/SaaS/Services",
        "record_count_estimate": "5K",
        "fields_included": ["name", "company", "title", "work_email", "city", "industry", "company_size"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 50000,
        "sale_price_inr": 25000,
        "delivery_type": "instant",
        "image_prompt": "Badge '5K', title 'Outbound Starter Kit', subtitle 'India', icons: email, target, rocket"
    },
    {
        "id": "PKG022",
        "slug": "abm-top-200-it-companies-india",
        "title": "ABM Pack – Top 200 IT Companies (India) + Decision Makers",
        "category": "Use Case",
        "geo": { "country": "India" },
        "audience": { "group": "CXO/IT", "role": "CIO/CTO/IT Head" },
        "industry": "IT Services",
        "record_count_estimate": "2K–8K",
        "fields_included": ["company", "website", "revenue_band(optional)", "employee_count", "dm_name", "dm_title", "dm_email", "dm_phone(optional)"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 20000,
        "sale_price_inr": 10000,
        "delivery_type": "queued",
        "image_prompt": "Badge '200', title 'ABM: IT Top 200', subtitle 'India + Decision Makers', icons: bullseye, building, email"
    },

    // ---- More packs (continue) ----
    {
        "id": "PKG023",
        "slug": "finance-managers-india",
        "title": "Finance Managers (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "Finance", "role": "Finance Manager" },
        "industry": "All",
        "record_count_estimate": "15K–80K",
        "fields_included": ["name", "company", "title", "work_email", "city", "industry"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 150000,
        "sale_price_inr": 75000,
        "delivery_type": "instant",
        "image_prompt": "Badge '45', title 'Finance Managers', subtitle 'India', icons: rupee, email, building"
    },
    {
        "id": "PKG024",
        "slug": "procurement-heads-india",
        "title": "Procurement Heads / Purchase Managers (India)",
        "category": "By Role",
        "geo": { "country": "India" },
        "audience": { "group": "Procurement", "role": "Purchase/Procurement Head" },
        "industry": "Manufacturing, Retail, FMCG",
        "record_count_estimate": "10K–50K",
        "fields_included": ["name", "company", "title", "work_email", "phone(optional)", "city", "industry"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 100000,
        "sale_price_inr": 50000,
        "delivery_type": "instant",
        "image_prompt": "Badge '25', title 'Procurement Heads', subtitle 'India', icons: clipboard, truck, email"
    },

    {
        "id": "PKG025",
        "slug": "manufacturers-india",
        "title": "Manufacturing Companies (India) – Verified Contacts",
        "category": "By Industry",
        "geo": { "country": "India" },
        "audience": { "group": "Companies", "role": "Owner/Director/Manager" },
        "industry": "Manufacturing",
        "record_count_estimate": "50K–250K",
        "fields_included": ["company", "plant_city(optional)", "phone", "email(optional)", "website", "category"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 400000,
        "sale_price_inr": 200000,
        "delivery_type": "queued",
        "image_prompt": "Badge '70', title 'Manufacturing Cos', subtitle 'India', icons: factory, phone, map"
    },

    {
        "id": "PKG026",
        "slug": "real-estate-builders-india",
        "title": "Real Estate Builders / Developers (India)",
        "category": "By Industry",
        "geo": { "country": "India" },
        "audience": { "group": "Companies", "role": "Owner/Director" },
        "industry": "Real Estate",
        "record_count_estimate": "10K–60K",
        "fields_included": ["company", "contact_name(optional)", "phone", "email(optional)", "city", "website"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 100000,
        "sale_price_inr": 50000,
        "delivery_type": "instant",
        "image_prompt": "Badge '62', title 'Builders', subtitle 'India', icons: crane, building, phone"
    },

    {
        "id": "PKG027",
        "slug": "doctors-india",
        "title": "Doctors / Clinics (India)",
        "category": "Professionals",
        "geo": { "country": "India" },
        "audience": { "group": "Healthcare", "role": "Doctor" },
        "industry": "Healthcare",
        "record_count_estimate": "200K–800K",
        "fields_included": ["name", "specialty", "city", "phone", "clinic(optional)", "address(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 1600000,
        "sale_price_inr": 800000,
        "delivery_type": "queued",
        "image_prompt": "Badge '98', title 'Doctors / Clinics', subtitle 'India', icons: stethoscope, phone, map"
    },

    {
        "id": "PKG028",
        "slug": "pharmacies-india",
        "title": "Pharmacies / Chemists (India)",
        "category": "Local Businesses",
        "geo": { "country": "India" },
        "audience": { "group": "SMB", "role": "Owner/Manager" },
        "industry": "Healthcare Retail",
        "record_count_estimate": "150K–600K",
        "fields_included": ["business_name", "phone", "city", "state", "address(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 1200000,
        "sale_price_inr": 600000,
        "delivery_type": "instant",
        "image_prompt": "Badge '70', title 'Pharmacies', subtitle 'India', icons: pill, phone, map"
    },

    {
        "id": "PKG029",
        "slug": "restaurants-india",
        "title": "Restaurants / Cafes (India)",
        "category": "Local Businesses",
        "geo": { "country": "India" },
        "audience": { "group": "SMB", "role": "Owner/Manager" },
        "industry": "Food & Beverage",
        "record_count_estimate": "200K–900K",
        "fields_included": ["business_name", "phone", "city", "state", "category(optional)", "address(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 1600000,
        "sale_price_inr": 800000,
        "delivery_type": "instant",
        "image_prompt": "Badge '261', title 'Restaurants', subtitle 'India', icons: fork, phone, map"
    },

    {
        "id": "PKG030",
        "slug": "coaching-centres-india",
        "title": "Coaching Centres (India)",
        "category": "Education",
        "geo": { "country": "India" },
        "audience": { "group": "SMB", "role": "Owner/Director" },
        "industry": "Education",
        "record_count_estimate": "50K–250K",
        "fields_included": ["institute_name", "phone", "city", "state", "address(optional)"],
        "update_frequency": "Quarterly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 400000,
        "sale_price_inr": 200000,
        "delivery_type": "instant",
        "image_prompt": "Badge '25', title 'Coaching Centres', subtitle 'India', icons: book, phone, map"
    },

    {
        "id": "PKG031",
        "slug": "it-companies-india",
        "title": "IT / Software Companies (India) – Company Master",
        "category": "By Industry",
        "geo": { "country": "India" },
        "audience": { "group": "Companies", "role": "Company List" },
        "industry": "IT & Software",
        "record_count_estimate": "50K–200K",
        "fields_included": ["company", "website", "city", "state", "employee_band(optional)", "services(optional)"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 400000,
        "sale_price_inr": 200000,
        "delivery_type": "instant",
        "image_prompt": "Badge '70', title 'IT Companies', subtitle 'India', icons: code, building, map"
    },

    {
        "id": "PKG032",
        "slug": "saas-founders-india",
        "title": "SaaS Founders & Owners (India)",
        "category": "By Industry",
        "geo": { "country": "India" },
        "audience": { "group": "Leadership", "role": "Founder/Owner" },
        "industry": "SaaS",
        "record_count_estimate": "3K–15K",
        "fields_included": ["name", "company", "title", "work_email(optional)", "linkedin(optional)", "city"],
        "update_frequency": "Monthly",
        "formats": ["CSV", "XLSX"],
        "price_inr": 30000,
        "sale_price_inr": 15000,
        "delivery_type": "queued",
        "image_prompt": "Badge '10', title 'SaaS Founders', subtitle 'India', icons: rocket, cloud, email"
    },

    // ---- Additional packs ----
    {
        "id": "PKG033",
        "slug": "cxo-india",
        "title": "CXO List (India) – CEO/CFO/CTO/CMO",
        "category": "By Role",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "CXO",
            "role": "CXO"
        },
        "industry": "All",
        "record_count_estimate": "20K–80K",
        "fields_included": [
            "name",
            "company",
            "title",
            "work_email(optional)",
            "linkedin(optional)",
            "city"
        ],
        "update_frequency": "Monthly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 200000,
        "sale_price_inr": 100000,
        "delivery_type": "queued",
        "image_prompt": "Badge '37', title 'CXOs', subtitle 'India', icons: crown, building, email"
    },
    {
        "id": "PKG034",
        "slug": "founders-india",
        "title": "Founders / Co-founders (India)",
        "category": "By Role",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Leadership",
            "role": "Founder/Co-founder"
        },
        "industry": "Startup",
        "record_count_estimate": "30K–120K",
        "fields_included": [
            "name",
            "company",
            "title",
            "linkedin(optional)",
            "city",
            "industry"
        ],
        "update_frequency": "Monthly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 300000,
        "sale_price_inr": 150000,
        "delivery_type": "queued",
        "image_prompt": "Badge '52', title 'Founders', subtitle 'India', icons: rocket, map, building"
    },
    {
        "id": "PKG035",
        "slug": "product-managers-india",
        "title": "Product Managers (India)",
        "category": "By Role",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Product",
            "role": "Product Manager"
        },
        "industry": "IT/SaaS",
        "record_count_estimate": "20K–80K",
        "fields_included": [
            "name",
            "company",
            "title",
            "work_email",
            "city",
            "skills(optional)"
        ],
        "update_frequency": "Monthly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 200000,
        "sale_price_inr": 100000,
        "delivery_type": "instant",
        "image_prompt": "Badge '25', title 'Product Managers', subtitle 'India', icons: roadmap, email, building"
    },
    {
        "id": "PKG036",
        "slug": "engineering-managers-india",
        "title": "Engineering Managers (India)",
        "category": "By Role",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Engineering",
            "role": "Engineering Manager"
        },
        "industry": "IT/SaaS",
        "record_count_estimate": "15K–60K",
        "fields_included": [
            "name",
            "company",
            "title",
            "work_email",
            "city"
        ],
        "update_frequency": "Monthly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 150000,
        "sale_price_inr": 75000,
        "delivery_type": "instant",
        "image_prompt": "Badge '16', title 'Eng Managers', subtitle 'India', icons: code, email, gear"
    },
    {
        "id": "PKG037",
        "slug": "qa-testers-india",
        "title": "QA / Test Engineers (India)",
        "category": "By Role",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Engineering",
            "role": "QA/Test"
        },
        "industry": "IT",
        "record_count_estimate": "20K–90K",
        "fields_included": [
            "name",
            "company",
            "title",
            "work_email(optional)",
            "city"
        ],
        "update_frequency": "Monthly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 200000,
        "sale_price_inr": 100000,
        "delivery_type": "instant",
        "image_prompt": "Badge '62', title 'QA / Test', subtitle 'India', icons: bug, check, email"
    },
    {
        "id": "PKG038",
        "slug": "hospital-admins-india",
        "title": "Hospitals – Admin/Procurement Contacts (India)",
        "category": "Healthcare",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Operations",
            "role": "Hospital Admin/Procurement"
        },
        "industry": "Hospitals",
        "record_count_estimate": "5K–25K",
        "fields_included": [
            "hospital",
            "city",
            "state",
            "admin_name(optional)",
            "email(optional)",
            "phone"
        ],
        "update_frequency": "Quarterly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 50000,
        "sale_price_inr": 25000,
        "delivery_type": "queued",
        "image_prompt": "Badge '10', title 'Hospital Admin', subtitle 'India', icons: hospital, phone, email"
    },
    {
        "id": "PKG039",
        "slug": "schools-india",
        "title": "Schools (India) – Principal/Owner Contacts",
        "category": "Education",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Education",
            "role": "Principal/Owner"
        },
        "industry": "Schools",
        "record_count_estimate": "80K–300K",
        "fields_included": [
            "school",
            "city",
            "state",
            "phone",
            "email(optional)"
        ],
        "update_frequency": "Quarterly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 640000,
        "sale_price_inr": 320000,
        "delivery_type": "queued",
        "image_prompt": "Badge '70', title 'Schools', subtitle 'India', icons: school, phone, map"
    },
    {
        "id": "PKG040",
        "slug": "colleges-india",
        "title": "Colleges (India) – Admissions Contacts",
        "category": "Education",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Education",
            "role": "Admissions/Registrar"
        },
        "industry": "Colleges",
        "record_count_estimate": "10K–50K",
        "fields_included": [
            "college",
            "city",
            "state",
            "phone",
            "email(optional)"
        ],
        "update_frequency": "Quarterly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 100000,
        "sale_price_inr": 50000,
        "delivery_type": "instant",
        "image_prompt": "Badge '25', title 'Colleges', subtitle 'India', icons: graduation cap, phone, email"
    },
    {
        "id": "PKG041",
        "slug": "retailers-india",
        "title": "Retail Stores / Dealers (India)",
        "category": "Local Businesses",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "SMB",
            "role": "Owner"
        },
        "industry": "Retail",
        "record_count_estimate": "200K–900K",
        "fields_included": [
            "store_name",
            "city",
            "state",
            "phone",
            "category(optional)"
        ],
        "update_frequency": "Quarterly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 1600000,
        "sale_price_inr": 800000,
        "delivery_type": "instant",
        "image_prompt": "Badge '261', title 'Retailers', subtitle 'India', icons: cart, phone, map"
    },
    {
        "id": "PKG042",
        "slug": "automobile-dealers-india",
        "title": "Automobile Dealers (India)",
        "category": "Automotive",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "SMB",
            "role": "Owner/GM"
        },
        "industry": "Automotive",
        "record_count_estimate": "20K–80K",
        "fields_included": [
            "dealer",
            "city",
            "state",
            "phone",
            "brand(optional)"
        ],
        "update_frequency": "Quarterly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 200000,
        "sale_price_inr": 100000,
        "delivery_type": "instant",
        "image_prompt": "Badge '37', title 'Auto Dealers', subtitle 'India', icons: car, phone, map"
    },
    {
        "id": "PKG043",
        "slug": "hotels-india",
        "title": "Hotels / Resorts (India)",
        "category": "Hospitality",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Hospitality",
            "role": "Owner/Manager"
        },
        "industry": "Hotels",
        "record_count_estimate": "30K–120K",
        "fields_included": [
            "hotel",
            "city",
            "state",
            "phone",
            "email(optional)"
        ],
        "update_frequency": "Quarterly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 300000,
        "sale_price_inr": 150000,
        "delivery_type": "instant",
        "image_prompt": "Badge '52', title 'Hotels', subtitle 'India', icons: hotel, phone, map"
    },
    {
        "id": "PKG044",
        "slug": "travel-agents-india",
        "title": "Travel Agents (India)",
        "category": "Hospitality",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Hospitality",
            "role": "Agent/Owner"
        },
        "industry": "Travel",
        "record_count_estimate": "20K–90K",
        "fields_included": [
            "agency",
            "owner(optional)",
            "phone",
            "city",
            "state"
        ],
        "update_frequency": "Quarterly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 200000,
        "sale_price_inr": 100000,
        "delivery_type": "instant",
        "image_prompt": "Badge '62', title 'Travel Agents', subtitle 'India', icons: plane, phone, map"
    },
    {
        "id": "PKG045",
        "slug": "linkedin-ads-it-leaders-usa-pack",
        "title": "LinkedIn Ads Pack – IT Leaders (USA)",
        "category": "Use Case",
        "geo": {
            "country": "USA"
        },
        "audience": {
            "group": "IT Leadership",
            "role": "IT Director+"
        },
        "industry": "All",
        "record_count_estimate": "10K–50K",
        "fields_included": [
            "name",
            "company",
            "title",
            "work_email",
            "state",
            "company_size"
        ],
        "update_frequency": "Monthly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 100000,
        "sale_price_inr": 50000,
        "delivery_type": "queued",
        "image_prompt": "Badge '25', title 'LinkedIn Ads: IT Leaders', subtitle 'USA', icons: ads, server, email"
    },
    {
        "id": "PKG046",
        "slug": "job-seekers-india",
        "title": "Job Seekers Database (India) – Sample Pack",
        "category": "Job Seekers",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Candidates",
            "role": "Mixed"
        },
        "industry": "All",
        "record_count_estimate": "50K–200K",
        "fields_included": [
            "name",
            "city",
            "role",
            "experience_band(optional)",
            "phone(optional)",
            "email(optional)"
        ],
        "update_frequency": "Monthly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 400000,
        "sale_price_inr": 200000,
        "delivery_type": "queued",
        "image_prompt": "Badge '70', title 'Job Seekers', subtitle 'India', icons: resume, phone, map"
    },
    {
        "id": "PKG047",
        "slug": "startup-investors-india",
        "title": "Angel Investors / Micro VCs (India)",
        "category": "Leadership",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Finance",
            "role": "Investor"
        },
        "industry": "Venture",
        "record_count_estimate": "1K–5K",
        "fields_included": [
            "name",
            "firm(optional)",
            "city",
            "linkedin(optional)",
            "email(optional)"
        ],
        "update_frequency": "Quarterly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 10000,
        "sale_price_inr": 5000,
        "delivery_type": "queued",
        "image_prompt": "Badge '2', title 'Angel Investors', subtitle 'India', icons: money, handshake, map"
    },
    {
        "id": "PKG048",
        "slug": "ecommerce-brands-india",
        "title": "Ecommerce / D2C Brands (India) – Company Master",
        "category": "By Industry",
        "geo": {
            "country": "India"
        },
        "audience": {
            "group": "Companies",
            "role": "Founder/Marketing"
        },
        "industry": "D2C/Ecommerce",
        "record_count_estimate": "5K–30K",
        "fields_included": [
            "company",
            "website",
            "category(optional)",
            "city",
            "employee_band(optional)"
        ],
        "update_frequency": "Monthly",
        "formats": [
            "CSV",
            "XLSX"
        ],
        "price_inr": 50000,
        "sale_price_inr": 25000,
        "delivery_type": "instant",
        "image_prompt": "Badge '16', title 'D2C Brands', subtitle 'India', icons: box, cart, map"
    }
];
