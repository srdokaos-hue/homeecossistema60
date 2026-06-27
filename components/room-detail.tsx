import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Play, Star } from "lucide-react"
import { heroCleanImage, recommendRooms, type Room } from "@/data/rooms"
import { DifficultyMeter } from "@/components/difficulty-meter"
import { DualGameBadge, TopPlayedBadge } from "@/components/room-badges"
import { RoomReserveCard } from "@/components/room-reserve-card"
import { RelatedRoomsCarousel } from "@/components/related-rooms-carousel"
import { RoomDecorPirate } from "@/components/room-decor-pirate"
import { RoomDecorMatadouro } from "@/components/room-decor-matadouro"
import { MatadouroIntro } from "@/components/matadouro-intro"
import { cn } from "@/lib/utils"

/** Pílula clara translúcida das tags do hero */
function HeroTag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-[rgba(10,10,10,0.55)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm">
      {children}
    </span>
  )
}

/** Card de estatística (duração / jogadores / dificuldade) */
function StatCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center gap-1 rounded-2xl px-4 py-5 text-center">
      {children}
    </div>
  )
}

/**
 * Página individual de sala. Template reaproveitável (recebe qualquer Room).
 * O tema "Ilha dos Piratas" entra só quando o slug bate — gating por slug,
 * não sistema global de temas. Demais salas caem no fundo escuro padrão.
 */
export function RoomDetail({ room }: { room: Room }) {
  const isPirate = room.slug === "ilha-dos-piratas"
  const isMatadouro = room.slug === "matadouro"

  // recomendações por relevância (tema → unidade → populares), nunca a própria sala
  const relatedRooms = recommendRooms(room, 8)

  // hero (mobile e desktop) usa o CARTAZ LIMPO da sala (sem título), nunca o bg
  const heroSrc = heroCleanImage(room)

  const heroTags = [
    room.family ? "Pra família" : null,
    !room.scares ? "Não assusta" : null,
    room.age === "Livre" ? "Livre" : "12 Anos",
  ].filter(Boolean) as string[]

  return (
    <main
      className={cn(
        // padding-bottom no mobile = altura da barra fixa de reserva + safe-area
        // (iPhone), pra nenhuma seção ficar escondida atrás dela. Zerado no desktop.
        "relative min-h-screen pb-[calc(7rem+env(safe-area-inset-bottom))] lg:pb-0",
        isPirate && "room-page--ilha-dos-piratas",
        isMatadouro && "room-page--matadouro",
        !isPirate && !isMatadouro && "bg-[var(--color-void)]",
      )}
    >
      {/* Fundo temático + camada decorativa (gating por slug, não tema global) */}
      {isPirate && (
        <>
          <div className="pirate-room-bg" aria-hidden="true" />
          <RoomDecorPirate />
        </>
      )}
      {isMatadouro && (
        <>
          <div className="matadouro-room-bg" aria-hidden="true" />
          <RoomDecorMatadouro />
          {/* intro imersiva one-shot por sessão (overlay fixo, não altera layout) */}
          <MatadouroIntro />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Voltar */}
        <Link
          href="/salas"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-ash)] transition-colors hover:text-[var(--color-gold)]"
        >
          <ArrowLeft className="size-4" />
          Salas
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_minmax(350px,390px)] lg:gap-10">
          {/* COLUNA PRINCIPAL */}
          <div className="flex flex-col gap-7">
            {/* HERO — mobile: cartaz retrato (4/5); desktop (lg+): inalterado */}
            <section className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[rgba(255,215,120,0.2)] shadow-[0_28px_80px_rgba(0,0,0,0.55),0_0_40px_rgba(216,170,53,0.08)] sm:aspect-[3/4] lg:aspect-auto lg:h-[460px]">
              {/* CARTAZ LIMPO da sala (sem título embutido), NÃO o background da
                  página. Crop retrato no mobile, paisagem no desktop (lg+).
                  Fallback = pôster, p/ salas sem cartaz limpo. */}
              <Image
                src={heroSrc}
                alt={`Cartaz da sala ${room.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover object-center"
              />
              {/* degradê escuro cinematográfico na base pra leitura do título */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-[rgba(8,8,10,0.55)] to-transparent" />
              {/* glow discreto no topo/centro (acento da sala: dourado na Ilha,
                  vermelho frio no Matadouro) */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: isMatadouro
                    ? "radial-gradient(62% 52% at 58% 14%, rgba(193,43,43,0.12), transparent 60%)"
                    : "radial-gradient(62% 52% at 55% 12%, rgba(245,200,90,0.12), transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* tags topo-esquerda */}
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {heroTags.map((t) => (
                  <HeroTag key={t}>{t}</HeroTag>
                ))}
              </div>

              {/* selo especial topo-direita (só Cativeiro / Chronnos) */}
              {(room.topPlayed || room.dualGame) && (
                <div className="absolute right-4 top-4">
                  {room.topPlayed && <TopPlayedBadge />}
                  {room.dualGame && <DualGameBadge />}
                </div>
              )}

              {/* gênero + título + subtítulo */}
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {room.genre}
                </span>
                <h1 className="font-display text-[34px] leading-[0.95] text-white md:text-[40px]">
                  {room.name}
                </h1>
                <p className="mt-1 text-[14px] italic text-[var(--color-ash)]">
                  {room.tagline}
                </p>
              </div>

              {/* play (vídeo ainda não disponível) */}
              <button
                type="button"
                aria-label="Assistir prévia em vídeo"
                className="soft-pulse absolute bottom-5 right-5 flex size-12 items-center justify-center rounded-full bg-[var(--color-blood)] text-white transition-colors hover:bg-[var(--color-blood-dark)]"
              >
                <Play className="size-5 translate-x-0.5 fill-white" />
              </button>
            </section>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <StatCard>
                <span className="font-display text-[28px] leading-none text-white">60min</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ash)]">
                  Duração
                </span>
              </StatCard>
              <StatCard>
                <span className="font-display text-[28px] leading-none text-white">
                  {room.minPlayers}-{room.maxPlayers}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ash)]">
                  Jogadores
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--color-blood)]">
                  Mín. {room.minPlayers} obrigatório
                </span>
              </StatCard>
              <StatCard>
                <DifficultyMeter level={room.difficulty} />
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ash)]">
                  Dificuldade
                </span>
              </StatCard>
            </div>

            {/* GALERIA */}
            <section className="glass-panel glass-strong rounded-2xl p-5">
              <h2 className="font-display text-[22px] text-white">
                Galeria do <span className="text-[var(--color-gold)]">Ambiente</span>
              </h2>
              <p className="mt-1 inline-block rounded border border-dashed border-[var(--color-blood)]/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--color-blood)]">
                Aguardando fotos reais
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-[var(--color-blood)]/40 bg-white/[0.02] text-[var(--color-ash)]/40"
                    aria-hidden="true"
                  >
                    <span className="text-[11px] uppercase tracking-wide">Foto {i + 1}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* HISTÓRIA */}
            <section className="glass-panel glass-strong rounded-2xl p-5">
              <h2 className="font-display text-[22px] text-white">
                A <span className="text-[var(--color-gold)]">História</span>
              </h2>
              <p className="mt-1 inline-block rounded border border-dashed border-[var(--color-blood)]/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--color-blood)]">
                Aguardando texto real
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-ash)]/70">
                A sinopse oficial desta sala será publicada em breve.
              </p>
            </section>

            {/* RANKING */}
            <section className="glass-panel glass-strong rounded-2xl p-5">
              <div className="flex items-end justify-between gap-3">
                <h2 className="font-display text-[22px] text-white">
                  Ranking do <span className="text-[var(--color-gold)]">Mês</span>
                </h2>
                <span className="text-[12px] text-[var(--color-ash)]">
                  Recorde Absoluto:{" "}
                  <span className="font-bold text-[var(--color-gold)]">38:12</span>
                </span>
              </div>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--color-ash)]/60">
                Exemplo · reseta todo mês
              </p>

              {/* divisor simples e elegante: filete dourado discreto que esmaece
                  nas pontas (corda removida — não estava funcionando visualmente) */}
              <div
                className="my-4 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/35 to-transparent"
                aria-hidden="true"
              />

              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-ash)]/60">
                    <th className="w-10 pb-2 font-semibold">#</th>
                    <th className="pb-2 font-semibold">Equipe</th>
                    <th className="pb-2 text-right font-semibold">Tempo</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-ash)]">
                  {[
                    ["1", "Os Bucaneiros", "38:12"],
                    ["2", "Tripulação Alpha", "41:05"],
                    ["3", "Caça-Tesouros", "43:18"],
                  ].map(([pos, team, time]) => (
                    <tr key={pos} className="border-t border-white/[0.06]">
                      <td className="py-2.5 font-display text-[16px] text-[var(--color-gold)]">{pos}</td>
                      <td className="py-2.5 font-semibold text-white">{team}</td>
                      <td className="py-2.5 text-right tabular-nums">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* AVALIAÇÕES (placeholder até termos dados reais) */}
            <section className="glass-panel glass-strong rounded-2xl p-5">
              <div className="flex items-end justify-between gap-3">
                <h2 className="font-display text-[22px] text-white">Avaliações</h2>
                <span className="text-[12px] text-[var(--color-ash)]">— avaliações</span>
              </div>
              <p className="mt-1 inline-block rounded border border-dashed border-[var(--color-blood)]/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--color-blood)]">
                Aguardando avaliações reais
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex gap-0.5 text-[var(--color-gold)]" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3 fill-current" />
                      ))}
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-ash)]/80">
                      [Avaliação real {n}]
                    </p>
                    <p className="mt-2 text-[11px] text-[var(--color-ash)]/55">— Cliente</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR DE RESERVA */}
          <aside>
            <RoomReserveCard room={room} />
          </aside>
        </div>

        {/* VOCÊ TAMBÉM PODE CURTIR — largura cheia, salas recomendadas (reusa o
            card padrão do catálogo; acento herda o tema da página) */}
        {relatedRooms.length > 0 && (
          <section className="mt-10">
            {/* header: empilha no mobile (link abaixo) pra o título não cortar;
                vira linha no sm+ (desktop aprovado inalterado) */}
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
              <h2 className="font-display text-[20px] leading-tight text-white sm:text-[24px]">
                Você Também Pode <span className="text-[var(--color-gold)]">Curtir</span>
              </h2>
              <Link
                href="/salas"
                className="shrink-0 text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--color-ash)] transition-colors hover:text-[var(--color-gold)]"
              >
                Ver todas as salas →
              </Link>
            </div>
            <RelatedRoomsCarousel rooms={relatedRooms} />
          </section>
        )}
      </div>
    </main>
  )
}
