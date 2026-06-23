import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PromoBar } from "@/components/promo-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RoomDetail } from "@/components/room-detail"
import { rooms } from "@/data/rooms"

/**
 * Rota dinâmica /salas/[sala] (SEO híbrido, CLAUDE.md). Ilha e Matadouro têm
 * tema próprio e são pré-renderizadas; as demais salas usam o mesmo template
 * (fundo escuro padrão + placeholders) sob demanda, pra que a vitrine
 * "Você Também Pode Curtir" / "Ver sala" leve a uma página real. Slug inválido
 * cai em 404 via notFound() abaixo.
 */
export function generateStaticParams() {
  return [{ sala: "ilha-dos-piratas" }, { sala: "matadouro" }]
}

export const dynamicParams = true

function getRoom(sala: string) {
  return rooms.find((r) => r.slug === sala)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sala: string }>
}): Promise<Metadata> {
  const { sala } = await params
  const room = getRoom(sala)
  if (!room) return {}
  return {
    title: `${room.name}: ${room.tagline} | 60 Minutos Escape Game`,
    description: `${room.name}, sala de escape de ${room.genre.toLowerCase()} pra ${room.minPlayers} a ${room.maxPlayers} jogadores. Reserve sua aventura no 60 Minutos.`,
    alternates: { canonical: `/salas/${room.slug}` },
  }
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ sala: string }>
}) {
  const { sala } = await params
  const room = getRoom(sala)
  if (!room) notFound()

  return (
    <>
      <PromoBar />
      <Navbar />
      <RoomDetail room={room} />
      <Footer />
    </>
  )
}
