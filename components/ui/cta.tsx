
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
    className?: string;
}

export function CTA({
    title = "Ready to Activate This Audience?",
    description = "Stop relying on cold, unverified lists. Launch precision campaigns with BuyDatabase.ai today.",
    buttonText = "Run a Campaign",
    href = "/contact",
    className,
}: CTAProps) {
    return (
        <section className={cn("py-16 md:py-24 bg-muted/30 border-t", className)}>
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-3xl bg-secondary border shadow-sm">
                    <div className="space-y-3 max-w-2xl">
                        <h2 className="text-3xl font-heading font-bold tracking-tight">{title}</h2>
                        <p className="text-lg text-muted-foreground">{description}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <Link href={href}>
                            <Button size="xl" variant="premium" className="group">
                                {buttonText}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
