import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const BLOCOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dau9r1lhb/image/upload/q_auto,f_auto";

const toCloudinaryUrl = (publicId) => `${CLOUDINARY_BASE_URL}/${publicId}`;

const getPreviewOrder = (resource) => {
  const text = `${resource.public_id ?? ""} ${resource.display_name ?? ""}`;
  const match = text.match(/preview_(\d+)/i);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const compareResources = (a, b) => {
  const ordemA = getPreviewOrder(a);
  const ordemB = getPreviewOrder(b);

  if (ordemA !== ordemB) {
    return ordemA - ordemB;
  }

  const createdA = a.created_at ?? "";
  const createdB = b.created_at ?? "";

  if (createdA !== createdB) {
    return createdA.localeCompare(createdB);
  }

  return String(a.public_id ?? "").localeCompare(String(b.public_id ?? ""));
};

const isTelhadoStrict = (resource) => {
  const text = `${resource.public_id ?? ""} ${resource.display_name ?? ""}`.toLowerCase();
  return text.includes("telhado") || text.includes("roof");
};

async function listarPorBloco() {
  const resultadoSincronizado = {};
  const resultadoDetalhes = {};
  const resultadoTelhados = {};

  for (const num of BLOCOS) {
    const pasta = `Blocos/${num}`;
    let recursos = [];
    let nextCursor = null;

    do {
      let search = cloudinary.search.expression(`asset_folder="${pasta}"`).max_results(500);
      if (nextCursor) {
        search = search.next_cursor(nextCursor);
      }

      const res = await search.execute();

      recursos = recursos.concat(res.resources ?? []);
      nextCursor = res.next_cursor;
    } while (nextCursor);

    const recursosOrdenados = [...recursos].sort(compareResources);

    const telhadoEstrito = recursosOrdenados.find(isTelhadoStrict);
    const telhadoSelecionado = telhadoEstrito ?? null;

    const telhadoUrl = telhadoSelecionado ? toCloudinaryUrl(telhadoSelecionado.public_id) : null;

    const detalhes = recursosOrdenados
      .filter((resource) => (telhadoSelecionado ? resource.public_id !== telhadoSelecionado.public_id : true))
      .map((resource) => toCloudinaryUrl(resource.public_id));

    resultadoSincronizado[num] = {
      imagemTelhado: telhadoUrl,
      imagens: detalhes,
    };
    resultadoDetalhes[num] = detalhes;
    resultadoTelhados[num] = telhadoUrl;

    if (telhadoEstrito) {
      console.log(`Bloco ${num}: telhado encontrado por nome (${telhadoEstrito.public_id})`);
    } else {
      console.log(`Bloco ${num}: ⚠️ Nenhuma imagem com \"telhado\" encontrada`);
    }

    console.log(`Bloco ${num}: ${detalhes.length} imagens de detalhe | telhado: ${telhadoEstrito ? "✓" : "✗"}`);
  }

  fs.writeFileSync("scripts/cloudinary-sincronizado.json", JSON.stringify(resultadoSincronizado, null, 2));
  fs.writeFileSync("scripts/cloudinary-por-bloco.json", JSON.stringify(resultadoDetalhes, null, 2));
  fs.writeFileSync("scripts/cloudinary-telhados.json", JSON.stringify(resultadoTelhados, null, 2));
  console.log(
    "\nArquivos salvos em scripts/cloudinary-sincronizado.json, scripts/cloudinary-por-bloco.json e scripts/cloudinary-telhados.json",
  );
}

listarPorBloco();
