"use client";

import Link from "next/link";

const linkClass =
  "text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-0 rounded";
const blurOnClick = (e: React.MouseEvent<HTMLAnchorElement>) =>
  (e.currentTarget as HTMLAnchorElement).blur();

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-20" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* O fundacji */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fundacja IVEL</h3>
            <p className="text-gray-300 text-sm">
              Fundacja IVEL to organizacja pozarządowa działająca na rzecz lokalnej społeczności. Naszym głównym celem jest wspieranie osób znajdujących się w trudnej sytuacji życiowej oraz budowanie silniejszych więzi społecznych w naszym regionie.
            </p>
          </div>

          {/* Linki */}
          <div>
            <h3 className="text-xl font-bold mb-4">Linki</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#o-nas" className={linkClass} onClick={blurOnClick}>
                  O nas
                </Link>
              </li>
              <li>
                <Link href="#projekty" className={linkClass} onClick={blurOnClick}>
                  Projekty
                </Link>
              </li>
              <li>
                <Link href="#zespol" className={linkClass} onClick={blurOnClick}>
                  Zespół
                </Link>
              </li>
              <li>
                <Link href="#kontakt" className={linkClass} onClick={blurOnClick}>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Dokumenty prawne */}
          <div>
            <h3 className="text-xl font-bold mb-4">Dokumenty</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/polityka-prywatnosci" className={linkClass} onClick={blurOnClick}>
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link href="/polityka-cookies" className={linkClass} onClick={blurOnClick}>
                  Polityka cookies
                </Link>
              </li>
              <li>
                <Link href="/deklaracja-dostepnosci" className={linkClass} onClick={blurOnClick}>
                  Deklaracja dostępności
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Śledź nas</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/ivelpl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  onClick={(e) => (e.currentTarget as HTMLAnchorElement).blur()}
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ivel_pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  onClick={(e) => (e.currentTarget as HTMLAnchorElement).blur()}
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300 text-sm">
          <p>
            &copy; {currentYear} Fundacja IVEL. Wszelkie prawa zastrzeżone.
          </p>
          <p className="mt-2">
            KRS: 0001182279 | NIP: 9492277633 | REGON: 542278690
          </p>
        </div>
      </div>
    </footer>
  );
}
