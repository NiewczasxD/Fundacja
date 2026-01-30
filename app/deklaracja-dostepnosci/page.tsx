import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deklaracja dostępności - Fundacja IVEL",
  description: "Deklaracja dostępności cyfrowej strony Fundacji IVEL",
  robots: {
    index: true,
    follow: true,
  },
};

export default function DeklaracjaDostepnosci() {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-background">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
          Deklaracja dostępności
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <p>
              Fundacja IVEL zobowiązuje się zapewnić dostępność strony internetowej zgodnie z
              przepisami ustawy z dnia 4 kwietnia 2019 r. o dostępności cyfrowej stron
              internetowych i aplikacji mobilnych podmiotów publicznych.
            </p>
            <p>
              Niniejsza deklaracja dostępności ma zastosowanie do strony internetowej{" "}
              <strong>[Uzupełnij adres URL]</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              Data publikacji i aktualizacji
            </h2>
            <p>
              Data publikacji strony internetowej: [Uzupełnij datę]
              <br />
              Data ostatniej istotnej aktualizacji: [Uzupełnij datę]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              Status pod względem dostępności cyfrowej
            </h2>
            <p>
              Strona internetowa jest częściowo zgodna z ustawą o dostępności cyfrowej z powodu
              niezgodności lub wyłączeń wymienionych poniżej.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              Zastosowane standardy
            </h2>
            <p>
              Strona internetowa została zaprojektowana zgodnie z wytycznymi WCAG 2.1 na poziomie
              AA.
            </p>
            <p>Zastosowane rozwiązania:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Semantyczny kod HTML5</li>
              <li>Prawidłowa struktura nagłówków</li>
              <li>Alternatywne teksty dla obrazów</li>
              <li>Kontrasty kolorów zgodne z WCAG 2.1 AA</li>
              <li>Nawigacja klawiaturą</li>
              <li>Focus states dla wszystkich interaktywnych elementów</li>
              <li>ARIA labels i role</li>
              <li>Responsywny design (mobile-first)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              Informacje zwrotne i dane kontaktowe
            </h2>
            <p>
              W przypadku problemów z dostępnością strony internetowej prosimy o kontakt:
            </p>
            <ul className="list-none pl-0 space-y-2">
              <li>
                <strong>E-mail:</strong> [Uzupełnij e-mail]
              </li>
              <li>
                <strong>Telefon:</strong> [Uzupełnij telefon]
              </li>
              <li>
                <strong>Adres:</strong> Ks. Stanisława Brzóski 5, 42-202 Częstochowa
              </li>
            </ul>
            <p className="mt-4">
              Każdy ma prawo zgłosić uwagi dotyczące dostępności cyfrowej strony internetowej,
              aplikacji mobilnej lub jakiegoś ich elementu. W zgłoszeniu należy wskazać:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dane kontaktowe osoby zgłaszającej</li>
              <li>Wskazanie strony internetowej lub aplikacji mobilnej</li>
              <li>Opis problemu</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              Procedura odwoławcza
            </h2>
            <p>
              Po wyczerpaniu wskazanej wyżej procedury można złożyć wniosek do{" "}
              <a
                href="https://www.gov.pl/web/dostepnosc-cyfrowa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Rzecznika Praw Obywatelskich
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              Architektura informacji
            </h2>
            <p>Strona internetowa zawiera następujące sekcje:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Strona główna z sekcjami: Hero, O nas, Projekty, Zespół, Galeria, Aktualności, Kontakt</li>
              <li>Polityka prywatności</li>
              <li>Polityka cookies</li>
              <li>Deklaracja dostępności</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              Data sporządzenia deklaracji
            </h2>
            <p>Data sporządzenia deklaracji: [Uzupełnij datę]</p>
            <p className="text-sm text-gray-500 mt-4">
              Deklarację sporządził: [Uzupełnij imię i nazwisko/stanowisko]
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-primary hover:text-primary-dark font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            ← Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}
