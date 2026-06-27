/**
 * Camada decorativa do tema "Ilha dos Piratas".
 *  - back  (z-0): partículas, moedas, gaivotas e âncora, ATRÁS dos painéis —
 *    aparecem só onde o cenário (céu/mar/rocha) está visível, nunca cobrindo texto.
 *  - front (z-20): chapéu de palha flutuando entre hero e card
 *
 * Moedas: cada grupo é um PNG separado, controle individual de
 * escala/opacidade/rotação/sombra. Offsets SEMPRE positivos (nada sai da
 * viewport → nenhuma moeda cortada, sem scroll horizontal). Trazidas pra mais
 * perto do conteúdo (não grudadas na borda). pointer-events:none; somem no mobile.
 *
 * Gaivotas: PNGs recortados individualmente (não a chapa das 4 juntas). 3 aves
 * pequenas e sutis no céu da abertura da caverna (topo/laterais), tamanhos e
 * opacidades variados pra dar profundidade. Âncora: decoração náutica discreta
 * no canto inferior direito, abaixo do card de reserva (área aberta do cenário).
 */
export function RoomDecorPirate({ assetsDir }: { assetsDir: string }) {
  return (
    <>
      {/* CAMADA MOBILE/TABLET (< md) — decoração COM PARCIMÔNIA: poucos elementos
          pequenos, opacidade baixa, em pontos estratégicos, longe do texto. As
          camadas desktop (md+/lg+/xl+ abaixo) tomam conta a partir de md, então
          aqui é md:hidden pra não dobrar. Caminhos vêm de `assetsDir` (data),
          não hardcoded. Estáticos (sem movimento → nada a fazer p/ reduced-motion). */}
      <div className="pirate-decor md:hidden" aria-hidden="true">
        {/* moedas discretas no canto inferior do hero */}
        <div
          className="pirate-coins-sparse"
          style={{
            top: 300,
            right: "4%",
            width: 116,
            height: 78,
            opacity: 0.4,
            transform: "rotate(7deg)",
            backgroundImage: `url('${assetsDir}/coins-sparse.webp')`,
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.45))",
          }}
        />
        {/* uma gaivota pequena no topo */}
        <div
          className="pirate-seagull"
          style={{
            top: 38,
            left: "8%",
            width: 46,
            height: 35,
            opacity: 0.5,
            backgroundImage: `url('${assetsDir}/seagull-01.webp')`,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.32))",
          }}
        />
        {/* chapéu de palha sutil perto do bloco do título */}
        <div
          className="pirate-hat"
          style={{
            top: 250,
            left: "5%",
            width: 96,
            height: 72,
            opacity: 0.34,
            transform: "rotate(-10deg)",
            backgroundImage: `url('${assetsDir}/straw-hat.webp')`,
            filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.4))",
          }}
        />
        {/* âncora bem discreta lá embaixo */}
        <div
          className="pirate-anchor"
          style={{
            bottom: 120,
            right: "6%",
            width: 70,
            height: 110,
            opacity: 0.28,
            transform: "rotate(6deg)",
            backgroundImage: `url('${assetsDir}/anchor.webp')`,
            filter: "blur(0.3px) drop-shadow(0 10px 18px rgba(0,0,0,0.45))",
          }}
        />
      </div>

      {/* CAMADA TRASEIRA — atrás dos painéis */}
      <div className="pirate-decor" aria-hidden="true">
        {/* partículas douradas perto do hero (screen pra brilhar) */}
        <div
          className="pirate-particles"
          style={{ top: "-2%", left: "4%", right: "4%", height: 660, opacity: 0.42, mixBlendMode: "screen" }}
        />

        {/* GAIVOTAS — no céu do cenário (topo/laterais), sutis e em profundidade */}
        {/* ave maior/mais próxima, lado esquerdo */}
        <div
          className="pirate-seagull hidden md:block"
          style={{
            top: 60,
            left: "15%",
            width: 74,
            height: 56,
            opacity: 0.72,
            backgroundImage: "url('/rooms/ilha-dos-piratas/seagull-01.webp')",
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))",
          }}
        />
        {/* ave menor/distante, centro-alto */}
        <div
          className="pirate-seagull hidden md:block"
          style={{
            top: 46,
            left: "47%",
            width: 44,
            height: 34,
            opacity: 0.55,
            backgroundImage: "url('/rooms/ilha-dos-piratas/seagull-02.webp')",
            filter: "blur(0.6px) drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          }}
        />
        {/* terceira ave, lado direito sobre o céu acima do card */}
        <div
          className="pirate-seagull hidden lg:block"
          style={{
            top: 120,
            right: "9%",
            width: 50,
            height: 38,
            opacity: 0.6,
            backgroundImage: "url('/rooms/ilha-dos-piratas/seagull-03.webp')",
            filter: "blur(0.4px) drop-shadow(0 5px 9px rgba(0,0,0,0.32))",
          }}
        />
        {/* partículas ao redor do card lateral */}
        <div
          className="pirate-particles hidden lg:block"
          style={{ top: 150, right: 0, width: 470, height: 660, opacity: 0.34, mixBlendMode: "screen" }}
        />

        {/* Grupo 1 — superior esquerdo, junto à lateral do hero */}
        <div
          className="pirate-coins-sparse hidden lg:block"
          style={{ top: 116, left: "6.5%", width: 235, height: 157, opacity: 0.72, transform: "rotate(-6deg)", filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.5))" }}
        />
        {/* Grupo 2 — lateral direita, integrado atrás do card (longe de preço/botão) */}
        <div
          className="pirate-coins-sparse hidden lg:block"
          style={{ top: 300, right: "5.5%", width: 205, height: 137, opacity: 0.58, transform: "rotate(8deg)", filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.45))" }}
        />
        {/* Grupo 3 — inferior esquerdo, perto do ranking (menor e mais sutil) */}
        <div
          className="pirate-coins-dense hidden lg:block"
          style={{ bottom: 150, left: "6%", width: 188, height: 125, opacity: 0.4, filter: "blur(1px) drop-shadow(0 8px 16px rgba(0,0,0,0.4))" }}
        />
        {/* Moedas soltas pequenas (escala/rotação variadas) */}
        <div
          className="pirate-coins-dense hidden xl:block"
          style={{ top: 470, left: "11%", width: 92, height: 61, opacity: 0.6, transform: "rotate(-14deg)", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))" }}
        />
        <div
          className="pirate-coins-dense hidden xl:block"
          style={{ top: 250, right: "12%", width: 84, height: 56, opacity: 0.55, transform: "rotate(12deg)", filter: "blur(0.5px) drop-shadow(0 6px 12px rgba(0,0,0,0.4))" }}
        />

        {/* ÂNCORA — náutica decorativa no canto inferior direito, abaixo do card
            de reserva (área aberta do cenário). Não cobre texto/tabela/botões. */}
        <div
          className="pirate-anchor hidden lg:block"
          style={{
            bottom: 70,
            right: "3.5%",
            width: 150,
            height: 234,
            opacity: 0.6,
            transform: "rotate(7deg)",
            filter:
              "blur(0.3px) drop-shadow(0 14px 24px rgba(0,0,0,0.5)) drop-shadow(0 0 16px rgba(216,170,53,0.14))",
          }}
        />
      </div>

      {/* CAMADA FRONTAL — chapéu acima dos painéis. Some no mobile/tablet. */}
      <div className="pirate-decor pirate-decor--front hidden xl:block" aria-hidden="true">
        {/* chapéu flutuando na transição hero→stats, abaixado pra LONGE do botão
            de play (canto inf. direito do hero) e deslocado pra esquerda. */}
        <div
          className="pirate-hat"
          style={{
            top: 506,
            right: "36%",
            width: 210,
            height: 158,
            opacity: 0.95,
            transform: "rotate(-12deg)",
            filter:
              "drop-shadow(0 18px 28px rgba(0,0,0,0.55)) drop-shadow(0 0 18px rgba(216,170,53,0.18))",
          }}
        />
      </div>
    </>
  )
}
