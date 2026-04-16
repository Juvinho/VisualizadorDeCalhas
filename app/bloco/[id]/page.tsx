import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotaoDrive from "../../../components/BotaoDrive";
import GaleriaCalhas from "../../../components/GaleriaCalhas";
import { getBlocoById } from "../../../data/blocos";
import { getBlurDataURL } from "../../../lib/blurDataUrl";

interface BlocoDetalhePageProps {
  params: Promise<{
    id: string;
  }> | {
    id: string;
  };
}

export default async function BlocoDetalhePage({ params }: BlocoDetalhePageProps) {
  const resolvedParams = await Promise.resolve(params);
  const blocoId = Number(resolvedParams.id);
  if (Number.isNaN(blocoId)) {
    notFound();
  }

  const bloco = getBlocoById(blocoId);
  if (!bloco) {
    notFound();
  }

  return (
    <div className="animate-fade-in space-y-5">
      <Link
        href="/"
        className="inline-flex items-center rounded-md border border-brand-primary/20 bg-white px-3 py-2 text-sm font-semibold text-brand-primary shadow-soft transition-colors duration-200 hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/30"
      >
        ← Voltar
      </Link>

      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-surface-text">{bloco.nome}</h2>
        <p className="text-sm text-surface-text/70 sm:text-base">
          Inspecione o telhado do bloco e as imagens de detalhe das calhas com problema.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-12">
        <article className="space-y-3 lg:col-span-8">
          <h3 className="text-lg font-semibold text-surface-text">Imagem principal do telhado</h3>
          <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white p-2 shadow-soft sm:p-3">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={bloco.imagemTelhado}
                alt={`Vista aproximada do telhado do ${bloco.nome}`}
                width={1600}
                height={1000}
                priority
                placeholder="blur"
                blurDataURL={getBlurDataURL(1600, 1000)}
                className="h-auto w-full"
              />
            </div>
          </div>
        </article>

        <aside className="space-y-5 lg:col-span-4">
          <GaleriaCalhas fotos={bloco.fotosCalhas} blocoNome={bloco.nome} />
          <div className="flex justify-center lg:justify-start">
            <BotaoDrive link={bloco.linkGoogleDrive} />
          </div>
        </aside>
      </section>
    </div>
  );
}
