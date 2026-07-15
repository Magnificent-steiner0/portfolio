export interface Education {
  degree: string;
  institution: string;
  shortName: string;
  location: string;
  duration: string;
  startYear: number;
  endYear: number;
  achievements: string[];
  coursework: string[];
}

export const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "Khulna University of Engineering & Technology",
    shortName: "KUET",
    location: "Khulna, Bangladesh",
    duration: "2021 – July 2026",
    startYear: 2021,
    endYear: 2026,
    achievements: [
      "Undergraduate Thesis: Brain CT Explainable Classification using Multiple Instance Learning",
      "Built 5+ end-to-end AI and full-stack projects during studies",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Database Systems",
      "Operating Systems",
    ],
  },
];
