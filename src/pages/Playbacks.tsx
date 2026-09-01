import { useState, useEffect } from 'react'
import PlaybackGrid from '../components/media/PlaybackGrid.jsx'
import PlayerModal from '../components/media/PlayerModal.jsx'
import { usePlaybacks } from '../hooks/usePlaybacks.js'

export default function Playbacks() {
  const [playerVideo, setPlayerVideo] = useState(null)
  const [favoritas, setFavoritas] = useState(() => {
    try { return JSON.parse(localStorage.getItem('igreja:favoritas') || '[]') } catch { return [] }
  })
  const hook = usePlaybacks()
  const { listaCompleta, idsAdicionados, carregando, erro, chunksCarregados, totalChunks, ensureChunksForQuery, handleRemover } = hook

  useEffect(() => { try { localStorage.setItem('igreja:favoritas', JSON.stringify(favoritas)) } catch {} }, [favoritas])
  const toggleFav = (id) => setFavoritas(f => f.includes(id) ? f.filter(x=>x!==id) : [...f,id])

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
