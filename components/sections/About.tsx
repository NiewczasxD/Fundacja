export default function About() {
  const iconSizeClass = "w-10 h-10";

  const socialLinks = [
    {
      href: "https://www.facebook.com/ivelpl",
      label: "Facebook",
      icon: (
        <svg className={iconSizeClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/ivel_pl/",
      label: "Instagram",
      icon: (
        <svg className={iconSizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" ry="4" />
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <line x1="16.5" y1="7.5" x2="16.51" y2="7.5" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="o-nas"
      className="section-padding bg-background"
      aria-labelledby="o-nas-heading"
    >
      <div className="container-custom">
        <h2
          id="o-nas-heading"
          className="text-3xl md:text-4xl font-bold text-secondary mb-8 text-center"
        >
          O nas
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Fundacja IVEL to organizacja pozarządowa działająca na rzecz lokalnej społeczności. 
            Naszym głównym celem jest wspieranie osób znajdujących się w trudnej sytuacji życiowej 
            oraz budowanie silniejszych więzi społecznych w naszym regionie. Działamy poprzez 
            realizację projektów społecznych, organizację wydarzeń integracyjnych oraz bezpośrednią 
            pomoc potrzebującym. Wierzymy, że razem możemy tworzyć lepsze jutro dla naszej społeczności.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">Misja</h3>
              <p className="text-gray-700">
                Wspieranie lokalnej społeczności poprzez pomoc najpotrzebniejszym, 
                budowanie solidarności społecznej oraz inicjowanie działań na rzecz 
                poprawy jakości życia mieszkańców naszego regionu.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">Wizja</h3>
              <p className="text-gray-700">
                Społeczność, w której nikt nie pozostaje sam w potrzebie, a lokalne 
                środowisko charakteryzuje się wzajemną pomocą, solidarnością i 
                zaangażowaniem w budowanie lepszej przyszłości dla wszystkich.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">Wartości</h3>
              <p className="text-gray-700">
                Solidarność, empatia, zaangażowanie społeczne, transparentność 
                oraz szacunek dla każdego człowieka niezależnie od jego sytuacji życiowej.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-12 pt-8 border-t border-gray-200">
            <p className="text-secondary font-medium">Śledź nas</p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 text-secondary hover:text-primary transition-colors rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-0"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
