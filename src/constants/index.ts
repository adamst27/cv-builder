export const inputs = [
  {
    title: "PersoInfo",
    inputs: [
      { type: "text", label: "Full Name", name: "fullName" },
      { type: "email", label: "Email", name: "email" },
      { type: "tel", label: "Phone Number", name: "phoneNumber" },
      { type: "text", label: "LinkedIn Profile", name: "linkedInProfile" },
      { type: "text", label: "GitHub Profile", name: "gitHubProfile" },
      { type: "text", label: "Portfolio Website", name: "portfolioWebsite" },
      { type: "textarea", label: "Summary", name: "summary" },
    ],
  },
  {
    title: "Education",
    inputs: [
      { type: "text", label: "Degree", name: "degree" },
      { type: "text", label: "University/College", name: "university" },
    ],
  },
  {
    title: "Experience",
    inputs: [
      { type: "text", label: "Job Title", name: "jobTitle" },
      { type: "text", label: "Company", name: "company" },
      { type: "text", label: "Location", name: "location" },
      { type: "date", label: "Start Date", name: "startDate" },
      { type: "date", label: "End Date", name: "endDate" },
      {
        type: "textarea",
        label: "Responsibilities and Achievements",
        name: "responsibilitiesAndAchievements",
      },
    ],
  },
  {
    title: "Projects",
    inputs: [
      { type: "text", label: "Project Title", name: "projectTitle" },
      { type: "text", label: "Link", name: "link" },
      { type: "text", label: "Technologies Used", name: "technologiesUsed" },
      { type: "textarea", label: "Description", name: "description" },
    ],
  },
  {
    title: "Skills",
    inputs: [
      {
        type: "text",
        label: "Programming Languages",
        name: "programmingLanguages",
      },
      {
        type: "text",
        label: "Frameworks and Libraries",
        name: "frameworksAndLibraries",
      },
      { type: "text", label: "Tools and Platforms", name: "toolsAndPlatforms" },
      { type: "text", label: "Soft Skills", name: "softSkills" },
    ],
  },
];
