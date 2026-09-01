# 📸 Fotos da igreja

Coloque aqui as fotos reais da igreja e referencie em `src/config.js`:

```js
fotos: {
  hero: '/fotos/hero.jpg',   // fundo do topo — ideal 1600×900 (16:9)
  sobre: '/fotos/sobre.jpg', // seção Sobre — ideal 4:3
},
```

- Formatos aceitos: `.jpg`, `.jpeg`, `.webp`, `.png`
- Otimize antes (ex.: https://squoosh.app) — alvo < 300 KB por imagem
- Se o campo ficar vazio (`''`), o site mostra um placeholder decorativo de cruz dourada
