import MapaCondominio from "../components/MapaCondominio";

export default function HomePage() {
  return (
    <div className="space-y-5">
      <p className="max-w-3xl text-sm text-surface-text/75 sm:text-base">
        Selecione um bloco no mapa para analisar os pontos com falhas nas calhas, visualizar imagens de detalhe e acessar a pasta completa de registros.
      </p>
      <MapaCondominio />
    </div>
  );
}
