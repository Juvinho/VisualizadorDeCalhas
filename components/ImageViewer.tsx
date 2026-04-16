"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { getBlurDataURL } from "../lib/blurDataUrl";

interface ViewerImage {
  src: string;
  descricao: string;
}

interface ImageViewerProps {
  images: ViewerImage[];
  blockName: string;
  selectedIndex: number | null;
  onSelectIndex: (index: number) => void;
  onClose: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const WHEEL_ZOOM_STEP = 0.15;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function ImageViewer({ images, blockName, selectedIndex, onSelectIndex, onClose }: ImageViewerProps) {
  const imageViewportRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartXRef = useRef<number | null>(null);

  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const hasValidSelection = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < images.length;
  const image = hasValidSelection ? images[selectedIndex] : null;
  const totalImages = images.length;

  useEffect(() => {
    if (!image) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const isNextKey = event.key === "ArrowRight" || event.key === "ArrowDown";
      const isPreviousKey = event.key === "ArrowLeft" || event.key === "ArrowUp";

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (!hasValidSelection) {
        return;
      }

      const currentIndex = selectedIndex ?? 0;

      if (isPreviousKey) {
        event.preventDefault();
        onSelectIndex(Math.max(0, currentIndex - 1));
      }

      if (isNextKey) {
        event.preventDefault();
        onSelectIndex(Math.min(totalImages - 1, currentIndex + 1));
      }
    };

    const currentOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = currentOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasValidSelection, image, onClose, onSelectIndex, selectedIndex, totalImages]);

  useEffect(() => {
    if (!hasValidSelection) {
      setZoom(1);
      setOrigin({ x: 50, y: 50 });
      return;
    }

    setZoom(1);
    setOrigin({ x: 50, y: 50 });
  }, [hasValidSelection, selectedIndex]);

  useEffect(() => {
    if (!hasValidSelection || selectedIndex === null) {
      return;
    }

    thumbnailRefs.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [hasValidSelection, selectedIndex]);

  const setZoomOriginFromPoint = useCallback((clientX: number, clientY: number) => {
    const rect = imageViewportRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    setOrigin({
      x: clamp(((clientX - rect.left) / rect.width) * 100, 0, 100),
      y: clamp(((clientY - rect.top) / rect.height) * 100, 0, 100),
    });
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      setZoomOriginFromPoint(event.clientX, event.clientY);

      const delta = event.deltaY > 0 ? -WHEEL_ZOOM_STEP : WHEEL_ZOOM_STEP;
      setZoom((currentZoom) => clamp(currentZoom + delta, MIN_ZOOM, MAX_ZOOM));
    },
    [setZoomOriginFromPoint],
  );

  useEffect(() => {
    const viewport = imageViewportRef.current;
    if (!viewport || !hasValidSelection) {
      return;
    }

    viewport.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel, hasValidSelection, selectedIndex]);

  const goToPrevious = () => {
    if (!hasValidSelection) {
      return;
    }

    const currentIndex = selectedIndex ?? 0;
    onSelectIndex(Math.max(0, currentIndex - 1));
  };

  const goToNext = () => {
    if (!hasValidSelection) {
      return;
    }

    const currentIndex = selectedIndex ?? 0;
    onSelectIndex(Math.min(totalImages - 1, currentIndex + 1));
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (zoom > 1) {
      return;
    }

    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (zoom > 1 || touchStartXRef.current === null) {
      touchStartXRef.current = null;
      return;
    }

    const endX = event.changedTouches[0]?.clientX;
    if (typeof endX !== "number") {
      touchStartXRef.current = null;
      return;
    }

    const diff = touchStartXRef.current - endX;
    touchStartXRef.current = null;

    if (diff > 50) {
      goToNext();
    }

    if (diff < -50) {
      goToPrevious();
    }
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (zoom > 1) {
      setZoom(1);
      setOrigin({ x: 50, y: 50 });
      return;
    }

    setZoomOriginFromPoint(event.clientX, event.clientY);
    setZoom(2);
  };

  if (!image || selectedIndex === null) {
    return null;
  }

  const isFirstImage = selectedIndex === 0;
  const isLastImage = selectedIndex === totalImages - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Visualizacao ampliada: ${image.descricao}`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-6xl rounded-xl border border-white/20 bg-black/50 p-3 sm:p-4"
      >
        <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-white">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[44px] items-center rounded-lg bg-white/90 px-4 py-2 text-base font-semibold text-surface-text shadow-soft hover:bg-white"
                aria-label="Voltar para vista geral"
              >
                &larr; Vista geral
              </button>
              <span className="text-white/70" aria-hidden="true">
                /
              </span>
              <span className="rounded-md bg-black/60 px-2 py-1 text-base text-white">{blockName}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/95 text-2xl font-semibold leading-none text-surface-text shadow-soft transition-colors hover:bg-white"
            aria-label="Fechar visualizador"
          >
            &times;
          </button>
        </div>

        <div
          ref={imageViewportRef}
          onDoubleClick={handleDoubleClick}
          className={`relative flex max-h-[72vh] min-h-[260px] w-full items-center justify-center overflow-hidden rounded-xl bg-black/40 p-2 sm:p-3 ${
            zoom > 1 ? "cursor-grab" : "cursor-zoom-in"
          }`}
          style={{ touchAction: "manipulation" }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex w-[22%] min-w-[72px] items-center justify-start pl-2 sm:w-[104px]">
            <button
              type="button"
              onClick={goToPrevious}
              disabled={isFirstImage}
              className="pointer-events-auto inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-base font-semibold text-white shadow-soft transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Imagem anterior"
            >
              <span aria-hidden="true">&lsaquo;</span>
              <span className="hidden text-sm sm:inline">Anterior</span>
            </button>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex w-[22%] min-w-[72px] items-center justify-end pr-2 sm:w-[104px]">
            <button
              type="button"
              onClick={goToNext}
              disabled={isLastImage}
              className="pointer-events-auto inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-base font-semibold text-white shadow-soft transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Proxima imagem"
            >
              <span className="hidden text-sm sm:inline">Proxima</span>
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>

          <span className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/75 px-3 py-1 text-sm font-semibold text-white">
            {selectedIndex + 1} / {totalImages}
          </span>

          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: `${origin.x}% ${origin.y}%`,
              transition: zoom === 1 ? "transform 200ms ease-out" : "none",
            }}
          >
            <Image
              src={image.src}
              alt={image.descricao}
              width={1800}
              height={1200}
              placeholder="blur"
              blurDataURL={getBlurDataURL(1800, 1200)}
              className="max-h-[66vh] w-auto max-w-full select-none object-contain"
              draggable={false}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() => {
                touchStartXRef.current = null;
              }}
            />
          </div>
        </div>

        <div className="mt-3 overflow-x-auto">
          <div className="mx-auto flex w-max gap-2 pb-1">
            {images.map((thumb, index) => (
              <button
                key={`${thumb.src}-${index}`}
                ref={(element) => {
                  thumbnailRefs.current[index] = element;
                }}
                type="button"
                onClick={() => onSelectIndex(index)}
                className={`shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                  index === selectedIndex
                    ? "border-brand-secondary shadow-soft"
                    : "border-white/30 opacity-80 hover:opacity-100"
                } w-[104px] sm:w-[128px]`}
                aria-label={`Selecionar imagem ${index + 1}`}
              >
                <Image
                  src={thumb.src}
                  alt={thumb.descricao}
                  width={220}
                  height={140}
                  placeholder="blur"
                  blurDataURL={getBlurDataURL(220, 140)}
                  className="h-[72px] w-full object-cover sm:h-[84px]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
