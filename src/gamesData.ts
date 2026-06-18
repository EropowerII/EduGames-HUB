export type Subject = "Lenguaje" | "Matemáticas";

export type Game = {
  id: string;
  title: string;
  subject: Subject;
  skill: string;
  age: string;
  description: string;
  playUrl: string;
  thumbnail: string;
};

export const games: Game[] = [
  {
    id: "mago-palabra",
    title: "MagoPalabra",
    subject: "Lenguaje",
    skill: "reconocimiento de sílabas",
    age: "8 a 10",
    description:
      "Una aventura de palabras donde los estudiantes aprenden a identificar palabras agudas, graves y esdrújulas.",
    playUrl: "https://eropowerii.github.io/MagoPalabra/",
    thumbnail: "GameAssets/Thumbnails/MagoPalabra.png",
  },
  {
    id: "matheosaurus",
    title: "Matheosaurus",
    subject: "Matemáticas",
    skill: "Sentido numérico y aritmética",
    age: "8 a 10",
    description:
      "Un reto matemático de tamaño jurásico para practicar operaciones, cálculo mental y resolución de problemas en rondas cortas.",
    playUrl: "https://eropowerii.github.io/Matheosaurus/",
    thumbnail: "GameAssets/Thumbnails/Matheosaurus.png",
  },
];

export const subjects = ["Todos", ...new Set(games.map((game) => game.subject))] as const;

export type SubjectFilter = (typeof subjects)[number];
