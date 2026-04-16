import cloudinarySincronizadoRaw from "../scripts/cloudinary-sincronizado.json";

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

const BLOCOS_COM_PASTA_NO_CLOUDINARY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type BlocoId = (typeof BLOCOS_COM_PASTA_NO_CLOUDINARY)[number];

export const MAPA_AEREO_URL =
  "https://res.cloudinary.com/dau9r1lhb/image/upload/q_auto,f_auto/DJI_20260413102229_0590_D_d91iie";

const HOTSPOTS: Record<BlocoId, Bloco["hotspot"]> = {
  1: { top: "46%", left: "13%", width: "12%", height: "26%" },
  2: { top: "46%", left: "27%", width: "12%", height: "26%" },
  3: { top: "46%", left: "41%", width: "12%", height: "26%" },
  4: { top: "46%", left: "55%", width: "12%", height: "26%" },
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
  1: "https://drive.google.com/drive/folders/1pbtNFx0T4Pb8Z2-CwoGKnJ80lNSLhegG?usp=sharing",
  2: "https://drive.google.com/drive/folders/1QO06LXBhPi2IhUDpejYxZ2HsgnK2dpOY?usp=sharing",
  3: "https://drive.google.com/drive/folders/1CU-E6VtFOzXGNJWxB50EHb67ZK37RneV?usp=sharing",
  4: "https://drive.google.com/drive/folders/16ISMCHSZHFhF6Pu1_BUMSzT7FUgXMJ1F?usp=sharing",
  5: "https://drive.google.com/drive/folders/1KjRjCgJoHP31b2qfftiANZzNyhoeq6JC?usp=sharing",
  6: "https://drive.google.com/drive/folders/1f0ddowfLtyPafGF0CDS0U0nWUlfeVv6d?usp=sharing",
  7: "https://drive.google.com/drive/folders/1557nHNNBLcPN5rsUrqKxDYBH7xX-w8TC?usp=sharing",
  8: "https://drive.google.com/drive/folders/12bGPvK_YfLPmmEpKVVefuJvytwF_T75R?usp=sharing",
  9: "https://drive.google.com/drive/folders/1FcdnO4kjGa6OGE1f2xLLY7c-EsoOi6qp?usp=sharing",
  10: "https://drive.google.com/drive/folders/1xCZz34nxpbmHarVWRryoOFj3Otz7KO1a?usp=sharing",
  11: "https://drive.google.com/drive/folders/1TcsTSbvbxoRZd4Jj-rsccN2_NuUUW-SV?usp=sharing",
  12: "https://drive.google.com/drive/folders/1jRTWCmgMUfGij2iMTd1j8qLZ16iXOad9?usp=sharing",
};

interface CloudinarySincronizadoEntry {
  imagemTelhado: string | null;
  imagens: string[];
}

const cloudinarySincronizado = cloudinarySincronizadoRaw as Record<string, CloudinarySincronizadoEntry>;

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
  const sincronizado = cloudinarySincronizado[String(id)] ?? { imagemTelhado: null, imagens: [] };
  const imagensDetalhe = ordenarImagens(filtrarImagensValidas(sincronizado.imagens ?? []));
  const imagemTelhado = sincronizado.imagemTelhado || imagensDetalhe[0] || MAPA_AEREO_URL;
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
