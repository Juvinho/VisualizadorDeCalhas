import cloudinaryPorBlocoRaw from "../scripts/cloudinary-por-bloco.json";
import cloudinaryTelhadosRaw from "../scripts/cloudinary-telhados.json";

export interface Bloco {
  id: number;
  nome: string;
  hotspot: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  imagemTelhado: string;
  fotosCalhas: {
    src: string;
    descricao: string;
  }[];
  linkGoogleDrive: string;
}

const BLOCOS_COM_PASTA_NO_CLOUDINARY = [1, 2, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type BlocoId = (typeof BLOCOS_COM_PASTA_NO_CLOUDINARY)[number];

export const MAPA_AEREO_URL =
  "https://res.cloudinary.com/dau9r1lhb/image/upload/q_auto,f_auto/DJI_20260413102229_0590_D_d91iie";

const HOTSPOTS: Record<BlocoId, Bloco["hotspot"]> = {
  1: { top: "46%", left: "13%", width: "12%", height: "26%" },
  2: { top: "46%", left: "27%", width: "12%", height: "26%" },
  5: { top: "46%", left: "69%", width: "12%", height: "26%" },
  6: { top: "46%", left: "82%", width: "11%", height: "26%" },
  7: { top: "18.7%", left: "13%", width: "12%", height: "24%" },
  8: { top: "18.7%", left: "27%", width: "12%", height: "24%" },
  9: { top: "18.7%", left: "41%", width: "12%", height: "24%" },
  10: { top: "18.7%", left: "55%", width: "12%", height: "24%" },
  11: { top: "18.7%", left: "69%", width: "12%", height: "24%" },
  12: { top: "18.7%", left: "82%", width: "11%", height: "24%" },
};

const DRIVE_LINKS: Record<BlocoId, string> = {
  1: "https://drive.google.com/drive/folders/1BLOCO001_PLACEHOLDER",
  2: "https://drive.google.com/drive/folders/1BLOCO002_PLACEHOLDER",
  5: "https://drive.google.com/drive/folders/1BLOCO005_PLACEHOLDER",
  6: "https://drive.google.com/drive/folders/1BLOCO006_PLACEHOLDER",
  7: "https://drive.google.com/drive/folders/1BLOCO007_PLACEHOLDER",
  8: "https://drive.google.com/drive/folders/1BLOCO008_PLACEHOLDER",
  9: "https://drive.google.com/drive/folders/1BLOCO009_PLACEHOLDER",
  10: "https://drive.google.com/drive/folders/1BLOCO010_PLACEHOLDER",
  11: "https://drive.google.com/drive/folders/1BLOCO011_PLACEHOLDER",
  12: "https://drive.google.com/drive/folders/1BLOCO012_PLACEHOLDER",
};

const cloudinaryPorBloco = cloudinaryPorBlocoRaw as Record<string, string[]>;
const cloudinaryTelhados = cloudinaryTelhadosRaw as Record<string, string>;

const extrairOrdemPreview = (url: string) => {
  const match = url.match(/\/Preview_(\d+)/i);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const ordenarImagens = (imagens: string[]) =>
  [...imagens].sort((a, b) => {
    const ordemA = extrairOrdemPreview(a);
    const ordemB = extrairOrdemPreview(b);

    if (ordemA !== ordemB) {
      return ordemA - ordemB;
    }

    return a.localeCompare(b);
  });

const filtrarImagensValidas = (imagens: string[]) =>
  imagens.filter(
    (url) =>
      url.startsWith("https://res.cloudinary.com/dau9r1lhb/image/upload/") &&
      !url.includes("/samples/"),
  );

const montarFotosCalhas = (imagens: string[], nomeBloco: string) =>
  imagens.map((src, index) => ({
    src,
    descricao: `Sequencia ${index + 1}/${imagens.length} - ${nomeBloco}`,
  }));

export const blocos: Bloco[] = BLOCOS_COM_PASTA_NO_CLOUDINARY.map((id) => {
  const nome = `Bloco ${id}`;
  const imagensDetalhe = ordenarImagens(filtrarImagensValidas(cloudinaryPorBloco[String(id)] ?? []));
  const imagemTelhado = cloudinaryTelhados[String(id)] || imagensDetalhe[0] || MAPA_AEREO_URL;
  const imagensSemTelhado = imagensDetalhe.filter((url) => url !== imagemTelhado);
  const imagensParaGaleria = imagensSemTelhado.length > 0 ? imagensSemTelhado : imagensDetalhe;

  return {
    id,
    nome,
    hotspot: HOTSPOTS[id],
    imagemTelhado,
    fotosCalhas: montarFotosCalhas(imagensParaGaleria, nome),
    linkGoogleDrive: DRIVE_LINKS[id],
  };
});

export const getBlocoById = (id: number) => blocos.find((bloco) => bloco.id === id);
