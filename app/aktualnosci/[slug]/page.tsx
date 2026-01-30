import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getNews } from "@/lib/db";

export const dynamic = "force-dynamic";

function normalizeSlug(s: string) {
  try {
    return decodeURIComponent(s).trim();
  } catch {
    return s.trim();
  }
}

function getNewsItemBySlug(slug: string) {
  try {
    const news = getNews();
    const normalized = normalizeSlug(slug);
    return (
      news.find((item) => normalizeSlug(item.slug) === normalized) ||
      news.find((item) => item.slug === slug) ||
      null
    );
  } catch (error) {
    console.error("Failed to fetch news item:", error);
    return null;
  }
}

export default async function NewsItemPage({
  params,
}: {
  params: { slug: string };
}) {
  const newsItem = getNewsItemBySlug(params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-12">
        <Link
          href="/#aktualnosci"
          className="inline-flex items-center text-primary hover:text-secondary mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Powrót do aktualności
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
          {newsItem.image && (
            <div className="relative h-96 w-full overflow-hidden bg-gray-200">
              <Image
                src={newsItem.image}
                alt={newsItem.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
          
          <div className="p-8">
            <time
              dateTime={newsItem.date}
              className="text-sm text-gray-500 block mb-4"
            >
              {new Date(newsItem.date).toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              {newsItem.title}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              {newsItem.content ? (
                <div
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                  {newsItem.excerpt}
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
