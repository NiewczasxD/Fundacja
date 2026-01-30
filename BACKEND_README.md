# Backend API - Fundacja IVEL

## Przegląd

Backend został stworzony do zarządzania treścią strony fundacji. Pozwala na zarządzanie:
- **Projektami** (obszary działań)
- **Zespołem** (członkowie zarządu)
- **Galerią** (zdjęcia)
- **Aktualnościami** (news)

## Struktura

### API Routes
- `/api/projects` - CRUD dla projektów
- `/api/team` - CRUD dla członków zespołu
- `/api/gallery` - CRUD dla galerii zdjęć
- `/api/news` - CRUD dla aktualności

### Panel Administracyjny
- `/admin` - Panel do zarządzania treścią

## Instalacja i uruchomienie

1. **Migracja danych** (opcjonalnie, jeśli chcesz przenieść istniejące dane):
```bash
npm run migrate
```

2. **Uruchomienie serwera deweloperskiego**:
```bash
npm run dev
```

3. **Dostęp do panelu administracyjnego**:
Otwórz w przeglądarce: `http://localhost:3000/admin`

## API Endpoints

### Projekty

**GET** `/api/projects`
- Zwraca listę wszystkich projektów

**POST** `/api/projects`
- Tworzy nowy projekt
- Body: FormData z polami: `title`, `description`, `status`, `image` (opcjonalnie)

**PUT** `/api/projects`
- Aktualizuje projekt
- Body: FormData z polami: `id`, `title`, `description`, `status`, `image` (opcjonalnie), `deleteImage` (opcjonalnie)

**DELETE** `/api/projects?id={id}`
- Usuwa projekt

### Zespół

**GET** `/api/team`
- Zwraca listę wszystkich członków zespołu

**POST** `/api/team`
- Tworzy nowego członka zespołu
- Body: FormData z polami: `name`, `position`, `image` (opcjonalnie)

**PUT** `/api/team`
- Aktualizuje członka zespołu
- Body: FormData z polami: `id`, `name`, `position`, `image` (opcjonalnie), `deleteImage` (opcjonalnie)

**DELETE** `/api/team?id={id}`
- Usuwa członka zespołu

### Galeria

**GET** `/api/gallery`
- Zwraca listę wszystkich zdjęć w galerii

**POST** `/api/gallery`
- Dodaje zdjęcie do galerii
- Body: FormData z polami: `alt`, `category`, `image`

**DELETE** `/api/gallery?id={id}`
- Usuwa zdjęcie z galerii

### Aktualności

**GET** `/api/news`
- Zwraca listę wszystkich aktualności

**POST** `/api/news`
- Tworzy nową aktualność
- Body: FormData z polami: `title`, `excerpt`, `content` (opcjonalnie), `date`, `slug`, `image` (opcjonalnie)

**PUT** `/api/news`
- Aktualizuje aktualność
- Body: FormData z polami: `id`, `title`, `excerpt`, `content`, `date`, `slug`, `image` (opcjonalnie), `deleteImage` (opcjonalnie)

**DELETE** `/api/news?id={id}`
- Usuwa aktualność

## Przechowywanie danych

Dane są przechowywane w plikach JSON w folderze `data/`:
- `data/projects.json`
- `data/team.json`
- `data/gallery.json`
- `data/news.json`

Zdjęcia są przechowywane w folderze `public/uploads/`:
- `public/uploads/projects/`
- `public/uploads/team/`
- `public/uploads/gallery/`
- `public/uploads/news/`

## Autoryzacja

Panel administracyjny jest chroniony systemem logowania.

**Domyślne dane logowania:**
- Username: `admin`
- Password: `admin123`

**Zmiana danych logowania:**
Ustaw zmienne środowiskowe w pliku `.env`:
```
ADMIN_USERNAME=twoja_nazwa
ADMIN_PASSWORD=twoje_haslo
```

**Strony:**
- `/admin/login` - Strona logowania
- `/admin` - Panel administracyjny (wymaga logowania)

**API Endpoints:**
- `POST /api/auth/login` - Logowanie
- `POST /api/auth/logout` - Wylogowanie
- `GET /api/auth/me` - Sprawdzenie sesji

## Uwagi
- Pliki JSON są zapisywane synchronicznie - dla większych projektów warto rozważyć bazę danych (np. PostgreSQL, MongoDB)
- Zdjęcia są zapisywane bezpośrednio na dysku - dla produkcji warto rozważyć cloud storage (np. AWS S3, Cloudinary)
