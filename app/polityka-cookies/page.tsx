import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka cookies - Fundacja IVEL",
  description: "Polityka plików cookies Fundacji IVEL",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitykaCookies() {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-background">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
          Polityka plików cookies
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              1. Czym są pliki cookies?
            </h2>
            <p>
              Pliki cookies (ciasteczka) to małe pliki tekstowe zapisywane na urządzeniu
              użytkownika podczas przeglądania strony internetowej. Pliki cookies pozwalają na
              rozpoznanie urządzenia użytkownika i odpowiednie wyświetlenie strony dostosowanej do
              jego indywidualnych preferencji.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              2. Rodzaje plików cookies używanych na stronie
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              2.1. Niezbędne pliki cookies
            </h3>
            <p>
              Te pliki cookies są niezbędne do prawidłowego funkcjonowania strony. Umożliwiają
              podstawowe funkcje, takie jak nawigacja po stronie i dostęp do bezpiecznych obszarów
              strony. Strona nie może działać prawidłowo bez tych plików cookies.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              2.2. Analityczne pliki cookies
            </h3>
            <p>
              Te pliki cookies pomagają nam zrozumieć, w jaki sposób użytkownicy korzystają ze
              strony, poprzez zbieranie i raportowanie informacji anonimowo. Pozwalają nam
              poprawiać funkcjonalność strony.
            </p>
            <p>
              <strong>Przykłady:</strong> Google Analytics (jeśli włączone po zgodzie użytkownika)
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              2.3. Marketingowe pliki cookies
            </h3>
            <p>
              Te pliki cookies są używane do śledzenia użytkowników na różnych stronach
              internetowych w celu wyświetlania reklam, które są odpowiednie i istotne dla
              poszczególnych użytkowników oraz bardziej wartościowe dla wydawców i reklamodawców.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              3. Zarządzanie plikami cookies
            </h2>
            <p>
              Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies w
              ustawieniach przeglądarki internetowej. Należy jednak pamiętać, że wyłączenie
              niezbędnych plików cookies może wpłynąć na funkcjonalność strony.
            </p>
            <p>
              Instrukcje dotyczące zarządzania plikami cookies w popularnych przeglądarkach:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/pl/kb/ciasteczka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              4. Zgoda na pliki cookies
            </h2>
            <p>
              Przy pierwszej wizycie na stronie wyświetlany jest baner informujący o używaniu
              plików cookies. Kontynuując przeglądanie strony lub klikając &quot;Akceptuj wszystkie&quot;,
              użytkownik wyraża zgodę na używanie plików cookies zgodnie z ustawieniami.
            </p>
            <p>
              Zgoda może być w każdej chwili wycofana poprzez zmianę ustawień w banerze cookies
              lub w ustawieniach przeglądarki.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              5. Więcej informacji
            </h2>
            <p>
              Więcej informacji o przetwarzaniu danych osobowych znajduje się w{" "}
              <Link
                href="/polityka-prywatnosci"
                className="text-primary hover:text-primary-dark underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Polityce prywatności
              </Link>
              .
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-500 mt-8">
              Ostatnia aktualizacja: [Uzupełnij datę]
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
