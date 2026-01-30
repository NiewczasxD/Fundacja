export interface TeamMember {
  name: string;
  position: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Paweł Minkina",
    position: "Prezes Zarządu",
    image: "/team/pawel-minkina.jpg",
  },
  {
    name: "Agata Minkina",
    position: "Członek Zarządu",
    image: "/team/agata-minkina.jpg",
  },
  {
    name: "Michał Kotecki",
    position: "Członek Zarządu",
    image: "/team/michal-kotecki.jpg",
  },
];
