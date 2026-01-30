export interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export const news: NewsItem[] = [
  {
    title: "[Tytuł aktualności 1]",
    excerpt: "[Krótki opis aktualności - co się wydarzyło, jakie są najważniejsze informacje]",
    date: "2024-01-15",
    slug: "aktualnosc-1",
  },
  {
    title: "[Tytuł aktualności 2]",
    excerpt: "[Krótki opis aktualności]",
    date: "2024-01-10",
    slug: "aktualnosc-2",
  },
  {
    title: "[Tytuł aktualności 3]",
    excerpt: "[Krótki opis aktualności]",
    date: "2024-01-05",
    slug: "aktualnosc-3",
  },
];
