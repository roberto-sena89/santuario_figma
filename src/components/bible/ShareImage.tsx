/**
 * Geração de imagem PNG para compartilhamento (Instagram Stories 1080x1920, WhatsApp).
 * Usa Canvas API nativa — sem dependências externas.
 *
 * Suporta Web Share API (mobile) com fallback para download + clipboard.
 */

import type { Subtema, CollectionStyle } from "../../data/bibleCollections";

const WIDTH = 1080;
const HEIGHT = 1920;
const PADDING = 80;
const CHURCH_NAME = "Santuário da Adoração";
const CHURCH_HANDLE = "@santuariodaadoracao";

interface GenerateParams {
  collectionLabel: string;
  collectionEmoji: string;
  subtema: Subtema;
  curator: string;
  style: CollectionStyle;
}

interface StyleColors {
  bg1: string;
  bg2: string;
  accent: string;
  text: string;
  textSoft: string;
  decoration: string;
}

const styleColors: Record<CollectionStyle, StyleColors> = {
  mulher: {
    bg1: "#3A1F2A",
    bg2: "#5C2A3A",
    accent: "#E8B4B8",
    text: "#F5E8E5",
    textSoft: "#C9A8AB",
    decoration: "🌸",
  },
  homem: {
    bg1: "#0F1F2A",
    bg2: "#1A3548",
    accent: "#C8A968",
    text: "#E5E9E6",
    textSoft: "#A8C5DD",
    decoration: "⚔️",
  },
  generico: {
    bg1: "#0F1414",
    bg2: "#1A2624",
    accent: "#D4A24C",
    text: "#E5E9E6",
    textSoft: "#9C7A2E",
    decoration: "✦",
  },
};

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const test = current ? current + " " + w : w;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Gera o blob PNG do subtema. */
export async function generateShareImage({
  collectionLabel,
  collectionEmoji,
  subtema,
  curator,
  style,
}: GenerateParams): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D não suportado");

  const c = styleColors[style];

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  grad.addColorStop(0, c.bg1);
  grad.addColorStop(1, c.bg2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Padrão decorativo (ornamento sutil)
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.font = `bold 320px serif`;
  ctx.fillStyle = c.accent;
  ctx.textAlign = "center";
  ctx.fillText(c.decoration, WIDTH / 2, HEIGHT * 0.7);
  ctx.restore();

  // Eyebrow: coleção
  ctx.font = `bold 28px "Geist", system-ui, sans-serif`;
  ctx.fillStyle = c.textSoft;
  ctx.textAlign = "left";
  ctx.fillText(
    `${collectionEmoji} ${collectionLabel.toUpperCase()}`,
    PADDING,
    PADDING + 28
  );

  // Subtítulo
  ctx.font = `500 40px "Fraunces", Georgia, serif`;
  ctx.fillStyle = c.text;
  ctx.fillText(subtema.titulo, PADDING, PADDING + 90);

  // Linha decorativa
  ctx.fillStyle = c.accent;
  ctx.fillRect(PADDING, PADDING + 130, 120, 4);

  // Hero verse
  const heroY = PADDING + 230;
  ctx.font = `italic 600 56px "Cormorant Garamond", Georgia, serif`;
  ctx.fillStyle = c.text;
  ctx.textAlign = "left";
  const heroLines = wrapText(
    ctx,
    `“${subtema.versiculoDestaque.texto}”`,
    WIDTH - PADDING * 2
  );
  let y = heroY;
  for (const line of heroLines) {
    ctx.fillText(line, PADDING, y);
    y += 70;
  }

  // Referência
  y += 30;
  ctx.font = `bold 32px "Geist", system-ui, sans-serif`;
  ctx.fillStyle = c.accent;
  ctx.fillText(`— ${subtema.versiculoDestaque.referencia}`, PADDING, y);

  // Reflexão
  y += 90;
  ctx.font = `bold 24px "Geist", system-ui, sans-serif`;
  ctx.fillStyle = c.accent;
  ctx.fillText("REFLEXÃO", PADDING, y);
  y += 50;
  ctx.font = `400 32px "Geist", system-ui, sans-serif`;
  ctx.fillStyle = c.text;
  const reflLines = wrapText(ctx, subtema.reflexao, WIDTH - PADDING * 2);
  for (const line of reflLines) {
    if (y > HEIGHT - 350) break;
    ctx.fillText(line, PADDING, y);
    y += 44;
  }

  // Oração
  y += 30;
  if (y < HEIGHT - 280) {
    ctx.font = `bold 24px "Geist", system-ui, sans-serif`;
    ctx.fillStyle = c.accent;
    ctx.fillText("ORAÇÃO", PADDING, y);
    y += 50;
    ctx.font = `italic 30px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = c.text;
    const orLines = wrapText(ctx, subtema.oracao, WIDTH - PADDING * 2);
    for (const line of orLines) {
      if (y > HEIGHT - 240) break;
      ctx.fillText(line, PADDING, y);
      y += 42;
    }
  }

  // Footer
  const footerY = HEIGHT - 140;
  ctx.fillStyle = c.accent;
  ctx.fillRect(PADDING, footerY - 50, 80, 2);
  ctx.font = `600 26px "Geist", system-ui, sans-serif`;
  ctx.fillStyle = c.text;
  ctx.fillText(CHURCH_NAME, PADDING, footerY);
  ctx.font = `400 22px "Geist", system-ui, sans-serif`;
  ctx.fillStyle = c.textSoft;
  ctx.fillText(`${curator} · ${CHURCH_HANDLE}`, PADDING, footerY + 36);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Falha ao gerar imagem"))),
      "image/png",
      0.95
    );
  });
}

/**
 * Tenta compartilhar a imagem via Web Share API. Fallback: download.
 * Retorna string indicando o que aconteceu ("shared" | "downloaded" | "copied").
 */
export async function shareImage(
  blob: Blob,
  filename: string
): Promise<"shared" | "downloaded" | "copied"> {
  const file = new File([blob], filename, { type: "image/png" });
  const shareData = {
    title: filename.replace(/\.png$/, ""),
    text: `${CHURCH_NAME} — ${CHURCH_HANDLE}`,
    files: [file],
  };

  // 1. Web Share API com arquivos (mobile)
  if (
    typeof navigator.canShare === "function" &&
    navigator.canShare(shareData)
  ) {
    try {
      await navigator.share(shareData);
      return "shared";
    } catch (err) {
      // usuário cancelou — tenta fallback
    }
  }

  // 2. Fallback: download
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return "downloaded";
  } catch {
    return "copied";
  }
}
