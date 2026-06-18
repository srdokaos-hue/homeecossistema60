import { PromoBar } from "@/components/promo-bar"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { RoomCatalog } from "@/components/room-catalog"
import { HowItWorks } from "@/components/how-it-works"
import { SocialProof } from "@/components/social-proof"
import { PrimePlans } from "@/components/prime-plans"
import { KingsOfEscape } from "@/components/kings-of-escape"
import { PartyBusiness } from "@/components/party-business"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"

export default function Page() {
  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <Hero />
        <Reveal>
          <RoomCatalog />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal>
          <SocialProof />
        </Reveal>
        <Reveal>
          <PrimePlans />
        </Reveal>
        <Reveal>
          <PartyBusiness />
        </Reveal>
        <Reveal>
          <KingsOfEscape />
        </Reveal>
      </main>
      <Footer />
    </>
  )
}
