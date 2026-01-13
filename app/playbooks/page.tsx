
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
    title: 'Campaign Playbooks | BuyDatabase.ai',
    description: 'Step-by-step guides on how to activate specific audiences via Email, LinkedIn, and Ads.'
}

export default function PlaybooksIndexPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero heading="Campaign Playbooks" subheading="Tactical guides to converting B2B audiences into pipeline." />

            <Section>
                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/playbooks/email/hr-managers-india" className="group block p-6 border rounded-xl hover:border-primary transition-colors">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <BookOpen className="h-5 w-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Email Outreach</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                            How to Cold Email HR Managers in India
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Templates, subject lines, and timing strategies for high response rates.
                        </p>
                        <div className="flex items-center text-sm font-medium text-primary">
                            Read Playbook <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                    </Link>

                    <Link href="/playbooks/linkedin/it-leaders-usa" className="group block p-6 border rounded-xl hover:border-primary transition-colors">
                        <div className="flex items-center gap-3 mb-4 text-secondary-foreground">
                            <BookOpen className="h-5 w-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">LinkedIn Ads</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                            Targeting IT Leaders in the USA
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Matched Audience strategies and creative best practices.
                        </p>
                        <div className="flex items-center text-sm font-medium text-primary">
                            Read Playbook <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                    </Link>
                </div>
            </Section>
        </div>
    )
}
