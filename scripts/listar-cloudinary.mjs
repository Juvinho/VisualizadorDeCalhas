import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const BLOCOS = [1, 2, 5, 6, 7, 8, 9, 10, 11, 12];

async function listarPorBloco() {
  const resultado = {};

  for (const num of BLOCOS) {
    const pasta = `Blocos/${num}`;
    let imagens = [];
    let nextCursor = null;

    do {
      let search = cloudinary.search.expression(`asset_folder="${pasta}"`).max_results(500);
      if (nextCursor) {
        search = search.next_cursor(nextCursor);
      }

      const res = await search.execute();

      imagens = imagens.concat(
        res.resources.map(
          (r) => `https://res.cloudinary.com/dau9r1lhb/image/upload/q_auto,f_auto/${r.public_id}`,
        ),
      );
      nextCursor = res.next_cursor;
    } while (nextCursor);

    resultado[num] = imagens;
    console.log(`Bloco ${num}: ${imagens.length} imagens`);
  }

  fs.writeFileSync("scripts/cloudinary-por-bloco.json", JSON.stringify(resultado, null, 2));
  console.log("\nArquivo salvo em scripts/cloudinary-por-bloco.json");
}

listarPorBloco();
