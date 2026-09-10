import { useState, useEffect } from 'react'
import PlaybackGrid from '../components/media/PlaybackGrid'
import PlayerModal from '../components/media/PlayerModal'
import { usePlaybacks } from '../hooks/usePlaybacks'
import type { PlaybackItem } from '../components/media/PlaybackGrid'

export default function Playbacks() {
  const [playerVideo, setPlayerVideo] = useState<PlaybackItem | null>(null)
  const [favoritas, setFavoritas] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('igreja:favoritas') || '[]') } catch { return [] }
  })
  const hook = usePlaybacks()
  const { listaCompleta, idsAdicionados, carregando, erro, chunksCarregados, totalChunks, ensureChunksForQuery, handleRemover } = hook

  useEffect(() => { try { localStorage.setItem('igreja:favoritas', JSON.stringify(favoritas)) } catch {} }, [favoritas])
  const toggleFav = (id: string) => setFavoritas((f: string[]) => f.includes(id) ? f.filter(x=>x!==id) : [...f,id])

  if (erro) {
    return <main className="min-h-screen bg-background pt-24 pb-16"><div className="mx-auto max-w-6xl px-4 text-center"><p className="text-error">Erro ao carregar playbacks: {String(erro)}</p></div></main>
  }

  return (
    <main className="min-h-screen bg-background">
      <PlaybackGrid
        lista={listaCompleta}
        favoritas={favoritas}
        toggleFav={toggleFav}
        idsAdicionados={idsAdicionados}
        onRemoverAdicionado={handleRemover}
        onAbrirPlayer={setPlayerVideo}
        carregando={carregando}
        onBuscaChange={ensureChunksForQuery}
        chunksInfo={totalChunks ? { carregados: chunksCarregados, total: totalChunks } : null}
      />
      <PlayerModal video={playerVideo} onClose={() => setPlayerVideo(null)} />
    </main>
  )
}
