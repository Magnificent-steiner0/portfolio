export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "Code2",
    skills: ["C", "C++", "Python", "TypeScript", "Java"],
  },
  {
    category: "Frontend",
    icon: "Monitor",
    skills: ["Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "Server",
    skills: ["FastAPI"],
  },
  {
    category: "AI / ML",
    icon: "Brain",
    skills: ["PyTorch", "Keras", "LangChain", "LangGraph"],
  },
  {
    category: "Database",
    icon: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    skills: ["Docker (Learning)"],
  },
  {
    category: "Tools",
    icon: "Wrench",
    skills: ["Git", "Jupyter"],
  },
];
