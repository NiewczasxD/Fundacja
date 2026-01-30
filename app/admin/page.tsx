"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Tab = "projects" | "team" | "gallery" | "news" | "banner" | "admins";

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/admin/login");
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">Sprawdzanie autoryzacji...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">Panel administracyjny</h1>
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Wyloguj się
          </button>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: "projects" as Tab, label: "Projekty" },
              { id: "team" as Tab, label: "Zespół" },
              { id: "gallery" as Tab, label: "Galeria" },
              { id: "news" as Tab, label: "Aktualności" },
              { id: "banner" as Tab, label: "Baner" },
              { id: "admins" as Tab, label: "Administratorzy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === "projects" && <ProjectsManager />}
          {activeTab === "team" && <TeamManager />}
          {activeTab === "gallery" && <GalleryManager />}
          {activeTab === "news" && <NewsManager />}
          {activeTab === "banner" && <BannerManager />}
          {activeTab === "admins" && <AdminsManager />}
        </div>
      </div>
    </div>
  );
}

function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "aktywny" as "aktywny" | "planowany" | "zakończony",
    image: null as File | null,
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("status", formData.status);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editingId) {
        formDataToSend.append("id", editingId);
        await fetch("/api/projects", {
          method: "PUT",
          body: formDataToSend,
        });
      } else {
        await fetch("/api/projects", {
          method: "POST",
          body: formDataToSend,
        });
      }
      fetchProjects();
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: "", description: "", status: "aktywny", image: null });
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Błąd podczas zapisywania projektu");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten projekt?")) return;
    try {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Błąd podczas usuwania projektu");
    }
  };

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      image: null,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleMove = async (fromIndex: number, direction: -1 | 1) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= projects.length) return;
    const ids = projects.map((p) => p.id);
    [ids[fromIndex], ids[toIndex]] = [ids[toIndex], ids[fromIndex]];
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: ids }),
      });
      const data = await res.json();
      if (res.ok) setProjects(data);
      else alert("Błąd podczas zmiany kolejności");
    } catch {
      alert("Błąd podczas zmiany kolejności");
    }
  };

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projekty</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ title: "", description: "", status: "aktywny", image: null });
          }}
          className="btn-primary"
        >
          {showForm ? "Anuluj" : "Dodaj projekt"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tytuł</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Opis</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="aktywny">Aktywny</option>
                <option value="planowany">Planowany</option>
                <option value="zakończony">Zakończony</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Zdjęcie</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button type="submit" className="btn-primary">
              {editingId ? "Zaktualizuj" : "Dodaj"}
            </button>
          </div>
        </form>
      )}

      <p className="text-gray-600 mb-4">
        Kolejność na stronie zależy od pozycji poniżej. Użyj strzałek, aby przesunąć wpis w górę lub w dół.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-sm text-gray-500">Pozycja {index + 1}</span>
              <span className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold"
                  title="Wyżej"
                  aria-label="Przenieś wyżej"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === projects.length - 1}
                  className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold"
                  title="Niżej"
                  aria-label="Przenieś niżej"
                >
                  ↓
                </button>
              </span>
            </div>
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
            )}
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <span className={`inline-block px-2 py-1 rounded text-sm ${
              project.status === "aktywny" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}>
              {project.status}
            </span>
            <div className="mt-4 flex gap-2">
              <button onClick={() => handleEdit(project)} className="btn-secondary text-sm">
                Edytuj
              </button>
              <button onClick={() => handleDelete(project.id)} className="btn-primary bg-red-600 text-sm">
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamManager() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    image: null as File | null,
  });

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("position", formData.position);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editingId) {
        formDataToSend.append("id", editingId);
        await fetch("/api/team", { method: "PUT", body: formDataToSend });
      } else {
        await fetch("/api/team", { method: "POST", body: formDataToSend });
      }
      fetchMembers();
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: "", position: "", image: null });
    } catch (error) {
      alert("Błąd podczas zapisywania");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć tego członka zespołu?")) return;
    try {
      await fetch(`/api/team?id=${id}`, { method: "DELETE" });
      fetchMembers();
    } catch (error) {
      alert("Błąd podczas usuwania");
    }
  };

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Zespół</h2>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", position: "", image: null }); }} className="btn-primary">
          {showForm ? "Anuluj" : "Dodaj członka"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Imię i nazwisko</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stanowisko</label>
              <input type="text" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Zdjęcie</label>
              <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <button type="submit" className="btn-primary">{editingId ? "Zaktualizuj" : "Dodaj"}</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-lg shadow-md text-center">
            {member.image && <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />}
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-600 mb-4">{member.position}</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => { setFormData({ name: member.name, position: member.position, image: null }); setEditingId(member.id); setShowForm(true); }} className="btn-secondary text-sm">Edytuj</button>
              <button onClick={() => handleDelete(member.id)} className="btn-primary bg-red-600 text-sm">Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryManager() {
  const [images, setImages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [formData, setFormData] = useState({
    alt: "",
    category: "wydarzenia",
    projectId: "",
    images: [] as File[],
  });

  const fetchData = async () => {
    try {
      const [imagesRes, projectsRes] = await Promise.all([
        fetch("/api/gallery"),
        fetch("/api/projects"),
      ]);
      const imagesData = await imagesRes.json();
      const projectsData = await projectsRes.json();
      setImages(imagesData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert("Wybierz przynajmniej jedno zdjęcie");
      return;
    }

    setUploading(true);
    setUploadProgress({ current: 0, total: formData.images.length });

    try {
      // Wyślij każde zdjęcie osobno
      for (let i = 0; i < formData.images.length; i++) {
        const image = formData.images[i];
        const formDataToSend = new FormData();
        // Jeśli nie podano opisu, użyj nazwy pliku
        const alt = formData.alt || image.name.replace(/\.[^/.]+$/, "");
        formDataToSend.append("alt", alt);
        formDataToSend.append("category", formData.category);
        if (formData.projectId) {
          formDataToSend.append("projectId", formData.projectId);
        }
        formDataToSend.append("image", image);

        await fetch("/api/gallery", { method: "POST", body: formDataToSend });
        setUploadProgress({ current: i + 1, total: formData.images.length });
      }
      
      fetchData();
      setShowForm(false);
      setFormData({ alt: "", category: "wydarzenia", projectId: "", images: [] });
      alert(`Dodano ${formData.images.length} zdjęć`);
    } catch (error) {
      alert("Błąd podczas dodawania zdjęć");
    } finally {
      setUploading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć to zdjęcie?")) return;
    try {
      await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      alert("Błąd podczas usuwania");
    }
  };

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Galeria</h2>
        <button onClick={() => { setShowForm(!showForm); setFormData({ alt: "", category: "wydarzenia", projectId: "", images: [] }); }} className="btn-primary">
          {showForm ? "Anuluj" : "Dodaj zdjęcia"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Opis zdjęcia (opcjonalnie - jeśli nie podasz, użyta zostanie nazwa pliku)
              </label>
              <input type="text" value={formData.alt} onChange={(e) => setFormData({ ...formData, alt: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="Wspólny opis dla wszystkich zdjęć" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Projekt (opcjonalnie)</label>
              <select value={formData.projectId} onChange={(e) => setFormData({ ...formData, projectId: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                <option value="">Brak powiązania z projektem</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategoria</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                <option value="wydarzenia">Wydarzenia</option>
                <option value="projekty">Projekty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Zdjęcia (można wybrać wiele)
              </label>
              <input 
                type="file" 
                accept="image/*" 
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFormData({ ...formData, images: files });
                }} 
                className="w-full px-4 py-2 border rounded-lg" 
                required 
                disabled={uploading}
              />
              {formData.images.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Wybrano {formData.images.length} zdjęć
                </p>
              )}
              {uploading && (
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Dodawanie {uploadProgress.current} z {uploadProgress.total}...
                  </p>
                </div>
              )}
            </div>
            <button type="submit" className="btn-primary" disabled={uploading}>
              {uploading ? "Dodawanie..." : `Dodaj ${formData.images.length > 0 ? `${formData.images.length} zdjęć` : "zdjęcia"}`}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={img.src} alt={img.alt} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="font-semibold mb-1">{img.alt}</p>
              <span className="text-sm text-gray-600">{img.category}</span>
              {img.projectId && (
                <p className="text-xs text-gray-500 mt-1">
                  Projekt: {projects.find((p) => p.id === img.projectId)?.title || img.projectId}
                </p>
              )}
              <button onClick={() => handleDelete(img.id)} className="mt-2 btn-primary bg-red-600 text-sm w-full">Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsManager() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    slug: "",
    image: null as File | null,
  });

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNewsItems(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("excerpt", formData.excerpt);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("slug", formData.slug);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editingId) {
        formDataToSend.append("id", editingId);
        await fetch("/api/news", { method: "PUT", body: formDataToSend });
      } else {
        await fetch("/api/news", { method: "POST", body: formDataToSend });
      }
      fetchNews();
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: "", excerpt: "", content: "", date: new Date().toISOString().split("T")[0], slug: "", image: null });
    } catch (error) {
      alert("Błąd podczas zapisywania");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć tę aktualność?")) return;
    try {
      await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      fetchNews();
    } catch (error) {
      alert("Błąd podczas usuwania");
    }
  };

  const handleMove = async (fromIndex: number, direction: -1 | 1) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= newsItems.length) return;
    const ids = newsItems.map((n) => n.id);
    [ids[fromIndex], ids[toIndex]] = [ids[toIndex], ids[fromIndex]];
    try {
      const res = await fetch("/api/news", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: ids }),
      });
      const data = await res.json();
      if (res.ok) setNewsItems(data);
      else alert("Błąd podczas zmiany kolejności");
    } catch {
      alert("Błąd podczas zmiany kolejności");
    }
  };

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Aktualności</h2>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: "", excerpt: "", content: "", date: new Date().toISOString().split("T")[0], slug: "", image: null }); }} className="btn-primary">
          {showForm ? "Anuluj" : "Dodaj aktualność"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tytuł</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Krótki opis</label>
              <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={2} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Treść (opcjonalnie)</label>
              <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Data</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Zdjęcie</label>
              <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <button type="submit" className="btn-primary">{editingId ? "Zaktualizuj" : "Dodaj"}</button>
          </div>
        </form>
      )}

      <p className="text-gray-600 mb-4">
        Kolejność na stronie zależy od pozycji poniżej. Użyj strzałek, aby przesunąć wpis w górę lub w dół.
      </p>
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-sm text-gray-500">Pozycja {index + 1}</span>
              <span className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold"
                  title="Wyżej"
                  aria-label="Przenieś wyżej"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === newsItems.length - 1}
                  className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold"
                  title="Niżej"
                  aria-label="Przenieś niżej"
                >
                  ↓
                </button>
              </span>
            </div>
            <div className="flex gap-4">
              {item.image && <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded" />}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.excerpt}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => { setFormData({ title: item.title, excerpt: item.excerpt, content: item.content || "", date: item.date, slug: item.slug, image: null }); setEditingId(item.id); setShowForm(true); }} className="btn-secondary text-sm">Edytuj</button>
                  <button onClick={() => handleDelete(item.id)} className="btn-primary bg-red-600 text-sm">Usuń</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BannerManager() {
  const [banners, setBanners] = useState<{ id: string; src: string; order: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/banner");
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Wybierz przynajmniej jedno zdjęcie");
      return;
    }
    setUploading(true);
    try {
      for (const file of images) {
        const fd = new FormData();
        fd.append("image", file);
        await fetch("/api/banner", { method: "POST", body: fd });
      }
      fetchBanners();
      setShowForm(false);
      setImages([]);
      alert(`Dodano ${images.length} zdjęć do banera.`);
    } catch (err) {
      alert("Błąd podczas dodawania.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Usunąć ten slajd z banera?")) return;
    try {
      await fetch(`/api/banner?id=${id}`, { method: "DELETE" });
      fetchBanners();
    } catch (err) {
      alert("Błąd podczas usuwania.");
    }
  };

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Zdjęcia banera (Hero)</h2>
        <button
          type="button"
          onClick={() => { setShowForm(!showForm); setImages([]); }}
          className="btn-primary"
        >
          {showForm ? "Anuluj" : "Dodaj zdjęcia"}
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        Zdjęcia banera zmieniają się co 4 sekundy z płynnym przejściem. Kolejność: od góry do dołu.
      </p>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Zdjęcia (można wybrać wiele)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploading}
                onChange={(e) => setImages(Array.from(e.target.files || []))}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {images.length > 0 && <p className="text-sm text-gray-600 mt-2">Wybrano: {images.length}</p>}
            </div>
            <button type="submit" className="btn-primary" disabled={uploading || images.length === 0}>
              {uploading ? "Dodawanie..." : "Dodaj"}
            </button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((b, i) => (
          <div key={b.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-[16/10] bg-gray-100 relative">
              <img src={b.src} alt={`Baner ${i + 1}`} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-600">Kolejność: {i + 1}</span>
              <button type="button" onClick={() => handleDelete(b.id)} className="btn-primary bg-red-600 text-sm">
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type AdminListItem = { id: string; username: string; createdAt: string };

function AdminsManager() {
  const [admins, setAdmins] = useState<AdminListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admins");
      const data = await res.json();
      if (res.ok) setAdmins(Array.isArray(data) ? data : []);
      else setAdmins([]);
    } catch {
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Błąd podczas dodawania administratora");
        return;
      }
      fetchAdmins();
      setShowForm(false);
      setFormData({ username: "", password: "" });
    } catch {
      setError("Błąd połączenia");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Administratorzy</h2>
        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setError(null);
            setFormData({ username: "", password: "" });
          }}
          className="btn-primary"
        >
          {showForm ? "Anuluj" : "Dodaj administratora"}
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        Administratorzy dodani tutaj mogą logować się do panelu tym samym adresem (login) i hasłem, które ustawisz. Hasło musi mieć co najmniej 6 znaków.
      </p>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Login (e-mail lub nazwa użytkownika)</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="np. admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hasło (min. 6 znaków)</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                minLength={6}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Dodawanie..." : "Dodaj administratora"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {admins.length === 0 ? (
            <li className="px-6 py-4 text-gray-500">Brak administratorów dodanych z panelu. Logowanie działa także z danymi z zmiennych środowiskowych (ADMIN_USERNAME, ADMIN_PASSWORD).</li>
          ) : (
            admins.map((admin) => (
              <li key={admin.id} className="px-6 py-4 flex justify-between items-center">
                <div>
                  <span className="font-medium">{admin.username}</span>
                  <span className="text-sm text-gray-500 ml-2">dodany: {new Date(admin.createdAt).toLocaleDateString("pl-PL")}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
