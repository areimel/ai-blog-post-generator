export enum Tone {
  FORMAL = "Formal",
  CASUAL = "Casual",
  HUMOROUS = "Humorous",
  SERIOUS = "Serious",
  INSPIRATIONAL = "Inspirational",
  ASSERTIVE = "Assertive",
}

export enum Style {
  NARRATIVE = "Narrative",
  DESCRIPTIVE = "Descriptive",
  PERSUASIVE = "Persuasive",
  INFORMATIVE = "Informative",
  EXPOSITORY = "Expository",
  REVIEW = "Review",
}

export enum Audience {
  GENERAL_PUBLIC = "General Public",
  TECHNICAL_EXPERTS = "Technical Experts",
  BEGINNERS = "Beginners",
  CHILDREN = "Children",
  TEENAGERS = "Teenagers",
  ACADEMICS = "Academics",
}

export interface BlogPostRequest {
  topic: string;
  persona?: string; // Optional persona description
  tone: Tone;
  style: Style;
  length: number; // Approximate word count
  audience: Audience;
}