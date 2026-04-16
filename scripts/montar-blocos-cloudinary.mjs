import fs from "node:fs";
import path from "node:path";

const assetsPath = path.join("scripts", "cloudinary-assets.json");
const outputPath = path.join("data", "cloudinaryAssetsByBlock.ts");

if (!fs.existsSync(assetsPath)) {
  throw new Error("Arquivo scripts/cloudinary-assets.json nao encontrado. Rode: npm run cloudinary:list");
}

const raw = fs.readFileSync(assetsPath, "utf8");
const assets = JSON.parse(raw);

const blockIds = Array.from({ length: 12 }, (_, i) => i + 1);

const findBlockId = (asset) => {
  const text = [asset.folder, asset.public_id, asset.original_filename]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const patterns = [
    /(?:blocos?|block)\s*[\/_-]?\s*(1[0-2]|[1-9])\b/,
    /(?:^|[\/_-])(1[0-2]|[1-9])(?:$|[\/_-])/, 
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const id = Number(match[1]);
      if (blockIds.includes(id)) {
        return id;
      }
    }
  }

  return null;
};

const extractNumber = (asset) => {
  const text = [asset.original_filename, asset.public_id].filter(Boolean).join(" ").toLowerCase();
  const match = text.match(/(?:preview|img|image|foto)?\s*[\(_-]?\s*(\d{1,4})\b/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
};

const isRoof = (asset) => {
  const text = [asset.original_filename, asset.public_id, asset.folder].filter(Boolean).join(" ").toLowerCase();
  return /telhado|roof/.test(text);
};

const byBlock = new Map();
for (const id of blockIds) {
  byBlock.set(id, {
    roofUrl: "",
    previewUrls: [],
  });
}

for (const asset of assets) {
  const blockId = findBlockId(asset);
  if (!blockId) {
    continue;
  }

  const entry = byBlock.get(blockId);
  const optimizedUrl = asset.url || asset.secure_url;
  if (!optimizedUrl) {
    continue;
  }

  if (isRoof(asset)) {
    if (!entry.roofUrl) {
      entry.roofUrl = optimizedUrl;
    }
    continue;
  }

  entry.previewUrls.push({
    url: optimizedUrl,
    order: extractNumber(asset),
    createdAt: asset.created_at || "",
  });
}

const result = {};
for (const id of blockIds) {
  const entry = byBlock.get(id);

  const sortedPreviews = entry.previewUrls
    .sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return String(a.createdAt).localeCompare(String(b.createdAt));
    })
    .map((item) => item.url);

  result[id] = {
    roofUrl: entry.roofUrl,
    previewUrls: sortedPreviews,
  };
}

const unresolved = blockIds.filter((id) => !result[id].roofUrl || result[id].previewUrls.length === 0);

const ts = `export interface CloudinaryBlockAssets {\n  roofUrl: string;\n  previewUrls: string[];\n}\n\nexport const cloudinaryAssetsByBlock: Record<number, CloudinaryBlockAssets> = ${JSON.stringify(
  result,
  null,
  2,
)};\n`;

fs.writeFileSync(outputPath, ts, "utf8");

console.log(`Arquivo gerado: ${outputPath}`);
if (unresolved.length > 0) {
  console.log(`Blocos com dados incompletos: ${unresolved.join(", ")}`);
  process.exitCode = 2;
} else {
  console.log("Todos os 12 blocos foram mapeados com telhado + previews.");
}
