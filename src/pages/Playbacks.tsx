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

  // fallback direct fetch debug
  const [direct, setDirect] = useState(null)
  const [directErr, setDirectErr] = useState(null)
  useEffect(() => {
    fetch('/playbacks/manifest.json').then(r=>r.json()).then(m=>{
      const keys = Object.keys(m.chunks).slice(0,3)
      return Promise.all(keys.map(k=> fetch(`/playbacks/${encodeURIComponent(k)}.json`).then(r=>r.json()).then(a=>({k, len:a.length}) )))
    }).then(arr=> setDirect(arr)).catch(e=> setDirectErr(String(e)))
  }, [])

  useEffect(() => { try { localStorage.setItem('igreja:favoritas', JSON.stringify(favoritas)) } catch {} }, [favoritas])
  const toggleFav = (id) => setFavoritas(f => f.includes(id) ? f.filter(x=>x!==id) : [...f,id])

  if (erro) {
    return <main className="min-h-screen bg-background pt-24 pb-16"><div className="mx-auto max-w-6xl px-4 text-center"><p className="text-red-500">Erro hook: {String(erro)}</p></div></main>
  }

  const debugInfo = `hook lista: ${listaCompleta.length} | carregando: ${String(carregando)} | chunks: ${chunksCarregados}/${totalChunks||'?'} | direct: ${direct? JSON.stringify(direct): directErr||'carregando direct...'}`

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 pt-2">
        <div className="rounded-lg bg-muted px-3 py-2 text-xs font-mono text-muted-foreground border border-border break-all">
          DEBUG: {debugInfo}
        </div>
      </div>
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
