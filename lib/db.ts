import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "aktywny" | "planowany" | "zakończony";
  image?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  projectId?: string; // ID projektu, z którym jest powiązane zdjęcie
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  slug: string;
  image?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BannerImage {
  id: string;
  src: string;
  order: number;
  createdAt: string;
}

export interface Admin {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

// Helper functions to read/write JSON files
function readJsonFile<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

function writeJsonFile<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Projects
export function getProjects(): Project[] {
  const raw = readJsonFile<Project>("projects.json");
  return raw.sort((a, b) => {
    const oa = a.order ?? 999999;
    const ob = b.order ?? 999999;
    if (oa !== ob) return oa - ob;
    return (a.createdAt || "").localeCompare(b.createdAt || "");
  });
}

export function getProject(id: string): Project | undefined {
  const projects = getProjects();
  return projects.find((p) => p.id === id);
}

export function createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Project {
  const raw = readJsonFile<Project>("projects.json");
  const maxOrder = raw.length ? Math.max(0, ...raw.map((p) => p.order ?? 0)) : -1;
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    order: maxOrder + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  raw.push(newProject);
  writeJsonFile("projects.json", raw);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = readJsonFile<Project>("projects.json");
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeJsonFile("projects.json", projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = readJsonFile<Project>("projects.json");
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  writeJsonFile("projects.json", filtered);
  return true;
}

/** Ustawia kolejność projektów. orderedIds – tablica id w docelowej kolejności. */
export function reorderProjects(orderedIds: string[]): void {
  const projects = readJsonFile<Project>("projects.json");
  const orderMap = Object.fromEntries(orderedIds.map((id, i) => [id, i]));
  projects.forEach((p) => {
    if (p.id in orderMap) (p as Project).order = orderMap[p.id];
  });
  writeJsonFile("projects.json", projects);
}

// Team Members
export function getTeamMembers(): TeamMember[] {
  return readJsonFile<TeamMember>("team.json");
}

export function getTeamMember(id: string): TeamMember | undefined {
  const members = getTeamMembers();
  return members.find((m) => m.id === id);
}

export function createTeamMember(member: Omit<TeamMember, "id" | "createdAt" | "updatedAt">): TeamMember {
  const members = getTeamMembers();
  const newMember: TeamMember = {
    ...member,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  members.push(newMember);
  writeJsonFile("team.json", members);
  return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
  const members = getTeamMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;
  
  members[index] = {
    ...members[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeJsonFile("team.json", members);
  return members[index];
}

export function deleteTeamMember(id: string): boolean {
  const members = getTeamMembers();
  const filtered = members.filter((m) => m.id !== id);
  if (filtered.length === members.length) return false;
  writeJsonFile("team.json", filtered);
  return true;
}

// Gallery Images
export function getGalleryImages(): GalleryImage[] {
  return readJsonFile<GalleryImage>("gallery.json");
}

export function createGalleryImage(image: Omit<GalleryImage, "id" | "createdAt">): GalleryImage {
  const images = getGalleryImages();
  const newImage: GalleryImage = {
    ...image,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  images.push(newImage);
  writeJsonFile("gallery.json", images);
  return newImage;
}

export function deleteGalleryImage(id: string): boolean {
  const images = getGalleryImages();
  const filtered = images.filter((img) => img.id !== id);
  if (filtered.length === images.length) return false;
  writeJsonFile("gallery.json", filtered);
  return true;
}

// News
export function getNews(): NewsItem[] {
  const raw = readJsonFile<NewsItem>("news.json");
  return raw.sort((a, b) => {
    const oa = a.order ?? 999999;
    const ob = b.order ?? 999999;
    if (oa !== ob) return oa - ob;
    return (b.date || "").localeCompare(a.date || ""); // nowsze pierwsze przy remisach
  });
}

export function getNewsItem(id: string): NewsItem | undefined {
  const news = getNews();
  return news.find((n) => n.id === id);
}

export function createNewsItem(news: Omit<NewsItem, "id" | "createdAt" | "updatedAt">): NewsItem {
  const raw = readJsonFile<NewsItem>("news.json");
  const maxOrder = raw.length ? Math.max(0, ...raw.map((n) => n.order ?? 0)) : -1;
  const newItem: NewsItem = {
    ...news,
    id: Date.now().toString(),
    order: maxOrder + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  raw.push(newItem);
  writeJsonFile("news.json", raw);
  return newItem;
}

export function updateNewsItem(id: string, updates: Partial<NewsItem>): NewsItem | null {
  const newsItems = readJsonFile<NewsItem>("news.json");
  const index = newsItems.findIndex((n) => n.id === id);
  if (index === -1) return null;
  newsItems[index] = {
    ...newsItems[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeJsonFile("news.json", newsItems);
  return newsItems[index];
}

export function deleteNewsItem(id: string): boolean {
  const newsItems = readJsonFile<NewsItem>("news.json");
  const filtered = newsItems.filter((n) => n.id !== id);
  if (filtered.length === newsItems.length) return false;
  writeJsonFile("news.json", filtered);
  return true;
}

/** Ustawia kolejność aktualności. orderedIds – tablica id w docelowej kolejności. */
export function reorderNews(orderedIds: string[]): void {
  const newsItems = readJsonFile<NewsItem>("news.json");
  const orderMap = Object.fromEntries(orderedIds.map((id, i) => [id, i]));
  newsItems.forEach((n) => {
    if (n.id in orderMap) (n as NewsItem).order = orderMap[n.id];
  });
  writeJsonFile("news.json", newsItems);
}

// Banner images (hero slides)
export function getBanners(): BannerImage[] {
  const items = readJsonFile<BannerImage>("banners.json");
  return items.sort((a, b) => a.order - b.order);
}

export function createBanner(banner: Omit<BannerImage, "id" | "createdAt">): BannerImage {
  const items = getBanners();
  const maxOrder = items.length ? Math.max(...items.map((b) => b.order), 0) : 0;
  const newItem: BannerImage = {
    ...banner,
    id: Date.now().toString(),
    order: banner.order ?? maxOrder + 1,
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  writeJsonFile("banners.json", items.sort((a, b) => a.order - b.order));
  return newItem;
}

export function deleteBanner(id: string): boolean {
  const items = getBanners();
  const filtered = items.filter((b) => b.id !== id);
  if (filtered.length === items.length) return false;
  writeJsonFile("banners.json", filtered);
  return true;
}

// Admins (stored in data/admins.json; passwords hashed with bcrypt)
const ADMINS_FILE = "admins.json";

export function getAdmins(): Admin[] {
  return readJsonFile<Admin>(ADMINS_FILE);
}

export function getAdminByUsername(username: string): Admin | undefined {
  const admins = getAdmins();
  return admins.find((a) => a.username.toLowerCase() === username.toLowerCase());
}

export function getAdmin(id: string): Admin | undefined {
  const admins = getAdmins();
  return admins.find((a) => a.id === id);
}

export function createAdmin(admin: Omit<Admin, "id" | "createdAt">): Admin {
  const admins = getAdmins();
  const newAdmin: Admin = {
    ...admin,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  admins.push(newAdmin);
  writeJsonFile(ADMINS_FILE, admins);
  return newAdmin;
}

export function deleteAdmin(id: string): boolean {
  const admins = getAdmins();
  const filtered = admins.filter((a) => a.id !== id);
  if (filtered.length === admins.length) return false;
  writeJsonFile(ADMINS_FILE, filtered);
  return true;
}
