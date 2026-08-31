export interface Track {
  id: number;
  title: string;
  artist: string;
  category: "louvor" | "ministeracao" | "playback" | "instrumental";
  duration: string;
  audioUrl?: string;
}

export const TRACKS: Track[] = [
  {
    id: 1,
    title: "Grande é o Senhor",
    artist: "Ministério de Louvor IEGV",
    category: "louvor",
    duration: "4:32",
  },
  {
    id: 2,
    title: "Digno é o Cordeiro",
    artist: "Ministério de Louvor IEGV",
    category: "louvor",
    duration: "5:10",
  },
  {
    id: 3,
    title: "Há Poder no Sangue",
    artist: "Ministério de Louvor IEGV",
    category: "louvor",
    duration: "3:58",
  },
  {
    id: 4,
    title: "Teu Amor Não Falha",
    artist: "Ministério de Louvor IEGV",
    category: "louvor",
    duration: "6:15",
  },
  {
    id: 5,
    title: "Quão Grande é o Meu Deus",
    artist: "Ministério de Louvor IEGV",
    category: "louvor",
    duration: "4:48",
  },
  {
    id: 6,
    title: "Ministração — Espírito Santo",
    artist: "Pr. João Carlos Silva",
    category: "ministeracao",
    duration: "45:20",
  },
  {
    id: 7,
    title: "Ministração — Fé que Move Montanhas",
    artist: "Ev. Marcos Oliveira",
    category: "ministeracao",
    duration: "38:45",
  },
  {
    id: 8,
    title: "Playback — Grande é o Senhor",
    artist: "Playback IEGV",
    category: "playback",
    duration: "4:32",
  },
  {
    id: 9,
    title: "Playback — Digno é o Cordeiro",
    artist: "Playback IEGV",
    category: "playback",
    duration: "5:10",
  },
  {
    id: 10,
    title: "Playback — Há Poder no Sangue",
    artist: "Playback IEGV",
    category: "playback",
    duration: "3:58",
  },
  {
    id: 11,
    title: "Instrumental — Paz de Deus",
    artist: "Ministério Instrumental IEGV",
    category: "instrumental",
    duration: "8:22",
  },
  {
    id: 12,
    title: "Instrumental — Descanso na Presença",
    artist: "Ministério Instrumental IEGV",
    category: "instrumental",
    duration: "12:05",
  },
];

export const TRACK_CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "louvor", label: "Louvores" },
  { id: "ministeracao", label: "Ministrações" },
  { id: "playback", label: "Playbacks" },
  { id: "instrumental", label: "Instrumental" },
];
