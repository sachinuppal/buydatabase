
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ArrowRight, MapPin, Briefcase, Factory, FileText, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Business Audiences by City, Role & Industry | BuyDatabase.ai",
    description: "Explore business audiences by location, role, industry, and intent. Find the right target segment for outbound, ABM, and demand gen campaigns—fast.",
};

export default function AudiencesIndexPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. HERO & INTRO */}
            <section className="relative py-20 bg-background border-b overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-50"></div>
                <Container className="relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
                            Explore Business Audiences
                        </h1>
                        <h2 className="text-xl md:text-2xl font-medium text-primary mb-8">
                            Find the audience before you write the message
                        </h2>
                        <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground mb-10">
                            <p>
                                BuyDatabase.ai helps you discover <strong>campaign-ready business audiences</strong> using simple dimensions:
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12 text-left">
                            {[
                                { icon: MapPin, text: "Location (city / state)" },
                                { icon: Users, text: "Role & seniority" },
                                { icon: Factory, text: "Industry" },
                                { icon: TrendingUp, text: "Company intent" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center p-3 bg-muted/30 rounded-lg border">
                                    <item.icon className="h-4 w-4 text-primary mr-3" />
                                    <span className="text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/audiences/by-location">
                                <Button size="lg" variant="default">Browse by Location <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            </Link>
                            <Link href="/audiences/by-role">
                                <Button size="lg" variant="outline">Browse by Role</Button>
                            </Link>
                            {/* Placeholder route until industry pages are built */}
                            <Link href="/audiences">
                                <Button size="lg" variant="outline">Browse by Industry</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 2. BROWSE BY LOCATION */}
            <Section className="bg-muted/30">
                <div className="mb-8">
                    <h2 className="text-3xl font-heading font-bold mb-2">Browse Audiences by Location</h2>
                    <p className="text-lg text-muted-foreground">Target city-specific audiences with precision. Location-based targeting improves relevance, conversion, and response rates.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: "Bangalore Audiences", href: "/audiences/india/bangalore" }, // Adjusted to match likely route structure or redirect
                        { label: "Mumbai Audiences", href: "/audiences/india/mumbai" },
                        { label: "Delhi NCR Audiences", href: "/audiences/india/delhi" },
                        { label: "Pune Audiences", href: "/audiences/india/pune" },
                        { label: "Hyderabad Audiences", href: "/audiences/india/hyderabad" }, // Assuming we'll build this
                        { label: "Chennai Audiences", href: "/audiences/india/chennai" }, // Assuming we'll build this
                    ].map(item => (
                        <Link key={item.label} href={item.href} className="group flex items-center justify-between p-4 bg-background border rounded-xl hover:border-primary transition-colors">
                            <span className="font-semibold">{item.label}</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                    ))}
                </div>
                <Link href="/audiences/by-location" className="text-primary font-medium hover:underline inline-flex items-center">
                    View all locations <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </Section>

            {/* 3. BROWSE BY ROLE */}
            <Section>
                <div className="mb-8">
                    <h2 className="text-3xl font-heading font-bold mb-2">Browse Audiences by Role</h2>
                    <p className="text-lg text-muted-foreground">Reach the decision-makers that influence buying. Role-led segmentation is the foundation of strong outbound and ABM.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Founders & Co-founders", href: "/audiences/by-role/founders" },
                        { label: "CEOs / CXOs", href: "/audiences/by-role/cxo-professionals" },
                        { label: "Marketing Leaders", href: "/audiences/by-role/marketing-managers" },
                        { label: "Sales Leaders", href: "/audiences/by-role/sales-heads" },
                        { label: "HR & Talent Leaders", href: "/audiences/by-role/hr-managers" },
                        { label: "CTOs & Engineering", href: "/audiences/by-role/cto" },
                        { label: "Finance Leaders", href: "/audiences/by-role/finance-leaders" },
                        { label: "Product Managers", href: "/audiences/by-role/product-managers" },
                    ].map(item => (
                        <Link key={item.label} href={item.href} className="flex items-center p-4 bg-muted/10 border rounded-lg hover:bg-muted/20 transition-colors">
                            <Briefcase className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm font-semibold">{item.label}</span>
                        </Link>
                    ))}
                </div>
                <Link href="/audiences/by-role" className="text-primary font-medium hover:underline inline-flex items-center">
                    View all roles <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </Section>

            {/* 4. BROWSE BY INDUSTRY (Placeholder content as requested) */}
            <Section className="bg-muted/30">
                <div className="mb-8">
                    <h2 className="text-3xl font-heading font-bold mb-2">Browse Audiences by Industry</h2>
                    <p className="text-lg text-muted-foreground">Segment by vertical for better product-market fit.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {/* Using placeholders /audiences/ for now as specific industry pages aren't main task yet, but keeping structure */}
                    {["IT & Software", "Healthcare & Hospitals", "Manufacturing", "Real Estate", "Financial Services", "Education"].map(ind => (
                        <div key={ind} className="p-4 bg-background border rounded-xl opacity-75 hover:opacity-100 cursor-pointer transition-opacity">
                            <span className="font-semibold">{ind}</span>
                        </div>
                    ))}
                </div>
                <div className="text-muted-foreground text-sm">
                    (Full Industry Index Coming Soon)
                </div>
            </Section>

            {/* 5. HIGH INTENT COMBINATIONS */}
            <Section>
                <h2 className="text-3xl font-heading font-bold mb-6">High-Intent Audience Combinations</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {[
                        { label: "HR Managers in Bangalore", href: "/audiences/india/bangalore/hr-managers" },
                        { label: "Founders in Mumbai", href: "/audiences/india/mumbai/founders" },
                        { label: "Marketing Leaders in Delhi", href: "/audiences/india/delhi/marketing-managers" },
                        { label: "CTOs in Pune", href: "/audiences/india/pune/cto" },
                        { label: "Sales Leaders in Hyderabad", href: "/audiences/india/hyderabad/sales-heads" }, // Assuming slug logic
                        { label: "Finance Leaders in Chennai", href: "/audiences/india/chennai/finance-leaders" }, // Assuming slug logic
                    ].map(item => (
                        <Link key={item.label} href={item.href} className="group p-5 border rounded-xl hover:shadow-md transition-all flex justify-between items-center">
                            <span className="font-bold">{item.label}</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                    ))}
                </div>
            </Section>

            {/* 6. HOW TO USE */}
            <Section className="bg-primary/5 border-y">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-heading font-bold mb-8 text-center">How to Use These Audiences</h2>
                    <div className="grid md:grid-cols-5 gap-4">
                        {[
                            { step: 1, text: "Pick a locations" },
                            { step: 2, text: "Pick a role" },
                            { step: 3, text: "Validate with intent" },
                            { step: 4, text: "Use our targeting guidance" },
                            { step: 5, text: "Activate via campaigns" },
                        ].map(s => (
                            <div key={s.step} className="text-center">
                                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3">
                                    {s.step}
                                </div>
                                <p className="text-sm font-medium">{s.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link href="/activation">
                            <Button variant="outline">Learn activation workflows</Button>
                        </Link>
                    </div>
                </div>
            </Section>

            {/* 7. FAQ */}
            <Section>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-heading font-bold mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "What is an “audience page”?", a: "An audience page is a structured profile of a business segment defined by role, location, and context—built to support targeting and messaging decisions." },
                            { q: "Should I start with role or city?", a: "Start with role if your product is function-specific (HR, Finance, Marketing). Start with city if your GTM is geo-led (regional sales, local services)." },
                            { q: "Do these pages contain personal data?", a: "Audience pages focus on segment intelligence and targeting logic. Sensitive personal data is not published publicly." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-card p-6 rounded-xl border">
                                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* FINAL CTA */}
            <Section className="text-center pt-0 pb-20">
                <h2 className="text-3xl font-heading font-bold mb-8">Explore audiences and build campaigns with clarity</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/audiences/by-location"><Button variant="default" size="lg">Browse by Location</Button></Link>
                    <Link href="/audiences/by-role"><Button variant="outline" size="lg">Browse by Role</Button></Link>
                    <Link href="/datasets"><Button variant="outline" size="lg">Browse Datasets</Button></Link>
                </div>
            </Section>
        </div>
    );
}
