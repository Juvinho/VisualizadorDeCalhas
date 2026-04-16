# Visualizar Calhas

Site estatico em Next.js 14 + Tailwind CSS + TypeScript para visualizar falhas em calhas de 12 blocos de condominio.

## Como executar

1. Instale dependencias:

```bash
npm install
```

2. Inicie ambiente de desenvolvimento:

```bash
npm run dev
```

3. Build de producao:

```bash
npm run build
npm start
```

## Estrutura principal

- app/page.tsx: mapa aereo com hotspots
- app/bloco/[id]/page.tsx: detalhes por bloco
- data/blocos.ts: dados dos 12 blocos e links do Google Drive
- components/ImageViewer.tsx: zoom, pan e fechamento por Esc
- public/images/blocos/1..12: telhado + previews por bloco
- public/images/calhas/1..12: previews organizados por bloco

## Substituir placeholders por imagens reais

- Troque o mapa em public/images/vista-aerea.jpg
- Para cada bloco (1 a 12):
  - telhado: public/images/blocos/{id}/telhado.jpg
  - previews: public/images/blocos/{id}/previews/preview-1.jpg ate preview-3.jpg
- Atualize descricoes e links em data/blocos.ts

