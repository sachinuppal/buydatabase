
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
    heading: React.ReactNode;
    subheading?: React.ReactNode;
    align?: "left" | "center";
}

export function Hero({ heading, subheading, align = "left", className, children, ...props }: HeroProps) {
    return (
        <section className={cn("relative py-16 md:py-24 overflow-hidden border-b", className)} {...props}>
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <Container className={cn("flex flex-col gap-6", align === 'center' && "text-center items-center")}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground">
                    {heading}
                </h1>
                {subheading && (
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        {subheading}
                    </p>
                )}
                {children && (
                    <div className="mt-4 flex flex-wrap gap-4">
                        {children}
                    </div>
                )}
            </Container>
        </section>
    );
}
