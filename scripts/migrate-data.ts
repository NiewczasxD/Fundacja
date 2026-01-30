import fs from "fs";
import path from "path";
import { projects } from "../data/projects";
import { teamMembers } from "../data/team";
import { galleryImages } from "../data/gallery";
import { news } from "../data/news";

const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Migrate projects
const projectsWithIds = projects.map((project, index) => ({
  id: (Date.now() + index).toString(),
  ...project,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
fs.writeFileSync(
  path.join(DATA_DIR, "projects.json"),
  JSON.stringify(projectsWithIds, null, 2)
);

// Migrate team members
const teamWithIds = teamMembers.map((member, index) => ({
  id: (Date.now() + index + 1000).toString(),
  ...member,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
fs.writeFileSync(
  path.join(DATA_DIR, "team.json"),
  JSON.stringify(teamWithIds, null, 2)
);

// Migrate gallery images
const galleryWithIds = galleryImages.map((image, index) => ({
  id: (Date.now() + index + 2000).toString(),
  ...image,
  createdAt: new Date().toISOString(),
}));
fs.writeFileSync(
  path.join(DATA_DIR, "gallery.json"),
  JSON.stringify(galleryWithIds, null, 2)
);

// Migrate news
const newsWithIds = news.map((item, index) => ({
  id: (Date.now() + index + 3000).toString(),
  ...item,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
fs.writeFileSync(
  path.join(DATA_DIR, "news.json"),
  JSON.stringify(newsWithIds, null, 2)
);

console.log("Migracja danych zakończona!");
