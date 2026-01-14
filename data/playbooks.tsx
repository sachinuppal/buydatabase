import React from 'react';

export interface Playbook {
    channel: 'email' | 'linkedin';
    audience: string; // This corresponds to the role slug (e.g., 'hr-managers-india', 'it-leaders-usa')
    title: string;
    description: string;
    content: React.ReactNode;
}

export const PLAYBOOKS: Playbook[] = [
    {
        channel: 'email',
        audience: 'hr-managers-india',
        title: 'How to Cold Email HR Managers in India',
        description: 'Templates, subject lines, and timing strategies for high response rates.',
        content: (
            <>
                <p className="lead text-xl text-muted-foreground mb-8">
                    Cold emailing HR managers in India is not about clever copy—it’s about <strong>respecting context, hierarchy, and workload</strong>. This playbook shows how to do it without sounding spammy, salesy, or tone-deaf.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. Understand the Indian HR Context</h2>
                <p className="mb-4">HR managers in India are:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Overloaded with hiring + admin + compliance</li>
                    <li>Often gatekeepers, not final decision-makers</li>
                    <li>Extremely sensitive to irrelevant outreach</li>
                </ul>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-900">
                        <p className="font-bold text-green-700 dark:text-green-400 mb-2">What Works</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                            <li>Clear relevance to their role today</li>
                            <li>Respectful, professional tone</li>
                            <li>Short, skimmable emails</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900">
                        <p className="font-bold text-red-700 dark:text-red-400 mb-2">What Fails</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                            <li>Overly casual tone ("Hope you're doing great!!!")</li>
                            <li>Long storytelling emails</li>
                            <li>Aggressive follow-ups</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Audience Definition That Converts</h2>
                <div className="bg-muted/30 p-6 rounded-xl border mb-6">
                    <h3 className="font-bold mb-3">Ideal Target Segment</h3>
                    <ul className="space-y-2 mb-4">
                        <li><strong>Role:</strong> HR Manager, HRBP, Talent Manager, Head of HR</li>
                        <li><strong>Company size:</strong> 100–2,000 employees</li>
                        <li><strong>Industry:</strong> IT services, SaaS, GCCs, startups</li>
                        <li><strong>Geography:</strong> Tier 1 & 2 cities (Bangalore, Pune, Hyderabad, NCR, Chennai)</li>
                    </ul>
                    <h3 className="font-bold mb-2">Refinement Signals</h3>
                    <ul className="list-disc pl-6">
                        <li>Actively hiring (careers page, LinkedIn jobs)</li>
                        <li>Recently funded or expanding</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Subject Lines That Get Opened</h2>
                <p className="mb-4">Avoid gimmicks. Use <strong>clarity + relevance</strong>.</p>

                <h3 className="font-semibold mt-4 mb-2">Straightforward</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>“Quick question on hiring for {'{role}'}”</li>
                    <li>“Regarding {'{company}'}’s hiring plans”</li>
                    <li>“HR query – {'{company name}'}”</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">Contextual</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>“Saw you’re hiring {'{role}'} – quick note”</li>
                    <li>“Talent sourcing for growing teams like yours”</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Cold Email Templates (Battle-Tested)</h2>

                <div className="space-y-6">
                    <div className="bg-card border p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-2 text-primary">Template 1: Hiring-Relevant (Best for Active Hiring)</h3>
                        <p className="text-sm text-muted-foreground mb-4 font-mono bg-muted p-2 rounded">Subject: Hiring for {'{role}'} at {'{company}'}?</p>
                        <div className="prose-sm">
                            <p>Hi {'{First Name}'},</p>
                            <p className="mt-2">Noticed {'{company}'} is currently hiring for {'{role/team}'}.</p>
                            <p className="mt-2">Many HR teams at similar-sized IT companies tell us sourcing the <em>right-fit candidates</em> quickly is becoming harder as hiring volumes increase.</p>
                            <p className="mt-2">We work with teams to help them reach <strong>pre-qualified talent pools</strong> based on role, experience, and location—without relying only on job boards.</p>
                            <p className="mt-2">Would it make sense to explore this for {'{company}'}?</p>
                            <p className="mt-2">Happy to share details if useful.</p>
                            <p className="mt-2">Best regards,<br />{'{Your Name}'}</p>
                        </div>
                    </div>

                    <div className="bg-card border p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-2 text-primary">Template 2: Cost & Efficiency Angle</h3>
                        <p className="text-sm text-muted-foreground mb-4 font-mono bg-muted p-2 rounded">Subject: Reducing hiring turnaround time</p>
                        <div className="prose-sm">
                            <p>Hi {'{First Name}'},</p>
                            <p className="mt-2">Quick note—HR teams at growing IT companies often struggle with long hiring cycles and high dependency on agencies.</p>
                            <p className="mt-2">We’ve helped teams access <strong>ready-to-reach talent datasets</strong> aligned to specific roles and experience levels, reducing sourcing time significantly.</p>
                            <p className="mt-2">Would you be open to a short call to see if this is relevant for {'{company}'}?</p>
                            <p className="mt-2">Regards,<br />{'{Your Name}'}</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Timing & Sending Strategy</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="border p-4 rounded-lg">
                        <p className="font-bold mb-2">✅ Best Days</p>
                        <p>Tuesday, Wednesday, Thursday</p>
                    </div>
                    <div className="border p-4 rounded-lg">
                        <p className="font-bold mb-2">⏰ Best Time Slots</p>
                        <ul className="text-sm">
                            <li>10:30 AM – 12:30 PM</li>
                            <li>2:30 PM – 4:30 PM</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">6. Follow-Up Sequence</h2>
                <ul className="list-decimal pl-6 mb-6 space-y-2">
                    <li><strong>Day 1:</strong> Initial email</li>
                    <li><strong>Day 4:</strong> Gentle follow-up (new angle)</li>
                    <li><strong>Day 7:</strong> Short nudge or question</li>
                    <li><strong>Day 10:</strong> Polite close</li>
                </ul>

                <div className="bg-card border p-6 rounded-xl mt-8">
                    <h3 className="text-lg font-bold mb-2">Key Principle</h3>
                    <p className="text-muted-foreground">HR managers respond to <strong>relevance + respect</strong>, not persuasion tricks.</p>
                </div>
            </>
        )
    },
    {
        channel: 'linkedin',
        audience: 'it-leaders-usa',
        title: 'Targeting IT Leaders in the USA',
        description: 'Matched Audience strategies and creative best practices for reaching CIOs and CTOs.',
        content: (
            <>
                <p className="lead text-xl text-muted-foreground mb-8">
                    LinkedIn Ads work exceptionally well in the US—<strong>if you stop treating them like Facebook ads</strong>. This playbook focuses on precision targeting and credibility-driven creatives.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. Define “IT Leaders” Precisely</h2>
                <p className="mb-4">Avoid broad titles like “IT Professional.”</p>

                <h3 className="font-semibold mt-4 mb-2">Recommended Target Roles</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>CIO / CTO</li>
                    <li>VP Engineering / Head of IT</li>
                    <li>Director of Engineering</li>
                    <li>IT Manager (mid-market only)</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">Company Filters</h3>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li><strong>Geography:</strong> USA</li>
                    <li><strong>Company size:</strong> 50–5,000 employees</li>
                    <li><strong>Industries:</strong> SaaS, Enterprise Software, IT Services, Fintech</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Matched Audiences: Your Secret Weapon</h2>

                <div className="grid gap-4 mb-8">
                    <div className="border p-4 rounded-lg">
                        <p className="font-bold mb-1">1. Account Lists (ABM)</p>
                        <p className="text-sm text-muted-foreground">Upload 100–1,000 target companies. Layer with seniority + function.</p>
                    </div>
                    <div className="border p-4 rounded-lg">
                        <p className="font-bold mb-1">2. Contact Lists</p>
                        <p className="text-sm text-muted-foreground">Existing leads, trial users, event attendees.</p>
                    </div>
                    <div className="border p-4 rounded-lg">
                        <p className="font-bold mb-1">3. Website Retargeting</p>
                        <p className="text-sm text-muted-foreground">Visitors to pricing, use-case pages, or blog readers (high intent).</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Creative Strategy That Builds Trust</h2>
                <p className="mb-4">US IT leaders don’t click hype. They click <strong>credibility</strong>.</p>

                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Problem Recognition:</strong> “Most IT leaders struggle with X once teams scale beyond Y.”</li>
                    <li><strong>Peer Validation:</strong> “How mid-market IT teams are solving {'{problem}'}”</li>
                    <li><strong>Outcome-Focused:</strong> “Reducing tool sprawl without slowing teams down”</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Ad Copy Frameworks</h2>

                <div className="space-y-6">
                    <div className="bg-card border p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-2 text-primary">Example 1: Authority-Led</h3>
                        <p className="mb-2"><strong>Headline:</strong> How IT Teams Scale Without Chaos</p>
                        <p className="mb-2"><strong>Body:</strong> Growing IT teams often face visibility and coordination issues. See how modern teams are solving this with structured data-driven workflows.</p>
                        <p className="text-sm font-medium uppercase text-muted-foreground">CTA: Read Playbook</p>
                    </div>

                    <div className="bg-card border p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-2 text-primary">Example 2: ABM-Specific</h3>
                        <p className="mb-2"><strong>Headline:</strong> Built for IT Leaders at Growing SaaS Companies</p>
                        <p className="mb-2"><strong>Body:</strong> If your IT team supports 100+ employees, this playbook breaks down how leaders manage scale, security, and efficiency.</p>
                        <p className="text-sm font-medium uppercase text-muted-foreground">CTA: Download Playbook</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Budget & Optimization Strategy</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Starting Budget:</strong> $50–$100/day per audience</li>
                    <li><strong>Optimize For:</strong> CTR (target: 0.6–1%), Cost per click, Playbook downloads</li>
                    <li><strong>Rule:</strong> Pause ads that don’t perform within 5–7 days.</li>
                </ul>

                <div className="bg-card border p-6 rounded-xl mt-8">
                    <h3 className="text-lg font-bold mb-2">Key Principle</h3>
                    <p className="text-muted-foreground">LinkedIn Ads win on <strong>clarity + credibility</strong>, not cleverness.</p>
                </div>
            </>
        )
    }
];
