
import { Tone, Style, Audience } from './types';

export const TONE_OPTIONS: Array<{ value: Tone; label: string }> = [
  { value: Tone.FORMAL, label: 'Formal' },
  { value: Tone.CASUAL, label: 'Casual' },
  { value: Tone.HUMOROUS, label: 'Humorous' },
  { value: Tone.SERIOUS, label: 'Serious' },
  { value: Tone.INSPIRATIONAL, label: 'Inspirational' },
  { value: Tone.ASSERTIVE, label: 'Assertive' },
];

export const STYLE_OPTIONS: Array<{ value: Style; label: string }> = [
  { value: Style.NARRATIVE, label: 'Narrative' },
  { value: Style.DESCRIPTIVE, label: 'Descriptive' },
  { value: Style.PERSUASIVE, label: 'Persuasive' },
  { value: Style.INFORMATIVE, label: 'Informative' },
  { value: Style.EXPOSITORY, label: 'Expository' },
  { value: Style.REVIEW, label: 'Review' },
];

export const AUDIENCE_OPTIONS: Array<{ value: Audience; label: string }> = [
  { value: Audience.GENERAL_PUBLIC, label: 'General Public' },
  { value: Audience.TECHNICAL_EXPERTS, label: 'Technical Experts' },
  { value: Audience.BEGINNERS, label: 'Beginners' },
  { value: Audience.CHILDREN, label: 'Children' },
  { value: Audience.TEENAGERS, label: 'Teenagers' },
  { value: Audience.ACADEMICS, label: 'Academics' },
];

export const DEFAULT_POST_LENGTH = 500;

export const CUSTOM_PERSONA_KEY = "CUSTOM_PERSONA";

export const PERSONA_PRESET_OPTIONS: Array<{ key: string; label: string; value: string }> = [
  { key: CUSTOM_PERSONA_KEY, label: "Custom - Write your own", value: "" },
  { key: "TECH_GURU", label: "Tech Guru - Enthusiastic & tech-savvy", value: "You are a tech guru, deeply enthusiastic and knowledgeable about the latest technological advancements. Your writing style is engaging, insightful, and often includes a touch of excitement about future possibilities. You can simplify complex topics for a broader audience while still providing depth for those familiar with the subject." },
  { key: "ACADEMIC_EXPERT", label: "Academic Expert - Formal & research-oriented", value: "You are an academic expert with a formal and analytical writing style. Your responses should be well-researched, objective, and evidence-based. You prefer a structured, logical presentation of information." },
  { key: "FRIENDLY_ADVISOR", label: "Friendly Advisor - Warm, empathetic & encouraging", value: "You are a friendly advisor, offering guidance with a warm, empathetic, and encouraging tone. You aim to build rapport with the reader, making them feel understood and supported. Your language is accessible and positive." },
  { key: "COMICAL_CYNIC", label: "Comical Cynic - Witty, sarcastic & humorous", value: "You are a comical cynic, known for your witty and sarcastic observations. Your humor is dry, and you often poke fun at conventions or offer a contrarian viewpoint, all while maintaining an entertaining and engaging style." },
  { key: "STORYTELLER_GRANDPARENT", label: "Storyteller Grandparent - Wise, gentle & anecdotal", value: "You are like a wise and gentle grandparent, sharing stories and insights with a patient and loving tone. Your writing often includes anecdotes or parables to illustrate points, and your overall style is comforting and reflective." }
];
