/**
 * Padrão de descrição: "Nome da Música — Nome do Cantor"
 * Usado em todo o site abaixo dos vídeos.
 */
export function formatDescricao(m: any): string {
  if (!m) return '';
  const titulo = (m.titulo || '').trim();
  const artista = (m.artista || '').trim();
  const isDesconhecido =
    !artista ||
    artista.toLowerCase() === 'desconhecido' ||
    artista.toLowerCase() === 'artista desconhecido';
  if (!titulo) return artista || '';
  if (isDesconhecido) return titulo;
  return `${titulo} — ${artista}`;
}

export function formatTituloArtista(titulo: any, artista: any): string {
  return formatDescricao({ titulo, artista });
}

/**
 * Remove acentos e normaliza para caixa baixa (busca e ordenação).
 */
export function normalizar(s: any): string {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase();
}