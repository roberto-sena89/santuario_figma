/**
 * Hook de leitura em áudio via Web Speech API (speechSynthesis).
 * Fallback: se não houver vozes pt-BR, retorna isSupported = false
 * e o caller deve ocultar o botão "Ouvir".
 */

import { useCallback, useEffect, useRef, useState } from "react";

export type AudioSpeed = 0.75 | 1 | 1.25 | 1.5;

interface VerseRef {
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

interface UseBibleAudioOptions {
  /** Locale preferido da voz. */
  lang?: string;
}

export function useBibleAudio(opts: UseBibleAudioOptions = {}) {
  const { lang = "pt-BR" } = opts;
  const [isSupported, setIsSupported] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [speed, setSpeed] = useState<AudioSpeed>(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const queueRef = useRef<VerseRef[]>([]);

  // Detecta suporte e carrega vozes
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }
    const loadVoices = () => {
      const vs = window.speechSynthesis.getVoices();
      setVoices(vs);
      // Se nem pt-BR nem pt existir, considera não suportado
      const hasPt = vs.some((v) => v.lang.toLowerCase().startsWith("pt"));
      if (vs.length > 0 && !hasPt) {
        setIsSupported(false);
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  // Aplica velocidade na utterance
  useEffect(() => {
    if (utteranceRef.current) utteranceRef.current.rate = speed;
  }, [speed]);

  const pickVoice = (): SpeechSynthesisVoice | null => {
    if (voices.length === 0) return null;
    return (
      voices.find((v) => v.lang === lang) ||
      voices.find((v) => v.lang.startsWith("pt")) ||
      voices[0] ||
      null
    );
  };

  const speak = useCallback(
    (verses: VerseRef[], startIndex = 0) => {
      if (!isSupported || typeof window === "undefined") return;
      window.speechSynthesis.cancel();
      queueRef.current = verses;
      setCurrentIndex(startIndex);
      const idx = startIndex;
      const verse = verses[idx];
      if (!verse) return;
      const utt = new SpeechSynthesisUtterance(verse.text);
      utt.lang = lang;
      utt.rate = speed;
      const voice = pickVoice();
      if (voice) utt.voice = voice;
      utt.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utt.onend = () => {
        // Vai para o próximo versículo
        if (queueRef.current.length > 0) {
          const nextIdx = idx + 1;
          if (nextIdx < queueRef.current.length) {
            setCurrentIndex(nextIdx);
            // Reentrante pequeno para deixar UI atualizar
            setTimeout(() => speak(queueRef.current, nextIdx), 120);
          } else {
            setIsSpeaking(false);
            setIsPaused(false);
            setCurrentIndex(-1);
          }
        } else {
          setIsSpeaking(false);
          setIsPaused(false);
        }
      };
      utt.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utteranceRef.current = utt;
      window.speechSynthesis.speak(utt);
    },
    [isSupported, lang, speed, voices]
  );

  const play = useCallback(
    (verses: VerseRef[]) => {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        return;
      }
      if (verses.length > 0) speak(verses, 0);
    },
    [isPaused, speak]
  );

  const pause = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentIndex(-1);
  }, []);

  const next = useCallback(() => {
    if (queueRef.current.length === 0) return;
    const ni = Math.min(currentIndex + 1, queueRef.current.length - 1);
    speak(queueRef.current, ni);
  }, [currentIndex, speak]);

  const prev = useCallback(() => {
    if (queueRef.current.length === 0) return;
    const pi = Math.max(currentIndex - 1, 0);
    speak(queueRef.current, pi);
  }, [currentIndex, speak]);

  // Limpa ao desmontar
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    currentIndex,
    speed,
    setSpeed,
    play,
    pause,
    stop,
    next,
    prev,
  };
}
