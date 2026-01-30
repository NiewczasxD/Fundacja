"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  slug: string;
  image?: string;
}

const ITEMS_PER_PAGE = 3;

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data); // kolejność z API (ustawiana w panelu admin)
      } catch (error) {
        console.error("Failed to fetch news:", error);
        const staticNews = await import("@/data/news");
        setNews(staticNews.news as any);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("aktualnosci")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="aktualnosci"
      className="section-padding bg-gray-50"
      aria-labelledby="aktualnosci-heading"
    >
      <div className="container-custom">
        <h2
          id="aktualnosci-heading"
          className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        >
          Aktualności
        </h2>
        {loading ? (
          <div className="text-center">Ładowanie aktualności...</div>
        ) : news.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paginatedNews.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">[Zdjęcie]</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <time
                      dateTime={item.date}
                      className="text-sm text-gray-500 block mb-2"
                    >
                      {new Date(item.date).toLocaleDateString("pl-PL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="text-xl font-semibold text-secondary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/aktualnosci/${item.slug}`}
                      className="text-primary hover:text-primary-dark font-semibold focus:outline-none focus:ring-0 rounded"
                      aria-label={`Czytaj więcej: ${item.title}`}
                      onClick={(e) => (e.currentTarget as HTMLAnchorElement).blur()}
                    >
                      Czytaj więcej →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-secondary hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-0"
                  aria-label="Poprzednia strona"
                >
                  Poprzednia
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePageChange(p)}
                      className={`px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-0 ${
                        currentPage === p
                          ? "bg-primary text-white border-primary"
                          : "border-gray-300 text-secondary hover:bg-gray-100"
                      }`}
                      aria-label={`Strona ${p}`}
                      aria-current={currentPage === p ? "page" : undefined}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-secondary hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-0"
                  aria-label="Następna strona"
                >
                  Następna
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-700">
            Wkrótce pojawią się tutaj aktualności.
          </p>
        )}
      </div>
    </section>
  );
}
