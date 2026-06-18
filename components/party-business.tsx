import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function PartyBusiness() {
  return (
    <>
      {/* ESCAPE PARTY — seção hero própria, com força */}
      <section id="festas" className="bg-[var(--color-void)] pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.16)] p-8 md:p-12">
            <Image
              src="/blocks/party.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/75 to-[var(--color-void)]/30" />
            <div className="relative flex max-w-2xl flex-col gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                Aniversários e comemorações
              </span>
              <h2 className="font-display text-[44px] leading-[0.95] text-white md:text-[64px]">
                ESCAPE PARTY
              </h2>
              <p className="max-w-lg text-[15px] leading-relaxed text-[var(--color-ash)]">
                Aniversário épico. A festa que ninguém esquece: escape game,
                salão e buffet, tudo no mesmo lugar.
              </p>
              <a
                href="#festas"
                className="mt-2 flex h-13 w-fit items-center gap-2 rounded-full bg-[var(--color-blood)] px-8 py-4 text-[14px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-blood-dark)]"
              >
                Monte sua festa
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ESCAPE ANALYSIS — mesma estrutura full-bleed do Escape Party */}
      <section id="empresas" className="bg-[var(--color-void)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.16)] p-8 md:p-12">
            <Image
              src="/blocks/business.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/75 to-[var(--color-void)]/30" />
            <div className="relative flex max-w-2xl flex-col gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                Soluções corporativas
              </span>
              <h2 className="font-display text-[44px] leading-[0.95] text-white md:text-[64px]">
                ESCAPE ANALYSIS
              </h2>
              <p className="max-w-lg text-[15px] leading-relaxed text-[var(--color-ash)]">
                Team building com dados. Observe sua equipe sob pressão real e
                receba um relatório de competências: liderança, comunicação e
                tomada de decisão.
              </p>
              <a
                href="#empresas"
                className="mt-2 flex h-13 w-fit items-center gap-2 rounded-full border-[1.5px] border-[var(--color-gold)] px-8 py-4 text-[14px] font-bold uppercase tracking-[0.06em] text-[var(--color-gold)] transition-colors hover:bg-[rgba(212,175,55,0.08)]"
              >
                Para empresas
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
