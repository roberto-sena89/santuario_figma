// Helpers — dados ficam em /public/playbacks/*.json (chunks A-Z + manifest)
export const CATEGORIAS = [
  'Adoração',
  'Louvor/Celebração',
  'Oração/Clamor',
  'Fé e Vitória',
  'Gratidão',
  'Restauração e Cura',
  'Consolo e Esperança',
  'Espírito Santo',
  'Geral',
];

export const thumb = (id, size = 'mqdefault') => `https://i.ytimg.com/vi/${id}/${size}.jpg`;

// Para compatibilidade: re-exporta vazio; App.jsx agora faz fetch via chunks.
export const PLAYBACKS = [];

export async function fetchPlaybacks() {
  const m = await fetch('/playbacks/manifest.json').then((r) => {
    if (!r.ok) throw new Error('manifest missing');
    return r.json();
  });
  const keys = Object.keys(m.chunks || {});
  const chunks = await Promise.all(
    keys.map((k) => fetch(`/playbacks/${k}.json`).then((r) => (r.ok ? r.json() : [])))
  );
  return chunks.flat();
}
