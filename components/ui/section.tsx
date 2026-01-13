
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export function Section({ className, title, children, ...props }: SectionProps) {
    return (
        <section className={cn("py-12 md:py-16", className)} {...props}>
            <Container>
                {title && (
                    <h2 className="text-3xl font-heading font-bold mb-8 md:mb-10 text-foreground">
                        {title}
                    </h2>
                )}
                {children}
            </Container>
        </section>
    );
}
