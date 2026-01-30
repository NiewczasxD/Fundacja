import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności - Fundacja IVEL",
  description: "Polityka prywatności Fundacji IVEL",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitykaPrywatnosci() {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-background">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
          Polityka prywatności
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              1. Informacje ogólne
            </h2>
            <p>
              Niniejsza Polityka prywatności określa zasady przetwarzania i ochrony danych
              osobowych przekazanych przez Użytkowników w związku z korzystaniem z serwisu
              internetowego Fundacji IVEL.
            </p>
            <p>
              <strong>Administratorem danych osobowych</strong> jest Fundacja IVEL z siedzibą w{" "}
              [Uzupełnij adres], KRS: [Uzupełnij KRS], NIP: [Uzupełnij NIP], REGON: [Uzupełnij
              REGON].
            </p>
            <p>
              Kontakt z Administratorem: e-mail: [Uzupełnij e-mail], telefon: [Uzupełnij telefon].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              2. Podstawa prawna przetwarzania danych
            </h2>
            <p>
              Dane osobowe przetwarzane są na podstawie:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Art. 6 ust. 1 lit. a RODO - zgoda osoby, której dane dotyczą (formularz
                kontaktowy)
              </li>
              <li>
                Art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes administratora (analiza
                statystyk, bezpieczeństwo serwisu)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              3. Cele przetwarzania danych
            </h2>
            <p>Dane osobowe przetwarzane są w następujących celach:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Odpowiedź na zapytania przesłane przez formularz kontaktowy</li>
              <li>Realizacja celów statutowych fundacji</li>
              <li>Prowadzenie statystyk i analiz dotyczących korzystania ze strony</li>
              <li>Zapewnienie bezpieczeństwa serwisu</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              4. Okres przechowywania danych
            </h2>
            <p>
              Dane osobowe przechowywane są przez okres niezbędny do realizacji celów, dla których
              zostały zebrane, nie dłużej jednak niż przez okres przedawnienia roszczeń lub
              obowiązku przechowywania danych wynikającego z przepisów prawa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              5. Prawa użytkownika
            </h2>
            <p>Użytkownik ma prawo do:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania danych</li>
              <li>Usunięcia danych</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
              <li>Cofnięcia zgody w dowolnym momencie</li>
              <li>Wniesienia skargi do organu nadzorczego (UODO)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              6. Pliki cookies
            </h2>
            <p>
              Szczegółowe informacje dotyczące plików cookies znajdują się w{" "}
              <Link
                href="/polityka-cookies"
                className="text-primary hover:text-primary-dark underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Polityce cookies
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              7. Zmiany w polityce prywatności
            </h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce
              prywatności. Aktualna wersja jest zawsze dostępna na stronie internetowej.
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
