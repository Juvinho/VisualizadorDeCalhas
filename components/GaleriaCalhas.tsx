"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImageViewer from "./ImageViewer";
import { getBlurDataURL } from "../lib/blurDataUrl";

interface FotoCalha {
  src: string;
  descricao: string;
}

interface GaleriaCalhasProps {
  fotos: FotoCalha[];
  blocoNome: string;
}

export default function GaleriaCalhas({ fotos, blocoNome }: GaleriaCalhasProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasAutoOpenedRef = useRef(false);
  const previewCards = fotos.slice(0, 3);

  useEffect(() => {
    if (fotos.length > 3 && !hasAutoOpenedRef.current) {
      hasAutoOpenedRef.current = true;
      setSelectedIndex(0);
    }
  }, [fotos.length]);

  return (
    <>
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-surface-text">Preview de Problemas</h3>
          <span className="text-xs font-medium text-surface-text/70 sm:text-sm">{fotos.length} imagens</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {previewCards.map((foto, index) => (
            <button
              key={`${foto.src}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              title={foto.descricao}
              className="group overflow-hidden rounded-lg border border-black/10 bg-white text-left shadow-soft transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/30"
              aria-label={`Ampliar foto ${index + 1}: ${foto.descricao}`}
            >
              <Image
                src={foto.src}
                alt={foto.descricao}
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL={getBlurDataURL(300, 200)}
                className="h-[160px] w-full object-cover md:h-[120px] lg:h-[140px] xl:h-[120px]"
              />
              <p className="line-clamp-2 px-3 py-2 text-xs text-surface-text/80">{foto.descricao}</p>
            </button>
          ))}
        </div>

        {fotos.length > 3 && (
          <button
            type="button"
            onClick={() => setSelectedIndex(0)}
            className="w-full rounded-lg border border-brand-primary/30 bg-white px-4 py-2 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
          >
            Ver sequencia completa ({fotos.length} imagens)
          </button>
        )}
      </section>

      <ImageViewer
        images={fotos}
        blockName={blocoNome}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
