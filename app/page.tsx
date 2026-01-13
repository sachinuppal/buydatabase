
import Link from "next/link";
import { Hero } from "@/components/ui/hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Briefcase, Database, Shield, Zap, TrendingUp, Check } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BuyDatabase.ai – Discover & Activate High-Intent Business Audiences",
  description: "Discover campaign-ready business audiences by location, role, industry, and intent. BuyDatabase.ai helps teams identify, understand, and activate the right audience responsibly.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b bg-background">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <Container className="text-center flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-6">
            Built for teams who run campaigns — not spreadsheets
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground max-w-5xl mb-6">
            Discover & Activate the <span className="text-premium-gradient">Right Audience</span> for Your Campaigns
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-10">
            BuyDatabase.ai is an <strong>audience discovery and activation platform</strong> that helps businesses find <strong>high-intent, segmented audiences</strong> by location, role, industry, and buying signals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/audiences">
              <Button size="xl" variant="premium">
                Explore All Audiences <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/datasets">
              <Button size="xl" variant="outline">
                Browse Datasets
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
            <span className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary" /> Explore audiences</span>
            <span className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary" /> Understand who matters</span>
            <span className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary" /> Activate responsibly</span>
          </div>
        </Container>
      </section>

      {/* 2. WHAT IS BUYDATABASE.AI? */}
      <Section className="bg-muted/30">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">A modern alternative to buying raw lists</h2>
            <p className="text-lg text-muted-foreground mb-6">
              BuyDatabase.ai is not a “bulk data seller”. We help you discover <strong>who your buyers actually are</strong>, segment audiences by <strong>real business relevance</strong>, and plan campaigns with context, not noise.
            </p>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "Location & Geography" },
                { icon: Briefcase, text: "Role & Seniority" },
                { icon: Database, text: "Industry & Verticals" },
                { icon: TrendingUp, text: "Company Stage & Intent" }
              ].map((item, i) => (
                <div key={i} className="flex items-center p-3 bg-background rounded-lg border shadow-sm">
                  <item.icon className="h-5 w-5 text-primary mr-3" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/datasets">
                <Button variant="default" size="lg">Browse Dataset Library <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* Visual abstraction of the platform */}
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border flex items-center justify-center p-8">
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="bg-card p-4 rounded-xl shadow-lg border animate-in fade-in zoom-in duration-500 delay-100">
                  <div className="h-2 w-12 bg-primary/20 rounded mb-2" />
                  <div className="h-4 w-24 bg-foreground/10 rounded mb-1" />
                  <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
                </div>
                <div className="bg-card p-4 rounded-xl shadow-lg border animate-in fade-in zoom-in duration-500 delay-200 mt-8">
                  <div className="h-2 w-12 bg-secondary/80 rounded mb-2" />
                  <div className="h-4 w-24 bg-foreground/10 rounded mb-1" />
                  <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
                </div>
                <div className="bg-card p-4 rounded-xl shadow-lg border animate-in fade-in zoom-in duration-500 delay-300">
                  <div className="h-2 w-12 bg-primary/20 rounded mb-2" />
                  <div className="h-4 w-24 bg-foreground/10 rounded mb-1" />
                  <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
                </div>
                <div className="bg-card p-4 rounded-xl shadow-lg border animate-in fade-in zoom-in duration-500 delay-400 mt-8">
                  <div className="h-2 w-12 bg-secondary/80 rounded mb-2" />
                  <div className="h-4 w-24 bg-foreground/10 rounded mb-1" />
                  <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. WHO IS THIS FOR? */}
      <Section title="Built for performance-driven teams">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "B2B SaaS & Enterprise", desc: "Demand generation, ABM, outbound sales", icon: Zap },
            { title: "Agencies & Consultants", desc: "Client campaigns, targeting strategy, lead planning", icon: Briefcase },
            { title: "Recruitment & Staffing", desc: "Role-specific and location-based hiring campaigns", icon: UsersIcon },
            { title: "Market Research", desc: "TAM sizing, ICP definition, expansion analysis", icon: TrendingUp }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-card border rounded-xl hover:border-primary/50 transition-colors">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/use-cases" className="text-primary font-medium hover:underline inline-flex items-center">
            See Use Cases <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* 4. EXPLORE BY LOCATION */}
      <Section className="bg-secondary/20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-heading font-bold mb-4">Target the right city before the right message</h2>
            <p className="text-muted-foreground">We organize audiences city-by-city so your campaigns stay hyper-relevant.</p>
          </div>
          <Link href="/audiences/by-location">
            <Button variant="outline">View All Locations</Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Bangalore Business Audiences", href: "/audiences/by-location/india/bangalore/" },
            { label: "Mumbai Business Audiences", href: "/audiences/by-location/india/mumbai/" },
            { label: "Delhi NCR Business Audiences", href: "/audiences/by-location/india/delhi/" },
            { label: "Pune Business Audiences", href: "/audiences/by-location/india/pune/" }
          ].map((city) => (
            <Link key={city.href} href={city.href} className="group p-6 bg-background rounded-xl border hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <MapPin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-bold font-heading">{city.label}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5. EXPLORE BY ROLE */}
      <Section>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-heading font-bold mb-4">Message the decision-makers that matter</h2>
            <p className="text-muted-foreground">Campaigns perform best when they’re role-specific.</p>
          </div>
          <Link href="/audiences/by-role">
            <Button variant="outline">View All Roles</Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Founders & Co-founders", href: "/audiences/by-role/founders/" },
            { label: "HR Managers & Talent Leaders", href: "/audiences/by-role/hr-managers/" },
            { label: "Marketing & Growth Leaders", href: "/audiences/by-role/marketing-managers/" }, // utilizing existing slug
            { label: "CTOs & Engineering Leaders", href: "/audiences/by-role/cto/" } // utilizing existing slug
          ].map((role) => (
            <Link key={role.href} href={role.href} className="group p-6 bg-background rounded-xl border hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-bold font-heading">{role.label}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6. DATASETS */}
      <Section className="bg-muted/30">
        <h2 className="text-3xl font-heading font-bold mb-4">Structured audience intelligence, not raw dumps</h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">Our datasets are designed for planning, segmentation, and activation.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { label: "India B2B Professionals Dataset", href: "/datasets/india-b2b-professionals/" },
            { label: "Senior Decision Makers – India", href: "/datasets/india-senior-decision-makers/" },
            { label: "HR & Talent Leaders – India", href: "/datasets/india-hr-and-talent-leaders/" },
            { label: "High-Growth Companies – India", href: "/datasets/high-growth-companies-india/" }
          ].map((ds) => (
            <Link key={ds.href} href={ds.href} className="flex items-center p-4 bg-background border rounded-lg hover:border-primary transition-colors">
              <Database className="h-5 w-5 text-primary mr-4" />
              <span className="font-semibold text-lg">{ds.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </Section>

      {/* 7. HOW TEAMS USE THIS */}
      <Section title="From discovery → to activation">
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
          {[
            { step: "1", title: "Discover", desc: "Find the right audience by city, role, and industry" },
            { step: "2", title: "Understand", desc: "Learn what drives decisions and buying behavior" },
            { step: "3", title: "Activate", desc: "Run email, LinkedIn, outbound, and ABM campaigns with precision" },
            { step: "4", title: "Scale", desc: "Expand to new cities, roles, and segments confidently" }
          ].map((s) => (
            <div key={s.step} className="text-center bg-background py-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4 border-4 border-background">
                {s.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground px-4">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/activation">
            <Button variant="secondary">Learn How Activation Works</Button>
          </Link>
        </div>
      </Section>

      {/* 8. RESPONSIBLE OUTREACH */}
      <Section className="bg-primary/5 border-y border-primary/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-heading font-bold mb-4">Audience intelligence with compliance in mind</h2>
            <p className="text-lg text-muted-foreground mb-6">
              BuyDatabase.ai is designed to support ethical B2B outreach and responsible targeting. We focus on business context and aggregated insights.
            </p>
            <div className="p-4 bg-background/50 rounded-lg border border-primary/10 text-sm italic text-muted-foreground mb-6">
              We do not expose sensitive personal data publicly.
            </div>
            <Link href="/about/data-philosophy">
              <Button variant="outline">Read Our Data Philosophy</Button>
            </Link>
          </div>
          <div className="flex-shrink-0">
            <Shield className="h-32 w-32 text-primary/20" />
          </div>
        </div>
      </Section>

      {/* 9. POPULAR COMBINATIONS */}
      <Section title="High-intent starting points">
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { label: "HR Managers in Bangalore", href: "/audiences/india/bangalore/hr-managers/" },
            { label: "Founders in Mumbai", href: "/audiences/india/mumbai/founders/" },
            { label: "Marketing Leaders in Delhi", href: "/audiences/india/delhi/marketing-managers/" }, // specific slug adjusted
            { label: "CTOs in Pune", href: "/audiences/india/pune/cto/" } // specific slug adjusted
          ].map(combo => (
            <Link key={combo.href} href={combo.href} className="px-6 py-3 rounded-full border bg-muted/10 hover:bg-white hover:shadow-lg hover:border-primary/20 transition-all font-medium">
              {combo.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* 10. FINAL CTA */}
      <section className="py-24 bg-card border-t text-center">
        <Container>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Stop guessing. Start with the right audience.</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Whether you’re launching a new campaign, entering a new city, or refining your ICP — BuyDatabase.ai helps you <strong>start with clarity</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/audiences">
              <Button size="xl" variant="premium">Explore Audiences</Button>
            </Link>
            <Link href="/datasets">
              <Button size="xl" variant="outline">Browse Datasets</Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

// Icon helper
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
