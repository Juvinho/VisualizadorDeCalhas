"use client";

import Image from "next/image";
import { useState } from "react";
import HotspotBloco from "./HotspotBloco";
import { getBlurDataURL } from "../lib/blurDataUrl";

const BASE_ZOOM = 1.18;
const MIN_ZOOM = 1;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.08;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

interface MapaHotspot {
  id: number;
  nome: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

interface MapaAereoInterativoProps {
  src: string;
  hotspots: MapaHotspot[];
}

export default function MapaAereoInterativo({ src, hotspots }: MapaAereoInterativoProps) {
  const [zoom, setZoom] = useState(BASE_ZOOM);

  const zoomPercent = Math.round((zoom / BASE_ZOOM) * 100);
  const canZoomOut = zoom > MIN_ZOOM;
  const canZoomIn = zoom < MAX_ZOOM;

  return (
    <div className="mapa-container relative w-full overflow-hidden rounded-xl">
      <div className="absolute right-3 top-3 z-30 flex items-center gap-2 rounded-lg border border-black/10 bg-white/95 p-1 shadow-soft backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setZoom((current) => clamp(current - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM))}
          disabled={!canZoomOut}
          aria-label="Diminuir zoom do mapa"
          className="h-8 w-8 rounded-md border border-black/10 text-lg font-semibold text-surface-text transition-colors hover:bg-surface-base disabled:cursor-not-allowed disabled:opacity-40"
        >
          -
        </button>
        <button
          type="button"
          onClick={() => setZoom(BASE_ZOOM)}
          aria-label="Voltar zoom padrao"
          className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold text-surface-text transition-colors hover:bg-surface-base"
        >
          {zoomPercent}%
        </button>
        <button
          type="button"
          onClick={() => setZoom((current) => clamp(current + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM))}
          disabled={!canZoomIn}
          aria-label="Aumentar zoom do mapa"
          className="h-8 w-8 rounded-md border border-black/10 text-lg font-semibold text-surface-text transition-colors hover:bg-surface-base disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>

      <div
        className="relative origin-center transition-transform duration-200"
        style={{ transform: `scale(${zoom})` }}
      >
        <Image
          src={src}
          alt="Imagem aerea do condominio com 12 blocos"
          width={4096}
          height={3072}
          priority
          placeholder="blur"
          blurDataURL={getBlurDataURL(4096, 3072)}
          className="block h-auto w-full object-cover object-center"
        />

        {hotspots.map((hotspot) => (
          <HotspotBloco
            key={hotspot.id}
            id={hotspot.id}
            nome={hotspot.nome}
            top={hotspot.top}
            left={hotspot.left}
            width={hotspot.width}
            height={hotspot.height}
          />
        ))}
      </div>
    </div>
  );
}
