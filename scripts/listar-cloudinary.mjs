import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Credenciais ausentes. Preencha CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET em .env.local",
  );
}

if (/SUA_API_KEY|SEU_API_SECRET/i.test(`${apiKey} ${apiSecret}`)) {
  throw new Error("Credenciais placeholder detectadas em .env.local. Substitua por valores reais do Cloudinary.");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

async function listarTodos() {
  let recursos = [];
  let nextCursor;

  do {
    const resultado = await cloudinary.api.resources({
      type: "upload",
      max_results: 500,
      next_cursor: nextCursor,
    });

    recursos = recursos.concat(resultado.resources || []);
    nextCursor = resultado.next_cursor;
  } while (nextCursor);

  const saida = recursos.map((r) => ({
    asset_id: r.asset_id,
    public_id: r.public_id,
    original_filename: r.original_filename,
    folder: r.folder || "",
    format: r.format,
    created_at: r.created_at,
    bytes: r.bytes,
    width: r.width,
    height: r.height,
    secure_url: r.secure_url,
    url: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${r.public_id}`,
  }));

  const outPath = path.join("scripts", "cloudinary-assets.json");
  fs.writeFileSync(outPath, JSON.stringify(saida, null, 2), "utf8");

  console.log(`Total de imagens encontradas: ${saida.length}`);
  console.log(`Arquivo gerado: ${outPath}`);
}

listarTodos().catch((error) => {
  const detail =
    error?.message || error?.error?.message || (typeof error === "string" ? error : JSON.stringify(error));
  console.error("Falha ao listar assets do Cloudinary:", detail);
  process.exit(1);
});
