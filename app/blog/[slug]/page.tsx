import { BLOG_POSTS } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} — BuyDatabase.ai Blog`,
        description: post.description,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-muted/10">
                <Container className="py-8 md:py-12">
                    <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1 bg-primary/5 text-primary px-2 py-1 rounded-md">
                                <Tag className="h-3 w-3" />
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.publishedAt}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                            {post.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {post.description}
                        </p>
                    </div>
                </Container>
            </div>

            {/* Content */}
            <Section className="py-12 md:py-20">
                <div className="max-w-3xl mx-auto">
                    <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
                        {post.content}
                    </article>

                    <div className="mt-16 pt-8 border-t">
                        <h3 className="text-lg font-bold mb-4">Ready to put this into action?</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/datasets">
                                <Button size="lg">Explore Datasets</Button>
                            </Link>
                            <Link href="/audiences">
                                <Button size="lg" variant="outline">Browse Audiences</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
