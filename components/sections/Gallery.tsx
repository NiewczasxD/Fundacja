"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  projectId?: string;
}

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Funkcja do parsowania projectId z hash
  const getProjectIdFromHash = () => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash;
    const match = hash.match(/projectId=([^&]+)/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pobierz projekty
        const projectsRes = await fetch("/api/projects");
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
        
        // Pobierz zdjęcia (z filtrem po projekcie, jeśli jest wybrany)
        const url = selectedProject 
          ? `/api/gallery?projectId=${selectedProject}`
          : "/api/gallery";
        const res = await fetch(url);
        const data = await res.json();
        setGalleryImages(data);
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        const staticImages = await import("@/data/gallery");
        setGalleryImages(staticImages.galleryImages as any);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedProject]);

  // Obsługa zmiany hash w URL (gdy klikamy link z projektu)
  useEffect(() => {
    const projectId = getProjectIdFromHash();
    setSelectedProject(projectId);

    const handleHashChange = () => {
      const projectId = getProjectIdFromHash();
      setSelectedProject(projectId);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Resetuj stronę przy zmianie filtra projektu
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProject]);

  const filteredImages = galleryImages;
  const selectedProjectName = selectedProject 
    ? projects.find((p) => p.id === selectedProject)?.title 
    : null;

  // Paginacja
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Przewiń do góry galerii
    const gallerySection = document.getElementById("galeria");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img === galleryImages[selectedImage]
    );
    let newIndex: number;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    const actualIndex = galleryImages.indexOf(filteredImages[newIndex]);
    setSelectedImage(actualIndex);
  };

  return (
    <section
      id="galeria"
      className="section-padding bg-background"
      aria-labelledby="galeria-heading"
    >
      <div className="container-custom">
        <h2
          id="galeria-heading"
          className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        >
          {selectedProjectName ? `Galeria: ${selectedProjectName}` : "Galeria zdjęć"}
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Project Filter Dropdown */}
          <div className="relative">
            <label htmlFor="project-filter" className="sr-only">
              Wybierz projekt
            </label>
            <select
              id="project-filter"
              value={selectedProject || ""}
              onChange={(e) => setSelectedProject(e.target.value || null)}
              className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-10 text-secondary focus:outline-none focus:ring-0 focus:border-primary cursor-pointer min-w-[250px]"
            >
              <option value="">Wszystkie projekty</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center">Ładowanie galerii...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center text-gray-500">Brak zdjęć w galerii</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {paginatedImages.map((image, index) => {
                const globalIndex = galleryImages.indexOf(image);
                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={(e) => {
                      openLightbox(globalIndex);
                      (e.currentTarget as HTMLButtonElement).blur();
                    }}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 hover:opacity-90 transition-opacity focus:outline-none focus:ring-0"
                    aria-label={`Otwórz zdjęcie: ${image.alt}`}
                  >
                    {image.src ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">[Zdjęcie: {image.alt}]</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  type="button"
                  onClick={(e) => {
                    handlePageChange(currentPage - 1);
                    (e.currentTarget as HTMLButtonElement).blur();
                  }}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-secondary hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-0"
                  aria-label="Poprzednia strona"
                >
                  Poprzednia
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Pokaż wszystkie strony jeśli jest ich mało, lub tylko niektóre jeśli jest dużo
                    if (
                      totalPages <= 7 ||
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={(e) => {
                            handlePageChange(page);
                            (e.currentTarget as HTMLButtonElement).blur();
                          }}
                          className={`px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-0 ${
                            currentPage === page
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300 text-secondary hover:bg-gray-100"
                          }`}
                          aria-label={`Strona ${page}`}
                          aria-current={currentPage === page ? "page" : undefined}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    handlePageChange(currentPage + 1);
                    (e.currentTarget as HTMLButtonElement).blur();
                  }}
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

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Podgląd zdjęcia"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                closeLightbox();
                (e.currentTarget as HTMLButtonElement).blur();
              }}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 focus:outline-none focus:ring-0 rounded"
              aria-label="Zamknij podgląd"
            >
              &times;
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
                (e.currentTarget as HTMLButtonElement).blur();
              }}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 focus:outline-none focus:ring-0 rounded"
              aria-label="Poprzednie zdjęcie"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
                (e.currentTarget as HTMLButtonElement).blur();
              }}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 focus:outline-none focus:ring-0 rounded"
              aria-label="Następne zdjęcie"
            >
              &#8250;
            </button>
            <div className="max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
              {galleryImages[selectedImage]?.src ? (
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-lg">
                    [Zdjęcie: {galleryImages[selectedImage]?.alt}]
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
