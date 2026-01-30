# Fundacja IVEL - Strona wizytówkowa

Nowoczesna, responsywna strona wizytówkowa dla Fundacji IVEL, zbudowana w Next.js 14 (App Router), TypeScript i TailwindCSS.

## 🚀 Funkcjonalności

- ✅ Responsywny design (mobile-first)
- ✅ Pełna zgodność z WCAG 2.1 AA (dostępność)
- ✅ SEO zoptymalizowane (meta tagi, Open Graph, sitemap.xml, robots.txt)
- ✅ Zgodność z RODO/GDPR (baner cookies, polityki, formularz)
- ✅ Nowoczesny UI/UX z subtelnymi animacjami
- ✅ Galeria zdjęć z filtrowaniem i lightbox
- ✅ Formularz kontaktowy z walidacją i ochroną antyspamową
- ✅ FAQ z akordeonem
- ✅ Sekcja aktualności

## 📋 Wymagania

- Node.js 18+ 
- npm lub yarn

## 🛠️ Instalacja

1. Zainstaluj zależności:

```bash
npm install
```

lub

```bash
yarn install
```

## ▶️ Uruchomienie

### Tryb deweloperski

```bash
npm run dev
```

lub

```bash
yarn dev
```

Strona będzie dostępna pod adresem: `http://localhost:3000`

### Build produkcyjny

```bash
npm run build
npm start
```

## 📁 Struktura projektu

```
fundacja-ivel/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Główny layout z Header i Footer
│   ├── page.tsx           # Strona główna
│   ├── globals.css        # Globalne style TailwindCSS
│   ├── polityka-prywatnosci/
│   ├── polityka-cookies/
│   └── deklaracja-dostepnosci/
├── components/            # Komponenty React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CookieBanner.tsx
│   └── sections/         # Sekcje strony
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Goals.tsx
│       ├── Projects.tsx
│       ├── HowToHelp.tsx
│       ├── Gallery.tsx
│       ├── News.tsx
│       ├── FAQ.tsx
│       └── Contact.tsx
├── data/                 # Pliki danych (łatwe do edycji)
│   ├── goals.ts
│   ├── projects.ts
│   ├── gallery.ts
│   ├── news.ts
│   └── faq.ts
├── public/               # Pliki statyczne
│   ├── gallery/         # Folder na zdjęcia galerii
│   ├── sitemap.xml
│   └── robots.txt
└── README.md
```

## ✏️ Edycja treści

### Cele fundacji

Edytuj plik `data/goals.ts`:

```typescript
export const goals = [
  {
    icon: "🎯",
    title: "Twój cel",
    description: "Opis celu",
  },
  // ...
];
```

### Projekty

Edytuj plik `data/projects.ts`:

```typescript
export const projects = [
  {
    title: "Nazwa projektu",
    description: "Opis projektu",
    status: "aktywny" | "planowany" | "zakończony",
  },
  // ...
];
```

### Aktualności

Edytuj plik `data/news.ts`:

```typescript
export const news: NewsItem[] = [
  {
    title: "Tytuł aktualności",
    excerpt: "Krótki opis",
    date: "2024-01-15", // Format: YYYY-MM-DD
    slug: "aktualnosc-1",
  },
  // ...
];
```

### FAQ

Edytuj plik `data/faq.ts`:

```typescript
export const faqItems: FAQItem[] = [
  {
    question: "Pytanie?",
    answer: "Odpowiedź.",
  },
  // ...
];
```

### Sekcja "O nas"

Edytuj plik `components/sections/About.tsx` - znajdź sekcję z placeholderami `[Uzupełnij...]` i zastąp je własnymi treściami.

### Sekcja "Jak możesz pomóc"

Edytuj plik `components/sections/HowToHelp.tsx` - zaktualizuj numer konta i tytuł przelewu.

### Dane kontaktowe

Edytuj plik `components/sections/Contact.tsx` - zaktualizuj adres, e-mail, telefon, KRS.

### Stopka

Edytuj plik `components/Footer.tsx` - zaktualizuj dane fundacji (KRS, NIP, REGON) oraz linki do social media.

## 📸 Dodawanie zdjęć do galerii

### Metoda 1: Przez plik danych (zalecane)

1. Umieść zdjęcia w folderze `public/gallery/`
2. Edytuj plik `data/gallery.ts`:

```typescript
export const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/twoje-zdjecie.jpg",
    alt: "Opis zdjęcia dla dostępności",
    category: "wydarzenia", // lub "projekty"
  },
  // ...
];
```

**Ważne:** 
- Używaj formatów: JPG, PNG, WebP
- Optymalizuj zdjęcia przed dodaniem (zalecany rozmiar: max 1920px szerokości)
- Zawsze dodawaj opis w polu `alt` dla dostępności

### Metoda 2: Bezpośrednio w folderze

Możesz również dodać zdjęcia do `public/gallery/` i zaktualizować `gallery.ts` odpowiednio.

## 🎨 Kolorystyka

Projekt używa następującej palety kolorów:

- **Tło:** `#FFFFFF` (white)
- **Primary:** `#ED1C24` (czerwony)
- **Primary Dark:** `#A30C11` (ciemny czerwony)
- **Secondary:** `#000000` (czarny)

Kolory są zdefiniowane w `tailwind.config.ts` i można je łatwo zmienić.

## 🔒 Zgodność prawna (RODO/GDPR)

### Baner cookies

Baner cookies jest zaimplementowany w `components/CookieBanner.tsx` i obsługuje:
- Akceptację wszystkich cookies
- Odrzucenie wszystkich oprócz niezbędnych
- Granularne ustawienia (Niezbędne, Analityczne, Marketingowe)

### Polityki

Strony prawne znajdują się w:
- `/polityka-prywatnosci`
- `/polityka-cookies`
- `/deklaracja-dostepnosci`

**Uwaga:** Przed wdrożeniem na produkcję uzupełnij wszystkie placeholdery `[Uzupełnij...]` w tych plikach rzeczywistymi danymi fundacji.

### Formularz kontaktowy

Formularz w `components/sections/Contact.tsx` zawiera:
- Walidację po stronie klienta
- Pole honeypot (ochrona antyspamowa)
- Checkbox zgody RODO z linkiem do polityki prywatności
- Komunikaty błędów dostępne dla screen readerów

**Uwaga:** Obecnie formularz symuluje wysyłkę. Przed wdrożeniem na produkcję zintegruj go z:
- API endpoint (np. `/api/contact`)
- Serwisem e-mail (np. SendGrid, Resend)
- Lub formularzem zewnętrznym (np. Formspree)

## ♿ Dostępność (WCAG 2.1 AA)

Zaimplementowane funkcje dostępności:

- ✅ Semantyczny HTML5
- ✅ ARIA labels i role
- ✅ Focus states dla wszystkich interaktywnych elementów
- ✅ Nawigacja klawiaturą
- ✅ Skip link do treści głównej
- ✅ Kontrasty kolorów zgodne z WCAG 2.1 AA
- ✅ Alternatywne teksty dla obrazów (wymagane przy dodawaniu zdjęć)
- ✅ Responsywny design
- ✅ Wsparcie dla `prefers-reduced-motion`

## 🔍 SEO

Zaimplementowane elementy SEO:

- ✅ Meta tagi (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Sitemap.xml (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Canonical URLs
- ✅ Semantyczny HTML

**Uwaga:** Przed wdrożeniem zaktualizuj:
- URL w `sitemap.xml` (obecnie: `https://fundacja-ivel.pl`)
- Meta tagi w `app/layout.tsx`
- Open Graph image (dodaj do `public/og-image.jpg`)

## 📝 Checklist przed wdrożeniem

- [ ] Uzupełnij wszystkie placeholdery `[Uzupełnij...]` w komponentach
- [ ] Zaktualizuj dane fundacji (adres, KRS, NIP, REGON, e-mail, telefon)
- [ ] Dodaj zdjęcia do galerii
- [ ] Zaktualizuj treści w sekcjach (O nas, Cele, Projekty, FAQ)
- [ ] Uzupełnij polityki prawne rzeczywistymi danymi
- [ ] Zintegruj formularz kontaktowy z backendem/e-mailem
- [ ] Zaktualizuj URL w `sitemap.xml`
- [ ] Zaktualizuj meta tagi w `app/layout.tsx`
- [ ] Dodaj favicon (`public/favicon.ico`)
- [ ] Przetestuj na różnych urządzeniach i przeglądarkach
- [ ] Przetestuj dostępność (np. za pomocą Lighthouse, WAVE)
- [ ] Skonfiguruj domenę i hosting (np. Vercel, Netlify)

## 🚀 Deployment

### Vercel (zalecane dla Next.js)

1. Zainstaluj Vercel CLI: `npm i -g vercel`
2. Uruchom: `vercel`
3. Postępuj zgodnie z instrukcjami

### Inne platformy

Projekt może być wdrożony na dowolnej platformie obsługującej Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Własny serwer (Node.js)

## 📚 Technologie

- **Next.js 14** - Framework React z App Router
- **TypeScript** - Typowanie statyczne
- **TailwindCSS** - Utility-first CSS framework
- **React 18** - Biblioteka UI

## 📄 Licencja

Ten projekt został stworzony dla Fundacji IVEL. Wszelkie prawa zastrzeżone.

## 🤝 Wsparcie

W razie pytań lub problemów, skontaktuj się z deweloperem projektu.

---

**Ostatnia aktualizacja:** 2024-01-26
