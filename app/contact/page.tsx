
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
    title: "Contact BuyDatabase.ai — Sales, Support & Partnerships",
    description: "Contact BuyDatabase.ai for dataset recommendations, custom requests, pricing support, or partnerships. We respond fast.",
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Contact"
                subheading="Have a question about a dataset, need a custom audience, or want help selecting the right data for your use case? Send a message—our team will guide you."
            />

            <Section>
                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

                    {/* Contact Options */}
                    <div className="space-y-12">

                        <div className="flex gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg h-fit">
                                <MessageSquare className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">General inquiries</h3>
                                <p className="text-muted-foreground">
                                    Use the form for questions about datasets, audiences, compliance, or platform access.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg h-fit">
                                <Briefcase className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Custom dataset requests</h3>
                                <p className="text-muted-foreground">
                                    If you need a specific city/role/industry combination or a non-standard schema, tell us what you’re trying to achieve and we’ll propose the fastest path.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg h-fit">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Support</h3>
                                <p className="text-muted-foreground">
                                    If you already purchased data and need help downloading, formatting, or activating it, mention your order ID.
                                </p>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-6 rounded-xl border">
                            <h4 className="font-bold mb-4">Prefer to browse first?</h4>
                            <div className="flex gap-4">
                                <Link href="/datasets" className="text-primary hover:underline">Datasets &rarr;</Link>
                                <Link href="/audiences" className="text-primary hover:underline">Audiences &rarr;</Link>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="bg-card border rounded-2xl p-8 shadow-sm">
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name <span className="text-muted-foreground font-normal">(So we know what to call you)</span></label>
                                    <input id="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Work email <span className="text-muted-foreground font-normal">(So we can respond securely)</span></label>
                                    <input id="email" type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="john@company.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium">Company / Website <span className="text-muted-foreground font-normal">(Helps us recommend datasets)</span></label>
                                <input id="company" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="acme.com" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="goal" className="text-sm font-medium">Goal</label>
                                    <select id="goal" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                        <option value="">Select...</option>
                                        <option value="outbound">Outbound Sales</option>
                                        <option value="hiring">Recruitment / Hiring</option>
                                        <option value="research">Market Research</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="timeline" className="text-sm font-medium">Timeline</label>
                                    <select id="timeline" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                        <option value="">Select...</option>
                                        <option value="this-week">This week</option>
                                        <option value="this-month">This month</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="audience" className="text-sm font-medium">Audience you need <span className="text-muted-foreground font-normal">(City, role, industry)</span></label>
                                <input id="audience" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="e.g. CTOs in Bangalore" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea id="message" className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Describe your requirements..." />
                            </div>

                            <Button type="submit" className="w-full">Send Message</Button>

                            <p className="text-xs text-muted-foreground text-center">
                                We never publish or sell your inquiry details. Messages are handled privately. See our <Link href="/privacy-policy" className="underline">privacy policy</Link>.
                            </p>
                        </form>
                    </div>

                </div>
            </Section>
        </div>
    )
}
