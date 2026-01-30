export default function Contact() {
  return (
    <section
      id="kontakt"
      className="section-padding bg-gray-50"
      aria-labelledby="kontakt-heading"
    >
      <div className="container-custom">
        <h2
          id="kontakt-heading"
          className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        >
          Kontakt
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <h3 className="text-xl font-semibold text-secondary px-8 py-6 border-b border-gray-100 bg-gray-50/80">
              Dane kontaktowe
            </h3>
            <ul className="divide-y divide-gray-100" aria-label="Dane kontaktowe">
              <li className="flex gap-5 px-8 py-6 items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden>
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-secondary mb-0.5">Adres</span>
                  <p className="text-gray-700">
                    Ks. Stanisława Brzóski 5<br />
                    42-202 Częstochowa
                  </p>
                </div>
              </li>
              <li className="flex gap-5 px-8 py-6 items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden>
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-secondary mb-0.5">E-mail</span>
                  <p className="text-gray-700">
                    <a
                      href="mailto:fundacja@ivel.pl"
                      className="text-primary hover:text-primary-dark font-medium underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      fundacja@ivel.pl
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-5 px-8 py-6 items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden>
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-secondary mb-0.5">KRS</span>
                  <p className="text-gray-700">0001182279</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
