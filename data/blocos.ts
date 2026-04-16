import { cloudinaryAssetsByBlock } from "./cloudinaryAssetsByBlock";

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

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "SEU_CLOUD_NAME";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto`;

const toCloudinaryUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.replace(/^\/+/, "").replace(/^images\//, "");
  return `${CLOUDINARY_BASE_URL}/${normalizedPath}`;
};

const mapBlocoFotos = (bloco: Bloco, overrideUrls: string[]) =>
  overrideUrls.map((url, index) => ({
    src: toCloudinaryUrl(url),
    descricao:
      bloco.fotosCalhas[index]?.descricao ?? `Sequencia ${index + 1}/${overrideUrls.length} - ${bloco.nome}`,
  }));

const blocosBase: Bloco[] = [
  {
    id: 7,
    nome: "Bloco 7",
    hotspot: { top: "18.7%", left: "13%", width: "12%", height: "24%" },
    imagemTelhado: "/images/blocos/7/telhado.jpg",
    fotosCalhas: Array.from({ length: 47 }, (_, index) => ({
      src: `/images/blocos/7/preview-${index + 1}.jpg`,
      descricao: `Sequencia ${index + 1}/47 - Bloco 7`,
    })),
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO007_PLACEHOLDER",
  },
  {
    id: 8,
    nome: "Bloco 8",
    hotspot: { top: "18.7%", left: "27%", width: "12%", height: "24%" },
    imagemTelhado: "/images/blocos/8/telhado.jpg",
    fotosCalhas: Array.from({ length: 54 }, (_, index) => ({
      src: `/images/blocos/8/preview-${index + 1}.jpg`,
      descricao: `Sequencia ${index + 1}/54 - Bloco 8`,
    })),
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO008_PLACEHOLDER",
  },
  {
    id: 9,
    nome: "Bloco 9",
    hotspot: { top: "18.7%", left: "41%", width: "12%", height: "24%" },
    imagemTelhado: "/images/blocos/9/telhado.jpg",
    fotosCalhas: Array.from({ length: 47 }, (_, index) => ({
      src: `/images/blocos/9/preview-${index + 1}.jpg`,
      descricao: `Sequencia ${index + 1}/47 - Bloco 9`,
    })),
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO009_PLACEHOLDER",
  },
  {
    id: 10,
    nome: "Bloco 10",
    hotspot: { top: "18.7%", left: "55%", width: "12%", height: "24%" },
    imagemTelhado: "/images/blocos/10/telhado.jpg",
    fotosCalhas: Array.from({ length: 49 }, (_, index) => ({
      src: `/images/blocos/10/preview-${index + 1}.jpg`,
      descricao: `Sequencia ${index + 1}/49 - Bloco 10`,
    })),
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO010_PLACEHOLDER",
  },
  {
    id: 11,
    nome: "Bloco 11",
    hotspot: { top: "18.7%", left: "69%", width: "12%", height: "24%" },
    imagemTelhado: "/images/blocos/11/telhado.jpg",
    fotosCalhas: Array.from({ length: 40 }, (_, index) => ({
      src: `/images/blocos/11/preview-${index + 1}.jpg`,
      descricao: `Sequencia ${index + 1}/40 - Bloco 11`,
    })),
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO011_PLACEHOLDER",
  },
  {
    id: 12,
    nome: "Bloco 12",
    hotspot: { top: "18.7%", left: "82%", width: "11%", height: "24%" },
    imagemTelhado: "/images/blocos/12/telhado.jpg",
    fotosCalhas: Array.from({ length: 43 }, (_, index) => ({
      src: `/images/blocos/12/preview-${index + 1}.jpg`,
      descricao: `Sequencia ${index + 1}/43 - Bloco 12`,
    })),
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO012_PLACEHOLDER",
  },
  {
    id: 1,
    nome: "Bloco 1",
    hotspot: { top: "46%", left: "13%", width: "12%", height: "26%" },
    imagemTelhado: "/images/blocos/1/telhado.jpg",
    fotosCalhas: [
      {
        src: "/images/blocos/1/preview-1.jpg",
        descricao: "Sequencia 1/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-2.jpg",
        descricao: "Sequencia 2/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-3.jpg",
        descricao: "Sequencia 3/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-4.jpg",
        descricao: "Sequencia 4/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-5.jpg",
        descricao: "Sequencia 5/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-6.jpg",
        descricao: "Sequencia 6/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-7.jpg",
        descricao: "Sequencia 7/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-8.jpg",
        descricao: "Sequencia 8/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-9.jpg",
        descricao: "Sequencia 9/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-10.jpg",
        descricao: "Sequencia 10/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-11.jpg",
        descricao: "Sequencia 11/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-12.jpg",
        descricao: "Sequencia 12/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-13.jpg",
        descricao: "Sequencia 13/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-14.jpg",
        descricao: "Sequencia 14/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-15.jpg",
        descricao: "Sequencia 15/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-16.jpg",
        descricao: "Sequencia 16/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-17.jpg",
        descricao: "Sequencia 17/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-18.jpg",
        descricao: "Sequencia 18/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-19.jpg",
        descricao: "Sequencia 19/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-20.jpg",
        descricao: "Sequencia 20/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-21.jpg",
        descricao: "Sequencia 21/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-22.jpg",
        descricao: "Sequencia 22/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-23.jpg",
        descricao: "Sequencia 23/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-24.jpg",
        descricao: "Sequencia 24/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-25.jpg",
        descricao: "Sequencia 25/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-26.jpg",
        descricao: "Sequencia 26/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-27.jpg",
        descricao: "Sequencia 27/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-28.jpg",
        descricao: "Sequencia 28/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-29.jpg",
        descricao: "Sequencia 29/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-30.jpg",
        descricao: "Sequencia 30/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-31.jpg",
        descricao: "Sequencia 31/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-32.jpg",
        descricao: "Sequencia 32/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-33.jpg",
        descricao: "Sequencia 33/34 - Bloco 1",
      },
      {
        src: "/images/blocos/1/preview-34.jpg",
        descricao: "Sequencia 34/34 - Bloco 1",
      },
    ],
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO001_PLACEHOLDER",
  },
  {
    id: 2,
    nome: "Bloco 2",
    hotspot: { top: "46%", left: "27%", width: "12%", height: "26%" },
    imagemTelhado: "/images/blocos/2/telhado.jpg",
    fotosCalhas: [
      {
        src: "/images/blocos/2/preview-1.jpg",
        descricao: "Sequencia 1/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-2.jpg",
        descricao: "Sequencia 2/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-3.jpg",
        descricao: "Sequencia 3/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-4.jpg",
        descricao: "Sequencia 4/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-5.jpg",
        descricao: "Sequencia 5/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-6.jpg",
        descricao: "Sequencia 6/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-7.jpg",
        descricao: "Sequencia 7/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-8.jpg",
        descricao: "Sequencia 8/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-9.jpg",
        descricao: "Sequencia 9/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-10.jpg",
        descricao: "Sequencia 10/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-11.jpg",
        descricao: "Sequencia 11/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-12.jpg",
        descricao: "Sequencia 12/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-13.jpg",
        descricao: "Sequencia 13/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-14.jpg",
        descricao: "Sequencia 14/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-15.jpg",
        descricao: "Sequencia 15/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-16.jpg",
        descricao: "Sequencia 16/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-17.jpg",
        descricao: "Sequencia 17/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-18.jpg",
        descricao: "Sequencia 18/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-19.jpg",
        descricao: "Sequencia 19/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-20.jpg",
        descricao: "Sequencia 20/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-21.jpg",
        descricao: "Sequencia 21/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-22.jpg",
        descricao: "Sequencia 22/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-23.jpg",
        descricao: "Sequencia 23/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-24.jpg",
        descricao: "Sequencia 24/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-25.jpg",
        descricao: "Sequencia 25/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-26.jpg",
        descricao: "Sequencia 26/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-27.jpg",
        descricao: "Sequencia 27/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-28.jpg",
        descricao: "Sequencia 28/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-29.jpg",
        descricao: "Sequencia 29/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-30.jpg",
        descricao: "Sequencia 30/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-31.jpg",
        descricao: "Sequencia 31/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-32.jpg",
        descricao: "Sequencia 32/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-33.jpg",
        descricao: "Sequencia 33/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-34.jpg",
        descricao: "Sequencia 34/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-35.jpg",
        descricao: "Sequencia 35/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-36.jpg",
        descricao: "Sequencia 36/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-37.jpg",
        descricao: "Sequencia 37/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-38.jpg",
        descricao: "Sequencia 38/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-39.jpg",
        descricao: "Sequencia 39/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-40.jpg",
        descricao: "Sequencia 40/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-41.jpg",
        descricao: "Sequencia 41/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-42.jpg",
        descricao: "Sequencia 42/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-43.jpg",
        descricao: "Sequencia 43/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-44.jpg",
        descricao: "Sequencia 44/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-45.jpg",
        descricao: "Sequencia 45/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-46.jpg",
        descricao: "Sequencia 46/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-47.jpg",
        descricao: "Sequencia 47/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-48.jpg",
        descricao: "Sequencia 48/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-49.jpg",
        descricao: "Sequencia 49/50 - Bloco 2",
      },
      {
        src: "/images/blocos/2/preview-50.jpg",
        descricao: "Sequencia 50/50 - Bloco 2",
      },
    ],
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO002_PLACEHOLDER",
  },
  {
    id: 3,
    nome: "Bloco 3",
    hotspot: { top: "46%", left: "41%", width: "12%", height: "26%" },
    imagemTelhado: "/images/blocos/3/telhado.jpg",
    fotosCalhas: [
      {
        src: "/images/blocos/3/preview-1.jpg",
        descricao: "Calha com acumulo de detritos - Bloco 3, lateral norte",
      },
      {
        src: "/images/blocos/3/preview-2.jpg",
        descricao: "Parafuso solto na calha frontal - Bloco 3",
      },
      {
        src: "/images/blocos/3/preview-3.jpg",
        descricao: "Ponto de infiltracao na juncao - Bloco 3",
      },
    ],
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO003_PLACEHOLDER",
  },
  {
    id: 4,
    nome: "Bloco 4",
    hotspot: { top: "46%", left: "55%", width: "12%", height: "26%" },
    imagemTelhado: "/images/blocos/4/telhado.jpg",
    fotosCalhas: [
      {
        src: "/images/blocos/4/preview-1.jpg",
        descricao: "Calha com oxidacao superficial - Bloco 4",
      },
      {
        src: "/images/blocos/4/preview-2.jpg",
        descricao: "Desnivel com acumulo de agua - Bloco 4",
      },
      {
        src: "/images/blocos/4/preview-3.jpg",
        descricao: "Vedacao antiga com desgaste - Bloco 4",
      },
    ],
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO004_PLACEHOLDER",
  },
  {
    id: 5,
    nome: "Bloco 5",
    hotspot: { top: "46%", left: "69%", width: "12%", height: "26%" },
    imagemTelhado: "/images/blocos/5/telhado.jpg",
    fotosCalhas: [
      {
        src: "/images/blocos/5/preview-1.jpg",
        descricao: "Sequencia 1/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-2.jpg",
        descricao: "Sequencia 2/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-3.jpg",
        descricao: "Sequencia 3/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-4.jpg",
        descricao: "Sequencia 4/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-5.jpg",
        descricao: "Sequencia 5/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-6.jpg",
        descricao: "Sequencia 6/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-7.jpg",
        descricao: "Sequencia 7/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-8.jpg",
        descricao: "Sequencia 8/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-9.jpg",
        descricao: "Sequencia 9/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-10.jpg",
        descricao: "Sequencia 10/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-11.jpg",
        descricao: "Sequencia 11/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-12.jpg",
        descricao: "Sequencia 12/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-13.jpg",
        descricao: "Sequencia 13/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-14.jpg",
        descricao: "Sequencia 14/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-15.jpg",
        descricao: "Sequencia 15/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-16.jpg",
        descricao: "Sequencia 16/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-17.jpg",
        descricao: "Sequencia 17/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-18.jpg",
        descricao: "Sequencia 18/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-19.jpg",
        descricao: "Sequencia 19/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-20.jpg",
        descricao: "Sequencia 20/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-21.jpg",
        descricao: "Sequencia 21/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-22.jpg",
        descricao: "Sequencia 22/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-23.jpg",
        descricao: "Sequencia 23/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-24.jpg",
        descricao: "Sequencia 24/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-25.jpg",
        descricao: "Sequencia 25/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-26.jpg",
        descricao: "Sequencia 26/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-27.jpg",
        descricao: "Sequencia 27/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-28.jpg",
        descricao: "Sequencia 28/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-29.jpg",
        descricao: "Sequencia 29/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-30.jpg",
        descricao: "Sequencia 30/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-31.jpg",
        descricao: "Sequencia 31/32 - Bloco 5",
      },
      {
        src: "/images/blocos/5/preview-32.jpg",
        descricao: "Sequencia 32/32 - Bloco 5",
      },
    ],
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO005_PLACEHOLDER",
  },
  {
    id: 6,
    nome: "Bloco 6",
    hotspot: { top: "46%", left: "82%", width: "11%", height: "26%" },
    imagemTelhado: "/images/blocos/6/telhado.jpg",
    fotosCalhas: Array.from({ length: 59 }, (_, index) => ({
      src: `/images/blocos/6/preview-${index + 1}.jpg`,
      descricao: `Sequencia ${index + 1}/59 - Bloco 6`,
    })),
    linkGoogleDrive: "https://drive.google.com/drive/folders/1BLOCO006_PLACEHOLDER",
  },
];

export const blocos: Bloco[] = blocosBase.map((bloco) => {
  const cloudinaryOverride = cloudinaryAssetsByBlock[bloco.id];
  const hasRoofOverride = !!cloudinaryOverride?.roofUrl;
  const hasPreviewOverride = !!cloudinaryOverride?.previewUrls?.length;

  return {
    ...bloco,
    imagemTelhado: hasRoofOverride
      ? toCloudinaryUrl(cloudinaryOverride.roofUrl)
      : toCloudinaryUrl(bloco.imagemTelhado),
    fotosCalhas: hasPreviewOverride
      ? mapBlocoFotos(bloco, cloudinaryOverride.previewUrls)
      : bloco.fotosCalhas.map((foto) => ({
          ...foto,
          src: toCloudinaryUrl(foto.src),
        })),
  };
});

export const getBlocoById = (id: number) => blocos.find((bloco) => bloco.id === id);

