import React from 'react';

export interface UseCase {
    slug: string;
    title: string;
    description: string;
    content: React.ReactNode;
}

export const USE_CASES: UseCase[] = [
    {
        slug: 'outbound',
        title: 'Outbound Sales: Fuel Your Cold Email and Calling Campaigns',
        description: 'Outbound sales is not dead—it’s just poorly executed. Learn how to build a system that works.',
        content: (
            <>
                <p className="mb-6 leading-relaxed">
                    Outbound sales is not dead—it’s just poorly executed.
                </p>
                <div className="bg-muted/30 p-6 rounded-xl border mb-8">
                    <p className="mb-4 font-medium">When teams say outbound “doesn’t work,” what they usually mean is:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>The targeting is weak</li>
                        <li>The timing is off</li>
                        <li>The messaging is generic</li>
                        <li>The data is outdated</li>
                    </ul>
                    <p className="mt-4 font-semibold">Great outbound is a <strong>system</strong>, not a script.</p>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Why Most Outbound Fails</h2>
                <p className="mb-4">Traditional outbound breaks because teams optimize for <strong>volume</strong>, not <strong>relevance</strong>:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Large, unsegmented lists</li>
                    <li>Same message sent to everyone</li>
                    <li>Sales reps guessing who to contact</li>
                    <li>No signal-based prioritization</li>
                </ul>
                <p className="mb-6">The result is predictable: low reply rates, burnt domains, and frustrated teams.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Start With Sales Reality, Not Marketing Personas</h2>
                <p className="mb-4">Outbound works best when built from the ground up:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Who actually signs the deal?</li>
                    <li>Who influences the decision?</li>
                    <li>Who blocks it?</li>
                </ul>
                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary mb-6">
                    <p className="mb-2 text-xs uppercase tracking-wider font-bold text-primary">Targeting Example</p>
                    <p className="italic">“Founders at B2B SaaS companies between 10–50 employees who are still founder-led in sales.”</p>
                </div>
                <p className="mb-6">Precision is the multiplier.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Build Signal-Driven Targeting</h2>
                <p className="mb-4">Modern outbound isn’t cold—it’s <em>contextual</em>.</p>
                <p className="mb-4 font-semibold">High-intent signals include:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Hiring for revenue or tech roles</li>
                    <li>Recent funding or expansion</li>
                    <li>New leadership hires</li>
                    <li>Product launches</li>
                    <li>Increased website activity</li>
                </ul>
                <p className="mb-6">Layering these signals onto your contact data dramatically improves outcomes.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Match Messaging to the Buying Moment</h2>
                <p className="mb-4">The biggest mistake in outbound messaging is talking about <strong>your product</strong> instead of <strong>their problem</strong>.</p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Effective Messages:</h3>
                        <ul className="list-disc pl-4 text-sm space-y-1">
                            <li>Reference a specific context</li>
                            <li>Address a real business challenge</li>
                            <li>Offer insight, not a pitch</li>
                        </ul>
                    </div>
                    <div className="border p-4 rounded-lg bg-muted/20">
                        <h3 className="font-bold mb-2">Goal:</h3>
                        <p className="text-sm">Cold outreach should sound like help—not interruption.</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Orchestrate Email + Calling Together</h2>
                <p className="mb-4">Cold email and cold calling work best when coordinated:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Email builds familiarity</li>
                    <li>Calls create urgency</li>
                    <li>Voicemails reinforce relevance</li>
                </ul>
                <p className="mb-6">A call after a relevant email is no longer “cold”—it’s expected.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Measure What Actually Matters</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                        <p className="font-bold text-red-700 dark:text-red-400 mb-1">Don't Measure</p>
                        <ul className="text-sm list-disc pl-4">
                            <li>Emails sent</li>
                            <li>Calls made</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                        <p className="font-bold text-green-700 dark:text-green-400 mb-1">Do Measure</p>
                        <ul className="text-sm list-disc pl-4">
                            <li>Conversations started</li>
                            <li>Meetings booked</li>
                            <li>Opportunities created</li>
                        </ul>
                    </div>
                </div>
                <p className="mb-6 font-medium">Outbound is a <strong>pipeline creation engine</strong>, not a volume game.</p>

                <div className="bg-card border p-6 rounded-xl mt-8">
                    <h3 className="text-lg font-bold mb-2">Key Insight</h3>
                    <p className="text-muted-foreground">Outbound works when you treat data as intelligence—not inventory.</p>
                </div>
            </>
        )
    },
    {
        slug: 'abm',
        title: 'Account Based Marketing (ABM): Target Key Accounts With Precision',
        description: 'ABM is not outbound with fewer accounts. It’s a fundamentally different go-to-market motion.',
        content: (
            <>
                <p className="mb-6 leading-relaxed">
                    ABM is not outbound with fewer accounts. It’s a fundamentally different go-to-market motion built around <strong>focus, coordination, and relevance</strong>.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">What ABM Really Means</h2>
                <p className="mb-4">True ABM starts with a simple shift:</p>
                <div className="bg-primary/5 p-6 rounded-xl text-center mb-6">
                    <p className="text-lg font-medium">“Which companies do we want to win?”</p>
                    <p className="text-sm text-muted-foreground my-2">instead of</p>
                    <p className="text-lg font-medium">“Who might respond?”</p>
                </div>
                <p className="mb-6">ABM flips demand generation into <strong>demand capture</strong>.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Identify High-Value Accounts</h2>
                <p className="mb-4">High-value accounts are not always the biggest. Look for:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Strong product fit</li>
                    <li>Shorter sales cycles</li>
                    <li>Internal champions</li>
                    <li>Expansion potential</li>
                </ul>
                <p className="mb-6">The best ABM accounts are those you can win—not just impress.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Map the Buying Committee</h2>
                <p className="mb-4">Enterprise and mid-market deals are won by <strong>groups</strong>, not individuals. You must identify:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-muted p-3 rounded text-center text-sm font-medium">Economic Buyer</div>
                    <div className="bg-muted p-3 rounded text-center text-sm font-medium">Technical Validator</div>
                    <div className="bg-muted p-3 rounded text-center text-sm font-medium">End User</div>
                    <div className="bg-muted p-3 rounded text-center text-sm font-medium">Internal Champion</div>
                </div>
                <p className="mb-6">Data enables visibility into all stakeholders—not just one title.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Create Account-Specific Narratives</h2>
                <p className="mb-4">ABM messaging should answer:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Why this account?</li>
                    <li>Why now?</li>
                    <li>Why you?</li>
                </ul>
                <p className="mb-6">Generic “personalization” is not enough. ABM requires <strong>account-level relevance</strong>.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Coordinate Channels for Impact</h2>
                <p className="mb-4">Effective ABM uses:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Targeted outbound</li>
                    <li>LinkedIn ads</li>
                    <li>Retargeting</li>
                    <li>Sales follow-ups</li>
                </ul>
                <p className="mb-6">Each touch reinforces the same story from a different angle.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Track Account Progress, Not Leads</h2>
                <p className="mb-4">ABM success metrics include:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Account engagement</li>
                    <li>Stakeholder coverage</li>
                    <li>Meetings per account</li>
                    <li>Pipeline velocity</li>
                </ul>
                <p className="mb-6">ABM is about <strong>depth</strong>, not breadth.</p>

                <div className="bg-card border p-6 rounded-xl mt-8">
                    <h3 className="text-lg font-bold mb-2">Key Insight</h3>
                    <p className="text-muted-foreground">ABM works best when sales and marketing operate as one team, one list, one story.</p>
                </div>
            </>
        )
    },
    {
        slug: 'recruitment',
        title: 'Recruitment: Find Passive Talent and Fill Roles Faster',
        description: 'The best candidates are rarely looking for jobs. Modern recruitment is outbound sales—except the product is the role.',
        content: (
            <>
                <p className="mb-6 leading-relaxed">
                    The best candidates are rarely looking for jobs. Modern recruitment is outbound sales—except the product is the role.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Why Passive Talent Wins</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Perform better</li>
                            <li>Stay longer</li>
                            <li>Have stronger context</li>
                            <li>Are less influenced by noise</li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-muted/20 rounded-lg">
                        <p className="text-center font-medium italic">But they must be <strong>approached correctly</strong>.</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Define the Ideal Candidate Precisely</h2>
                <p className="mb-4">Stop hiring “roles.” Start hiring <strong>profiles</strong>.</p>
                <p className="mb-4">Strong candidate definitions include:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Career trajectory</li>
                    <li>Company stage experience</li>
                    <li>Skill depth vs breadth</li>
                    <li>Cultural fit indicators</li>
                </ul>
                <p className="mb-6">The more specific the profile, the higher the response rate.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Build Role-Based Talent Pools</h2>
                <p className="mb-4">Instead of one-off searches, build:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Engineering talent pools</li>
                    <li>Sales leadership benches</li>
                    <li>Design and product shortlists</li>
                </ul>
                <p className="mb-6">This turns hiring into a repeatable system.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Outreach That Respects Candidates</h2>
                <p className="mb-4">Effective recruitment outreach:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Acknowledges their experience</li>
                    <li>Explains why they’re relevant</li>
                    <li>Avoids pressure</li>
                    <li>Offers exploration, not selling</li>
                </ul>
                <p className="mb-6">Respect increases replies.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Reduce Time-to-Hire With Better Data</h2>
                <p className="mb-4">Data-driven sourcing:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Eliminates irrelevant profiles</li>
                    <li>Improves interview quality</li>
                    <li>Reduces recruiter workload</li>
                    <li>Speeds up decision-making</li>
                </ul>
                <p className="mb-6 font-medium">Hiring speed is a competitive advantage.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Integrate Data Into Hiring Systems</h2>
                <p className="mb-4">Your talent data should flow into:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>ATS platforms</li>
                    <li>CRM-style candidate trackers</li>
                    <li>Referral workflows</li>
                </ul>
                <p className="mb-6">Unstructured data creates hiring chaos.</p>

                <div className="bg-card border p-6 rounded-xl mt-8">
                    <h3 className="text-lg font-bold mb-2">Key Insight</h3>
                    <p className="text-muted-foreground">Recruitment success is driven by relevance, timing, and respect.</p>
                </div>
            </>
        )
    },
    {
        slug: 'market-research',
        title: 'Market Research: Analyze Markets and Competitor Landscapes',
        description: 'Great strategy starts with clarity. Market research is not about reports—it’s about decisions.',
        content: (
            <>
                <p className="mb-6 leading-relaxed">
                    Great strategy starts with clarity. Market research is not about reports—it’s about <strong>decisions</strong>.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Why Most Market Research Is Wasted</h2>
                <p className="mb-4">Common mistakes:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Over-reliance on generic reports</li>
                    <li>No connection to real customers</li>
                    <li>Too much data, not enough insight</li>
                </ul>
                <p className="mb-6 font-medium">Good research answers <em>specific business questions</em>.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Define the Question Before the Data</h2>
                <p className="mb-4">Start with clarity:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Should we enter this market?</li>
                    <li>Who are the real competitors?</li>
                    <li>How is the market structured?</li>
                    <li>Where is pricing power?</li>
                </ul>
                <p className="mb-6">Without a question, data is noise.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Segment the Market Properly</h2>
                <p className="mb-4">Markets are rarely homogeneous. Segment by:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Geography</li>
                    <li>Company size</li>
                    <li>Industry vertical</li>
                    <li>Maturity stage</li>
                </ul>
                <p className="mb-6">Segmentation reveals hidden opportunities.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Map the Competitive Landscape</h2>
                <p className="mb-4">True competitor analysis goes beyond websites. Analyze:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Target customers</li>
                    <li>Positioning language</li>
                    <li>Pricing signals</li>
                    <li>Hiring patterns</li>
                    <li>Growth momentum</li>
                </ul>
                <p className="mb-6">Competitors leave data footprints everywhere.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Identify White Spaces</h2>
                <p className="mb-4">The goal of market research is not validation—it’s <strong>advantage</strong>.</p>
                <p className="mb-4">White spaces often appear where:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Customers complain</li>
                    <li>Solutions are over-engineered</li>
                    <li>Pricing is misaligned</li>
                    <li>Use cases are underserved</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Turn Research Into Action</h2>
                <p className="mb-4">Research should directly inform:</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Product roadmap</li>
                    <li>GTM strategy</li>
                    <li>Pricing decisions</li>
                    <li>Sales narratives</li>
                </ul>
                <p className="mb-6">If research doesn’t change behavior, it failed.</p>

                <div className="bg-card border p-6 rounded-xl mt-8">
                    <h3 className="text-lg font-bold mb-2">Key Insight</h3>
                    <p className="text-muted-foreground">Market research is only valuable when it drives sharper decisions.</p>
                </div>
            </>
        )
    }
];
