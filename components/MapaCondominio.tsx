import { MAPA_AEREO_URL, blocos } from "../data/blocos";
import MapaAereoInterativo from "./MapaAereoInterativo";

export default function MapaCondominio() {
  return (
    <section className="animate-fade-in space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-surface-text">Mapa Aereo do Condominio</h2>
        <p className="text-sm text-surface-text/70 sm:text-base">
          Clique em um bloco para visualizar os detalhes das calhas e acessar as imagens ampliadas.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white p-2 shadow-soft sm:p-3">
        <div className="mx-auto min-w-[680px] max-w-[1200px]">
          <MapaAereoInterativo
            src={MAPA_AEREO_URL}
            hotspots={blocos.map((bloco) => ({
              id: bloco.id,
              nome: bloco.nome,
              top: bloco.hotspot.top,
              left: bloco.hotspot.left,
              width: bloco.hotspot.width,
              height: bloco.hotspot.height,
            }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-xl border border-black/10 bg-white p-3 text-xs text-surface-text/70 sm:grid-cols-4 sm:text-sm lg:grid-cols-6">
        {blocos.map((bloco) => (
          <div key={bloco.id} className="rounded-md bg-surface-base px-2 py-1 text-center font-medium">
            {bloco.nome}
          </div>
        ))}
      </div>
    </section>
  );
}

