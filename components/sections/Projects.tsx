"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "aktywny" | "planowany" | "zakończony";
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ITEMS_PER_PAGE = 3;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data); // kolejność z API (ustawiana w panelu admin)
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        // Fallback to static data if API fails
        const staticProjects = await import("@/data/projects");
        setProjects(staticProjects.projects as any);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("projekty")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <section
        id="projekty"
        className="section-padding bg-background"
        aria-labelledby="projekty-heading"
      >
        <div className="container-custom">
          <h2
            id="projekty-heading"
            className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
          >
            Obszary działań / Projekty
          </h2>
          <div className="text-center">Ładowanie projektów...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projekty"
      className="section-padding bg-background"
      aria-labelledby="projekty-heading"
    >
      <div className="container-custom">
        <h2
          id="projekty-heading"
          className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        >
          Obszary działań / Projekty
        </h2>
        {projects.length === 0 ? (
          <div className="text-center text-gray-500">
            Brak projektów do wyświetlenia
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          [Zdjęcie projektu]
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    {project.status && (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
                          project.status === "aktywny"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
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
        )}
      </div>
    </section>
  );
}
