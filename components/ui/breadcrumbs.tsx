
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/ui/container";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 2, // 1 is home
            "name": item.label,
            "item": `https://buydatabase.ai${item.href}`
        }))
    };

    // Prepend Home
    jsonLd.itemListElement.unshift({
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://buydatabase.ai/"
    });

    return (
        <div className="border-b bg-muted/10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Container className="py-3">
                <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
                    <Link href="/" className="flex items-center hover:text-foreground transition-colors">
                        <Home className="h-4 w-4 mr-2" />
                        <span className="sr-only">Home</span>
                    </Link>

                    {items.map((item, index) => (
                        <div key={item.href} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
                            <Link
                                href={item.href}
                                className={`hover:text-foreground transition-colors ${index === items.length - 1 ? "font-medium text-foreground" : ""
                                    }`}
                                aria-current={index === items.length - 1 ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            </Container>
        </div>
    );
}
