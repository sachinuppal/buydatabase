
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Database } from "lucide-react";
import { FOOTER_NAV } from "@/data/navigation";

export function Footer() {
    return (
        <footer className="bg-muted/10 border-t pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

                    {/* Section 1: About (Double width on mobile if needed, but keeping standard grid for cleanliness) */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <Database className="h-6 w-6 text-primary" />
                            <span className="font-heading font-bold text-lg">BuyDatabase.ai</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {FOOTER_NAV.about.desc}
                        </p>
                    </div>

                    {/* Section 2: Audiences */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-foreground mb-4">Audiences</h3>
                        <ul className="space-y-2 text-sm">
                            {FOOTER_NAV.audiences.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 3: Datasets */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-foreground mb-4">Datasets</h3>
                        <ul className="space-y-2 text-sm">
                            {FOOTER_NAV.datasets.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 4: Platform */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-foreground mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm">
                            {FOOTER_NAV.platform.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 5: Resources */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-foreground mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            {FOOTER_NAV.resources.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 6: Trust */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-foreground mb-4">Trust</h3>
                        <ul className="space-y-2 text-sm">
                            {FOOTER_NAV.compliance.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} BuyDatabase.ai. All rights reserved.</p>
                    <div className="mt-2 md:mt-0 px-3 py-1 bg-muted rounded-full">
                        Sensitive personal data is not publicly exposed.
                    </div>
                </div>
            </Container>
        </footer>
    );
}
