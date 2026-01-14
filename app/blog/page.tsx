import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-posts';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export const metadata: Metadata = {
    title: "Blog — BuyDatabase.ai",
    description: "Insights on audience building, data activation, compliance, outbound strategy, and segmentation—built for modern revenue teams.",
};

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Blog"
                subheading="Short, practical guides on how to build and activate audiences responsibly—without guesswork."
            />

            <Section>
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {BLOG_POSTS.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group block bg-card border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md font-medium">
                                            <Tag className="h-3 w-3" />
                                            {post.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {post.publishedAt}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center text-primary font-medium text-sm">
                                        Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center py-16 border-t">
                        <h2 className="text-2xl font-bold mb-4">Need help applying these strategies?</h2>
                        <p className="text-muted-foreground mb-8">Start by finding the right audience for your next campaign.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/datasets"><Button size="lg">Browse Datasets</Button></Link>
                            <Link href="/audiences"><Button size="lg" variant="outline">Explore Audiences</Button></Link>
                        </div>
                    </div>

                </div>
            </Section>
        </div>
    )
}
