import { IGREJA } from '../config';

/**
 * Camada fina de analytics — blindada contra ERR_BLOCKED_BY_CLIENT.
 * - Com GA4 configurado em src/config.js (IGREJA.analytics.ga4), os eventos
 *   vão para o dataLayer (Google Tag Manager / gtag).
 * - Sem configuração, é um no-op seguro (nenhum dado sai do navegador).
 * - Se AdBlock/uBlock/Ghostery bloquear fbevents.js, gtag, GTM, etc.,
 *   o erro é silenciado e a app continua normal (comportamento esperado).
 * Eventos importantes: busca (alimenta a curadoria), abertura de player,
 * favoritar, adicionar playback e clique externo.
 */

// Filtra ruído de AdBlock no console (apenas ERR_BLOCKED_BY_CLIENT)
if (typeof window !== 'undefined' && !window.__analyticsBlockFilter) {
  window.__analyticsBlockFilter = true;
  window.addEventListener(
    'error',
    (e) => {
      const msg = e?.message || e?.error?.message || '';
      const blocked =
        msg.includes('ERR_BLOCKED_BY_CLIENT') ||
        e?.filename?.includes('fbevents.js') ||
        e?.filename?.includes('facebook.net') ||
        e?.filename?.includes('googletagmanager.com');
      if (blocked) {
        e.preventDefault();
        console.warn('[analytics] Script bloqueado pelo navegador (AdBlock). Ignorado.');
        return true;
      }
    },
    true
  );
  // Bloqueios via promise rejection (ex: loadDestinations do Segment)
  window.addEventListener('unhandledrejection', (e) => {
    const msg = String(e?.reason?.message || e?.reason || '');
    if (msg.includes('ERR_BLOCKED_BY_CLIENT') || msg.includes('fbevents')) {
      e.preventDefault();
      console.warn('[analytics] Requisição bloqueada (AdBlock). Ignorada.');
    }
  });
}

/**
 * Loader seguro para scripts de tracking (Pixel, GTM, gtag).
 * Uso: safeLoadScript('https://connect.facebook.net/en_US/fbevents.js')
 * Retorna false se bloqueado, sem throw.
 */
export function safeLoadScript(src, { id, async = true } = {}) {
  try {
    if (typeof document === 'undefined') return false;
    if (id && document.getElementById(id)) return true;
    const s = document.createElement('script');
    if (id) s.id = id;
    s.async = async;
    s.src = src;
    s.onerror = () => {
      console.warn(`[analytics] Bloqueado ou falha ao carregar: ${src}`);
    };
    // insertBefore blindado — é onde ERR_BLOCKED_BY_CLIENT estoura
    const first = document.getElementsByTagName('script')[0];
    if (first?.parentNode) {
      first.parentNode.insertBefore(s, first);
    } else {
      document.head.appendChild(s);
    }
    return true;
  } catch (err) {
    console.warn('[analytics] safeLoadScript bloqueado:', err?.message);
    return false;
  }
}

export function track(evento, params = {}) {
  try {
    const id = IGREJA.analytics?.ga4;
    if (!id) return;

    // GTM / gtag já carregado na página
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: evento, ...params });
    }
    // Facebook Pixel (se um dia configurado como IGREJA.analytics.pixelId)
    const pixelId = IGREJA.analytics?.pixelId;
    if (pixelId && typeof window !== 'undefined' && typeof window.fbq === 'function') {
      try {
        window.fbq('trackCustom', evento, params);
      } catch {
        // fbq bloqueado — ignora
      }
    }
  } catch {
    // analytics nunca deve quebrar a experiência
  }
}

export const EVENTOS = {
  busca: 'busca',
  abrirPlayer: 'abrir_player',
  abrirYouTube: 'abrir_youtube',
  favoritar: 'favoritar',
  desfavoritar: 'desfavoritar',
  adicionarPlayback: 'adicionar_playback',
  filtro: 'filtro',
  contato: 'contato_form',
};
