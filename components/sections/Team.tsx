"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image?: string;
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        setMembers(data);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
        const staticMembers = await import("@/data/team");
        setMembers(staticMembers.teamMembers as any);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <section
        id="zespol"
        className="section-padding bg-gray-50"
        aria-labelledby="zespol-heading"
      >
        <div className="container-custom">
          <h2
            id="zespol-heading"
            className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
          >
            Zespół fundacji
          </h2>
          <div className="text-center">Ładowanie...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="zespol"
      className="section-padding bg-gray-50"
      aria-labelledby="zespol-heading"
    >
      <div className="container-custom">
        <h2
          id="zespol-heading"
          className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        >
          Zespół fundacji
        </h2>
        {members.length === 0 ? (
          <div className="text-center text-gray-500">
            Brak członków zespołu do wyświetlenia
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((member) => (
              <div
              key={member.id}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-sm">Zdjęcie</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
