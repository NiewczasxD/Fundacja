import Image from "next/image";

export default function HowToHelp() {
  const helpOptions = [
    {
      title: "Partnerstwa",
      description: "Współpracuj z nami jako firma lub organizacja.",
      action: "Zostań partnerem",
      href: "#kontakt",
    },
  ];

  return (
    <section
      id="jak-pomoc"
      className="section-padding bg-gray-50"
      aria-labelledby="jak-pomoc-heading"
    >
      <div className="container-custom">
        <h2
          id="jak-pomoc-heading"
          className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        >
          Jak możesz pomóc
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
          {helpOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-center mb-4" aria-hidden="true">
                <Image
                  src="/tarcza.png"
                  alt=""
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-secondary mb-4">
                {option.title}
              </h3>
              <p className="text-gray-700 mb-6">{option.description}</p>
              <a
                href={option.href}
                className="btn-primary inline-block"
                aria-label={`${option.action} - ${option.title}`}
              >
                {option.action}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
