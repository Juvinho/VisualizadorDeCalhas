import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center animate-fade-in">
      <h2 className="text-2xl font-semibold text-surface-text">Bloco nao encontrado</h2>
      <p className="max-w-lg text-sm text-surface-text/70 sm:text-base">
        O bloco solicitado nao existe na base atual. Volte para o mapa e selecione um bloco valido.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary"
      >
        Voltar ao mapa
      </Link>
    </div>
  );
}
