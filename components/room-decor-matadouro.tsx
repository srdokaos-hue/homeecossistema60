/**
 * Camada decorativa do tema "Matadouro" — mesmo padrão técnico do RoomDecorPirate,
 * mas com atmosfera de suspense industrial (sem gore/violência explícita).
 *
 * Tudo vive na CAMADA TRASEIRA (z-0), ATRÁS dos painéis e textos (z-10): nenhum
 * asset cobre conteúdo nem captura clique (pointer-events:none no container).
 * Ordem de pintura (de baixo p/ cima): luz vermelha → névoa → correntes → jornais.
 *
 *  - red-light / fog: overlays de atmosfera (mix-blend screen, opacidade baixa),
 *    mais presentes nas laterais/inferior; dão profundidade sem deixar a página
 *    branca nem vermelha demais.
 *  - correntes (máx. 3): penduradas do topo, só nas laterais, nunca dentro dos
 *    cards. Opacidade/blur variados pra profundidade.
 *  - jornais (máx. 3): recortes discretos no cenário (margem/atrás dos painéis
 *    translúcidos), leve rotação, como pistas de investigação.
 *
 * Decoração pesada (correntes/jornais) some no mobile/tablet; a névoa/luz
 * (sem objeto, sem overflow) permanece como atmosfera leve.
 */
const A = "/rooms/matadouro"

export function RoomDecorMatadouro() {
  return (
    <div className="matadouro-decor" aria-hidden="true">
      {/* LUZ VERMELHA discreta atrás do hero / lateral direita (perto do card) */}
      <div
        className="matadouro-red-light"
        style={{
          top: -30,
          left: "28%",
          right: 0,
          height: 720,
          opacity: 0.5,
          mixBlendMode: "screen",
          backgroundImage: `url('${A}/red-light-overlay.webp')`,
        }}
      />

      {/* NÉVOA — banda inferior (mais densa embaixo) + véu sutil no topo */}
      <div
        className="matadouro-fog"
        style={{
          bottom: -60,
          left: 0,
          right: 0,
          height: 680,
          opacity: 0.2,
          mixBlendMode: "screen",
          backgroundImage: `url('${A}/fog-overlay.webp')`,
        }}
      />
      <div
        className="matadouro-fog"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: 520,
          opacity: 0.12,
          mixBlendMode: "screen",
          backgroundImage: `url('${A}/fog-overlay-subtle.webp')`,
        }}
      />

      {/* CORRENTES — penduradas do topo, só nas laterais */}
      {/* esquerda superior (corrente longa com mosquetão) */}
      <div
        className="matadouro-chain hidden lg:block"
        style={{
          top: -12,
          left: "3.5%",
          width: 70,
          height: 430,
          opacity: 0.5,
          filter: "blur(0.3px) drop-shadow(0 10px 18px rgba(0,0,0,0.55))",
          backgroundImage: `url('${A}/hanging-chain-01.webp')`,
          backgroundPosition: "top center",
        }}
      />
      {/* direita (corrente com algema) — só em telas largas, p/ não brigar com o card */}
      <div
        className="matadouro-chain hidden xl:block"
        style={{
          top: -12,
          right: "2%",
          width: 90,
          height: 320,
          opacity: 0.46,
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.55))",
          backgroundImage: `url('${A}/hanging-chain-04.webp')`,
          backgroundPosition: "top center",
        }}
      />
      {/* detalhe fino mais ao fundo (esquerda-centro), distante e borrado */}
      <div
        className="matadouro-chain hidden xl:block"
        style={{
          top: -12,
          left: "23%",
          width: 42,
          height: 280,
          opacity: 0.32,
          filter: "blur(1.2px) drop-shadow(0 8px 14px rgba(0,0,0,0.5))",
          backgroundImage: `url('${A}/hanging-chain-03.webp')`,
          backgroundPosition: "top center",
        }}
      />

      {/* JORNAIS — apenas 2, escurecidos/envelhecidos e bem integrados ao fundo.
          Detalhes investigativos sutis, nunca stickers. Atrás dos painéis, somem
          no mobile/tablet. Filtro escurece e dessatura pra casar com o cenário. */}
      {/* esquerda, perto da galeria/hero */}
      <div
        className="matadouro-newspaper hidden lg:block"
        style={{
          top: 880,
          left: "1.5%",
          width: 112,
          height: 163,
          opacity: 0.38,
          transform: "rotate(-2.5deg)",
          filter:
            "brightness(0.6) contrast(1.05) saturate(0.75) blur(0.5px) drop-shadow(0 10px 16px rgba(0,0,0,0.55))",
          backgroundImage: `url('${A}/newspaper-01.webp')`,
        }}
      />
      {/* direita, emergindo por trás do card lateral pro cenário aberto abaixo */}
      <div
        className="matadouro-newspaper hidden lg:block"
        style={{
          top: 560,
          right: "2%",
          width: 104,
          height: 135,
          opacity: 0.34,
          transform: "rotate(3deg)",
          filter:
            "brightness(0.6) contrast(1.05) saturate(0.75) blur(0.5px) drop-shadow(0 10px 16px rgba(0,0,0,0.55))",
          backgroundImage: `url('${A}/newspaper-02.webp')`,
        }}
      />
    </div>
  )
}
