import Link from "next/link";

interface HotspotBlocoProps {
  id: number;
  nome: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

export default function HotspotBloco({ id, nome, top, left, width, height }: HotspotBlocoProps) {
  return (
    <Link
      href={`/bloco/${id}`}
      aria-label={`Abrir detalhes do ${nome}`}
      title={nome}
      className="group absolute rounded-lg border-2 border-white/70 bg-brand-secondary/15 transition-all duration-200 hover:scale-[1.02] hover:border-brand-secondary hover:bg-brand-secondary/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/50"
      style={{ top, left, width, height }}
    >
      <span className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[120%] rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        {nome}
      </span>
      <span className="absolute left-1 top-1 rounded-md bg-brand-primary/90 px-2 py-1 text-[10px] font-semibold text-white shadow-soft sm:text-xs">
        {nome}
      </span>
      <span className="absolute inset-0 rounded-lg border border-brand-secondary/0 transition-colors duration-200 group-hover:border-brand-secondary/70" />
    </Link>
  );
}
