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
- data/blocos.ts: dados dos 12 blocos, links do Google Drive e URLs Cloudinary
- components/ImageViewer.tsx: zoom, pan e fechamento por Esc
- public/images/blocos/1..12: arquivos locais para referencia (ignorados no git)

## Cloudinary (producao)

- Defina a variavel de ambiente `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (local e Railway)
- Defina tambem em `.env.local`:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Estrutura recomendada no Cloudinary:
  - blocos/{id}/telhado.jpg
  - blocos/{id}/preview-1.jpg, preview-2.jpg, ...
- O projeto aplica `q_auto,f_auto` automaticamente nas URLs das imagens

### Buscar assets e montar mapeamento automaticamente

```bash
npm run cloudinary:sync
```

- `cloudinary:list` gera `scripts/cloudinary-assets.json`
- `cloudinary:map` gera `data/cloudinaryAssetsByBlock.ts` com URLs reais por bloco
- O `data/blocos.ts` consome esse arquivo automaticamente

## Substituir placeholders por imagens reais

- Troque o mapa em public/images/vista-aerea.jpg
- Para cada bloco (1 a 12):
  - telhado: public/images/blocos/{id}/telhado.jpg
  - previews: public/images/blocos/{id}/preview-1.jpg em diante
- Atualize descricoes e links em data/blocos.ts

