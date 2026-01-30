import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-secondary mb-4">
          Aktualność nie znaleziona
        </h1>
        <p className="text-gray-600 mb-8">
          Przepraszamy, ale aktualność, której szukasz, nie istnieje lub została usunięta.
        </p>
        <Link
          href="/#aktualnosci"
          className="btn-primary inline-block"
        >
          Powrót do aktualności
        </Link>
      </div>
    </div>
  );
}
