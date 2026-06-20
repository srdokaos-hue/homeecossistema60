import type { Metadata } from "next"
import { Suspense } from "react"
import { PromoBar } from "@/components/promo-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RoomCatalogFull } from "@/components/room-catalog-full"

export const metadata: Metadata = {
  title: "Todas as Salas — 16 Aventuras | 60 Minutos Escape Game",
  description:
    "Conheça as 16 salas temáticas do 60 Minutos em 4 unidades. Filtre por gênero, unidade e número de jogadores e encontre a aventura certa pra sua equipe.",
  alternates: { canonical: "/salas" },
}

export default function SalasPage() {
  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <RoomCatalogFull />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
