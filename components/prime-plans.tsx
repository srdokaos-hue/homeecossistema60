import type { CSSProperties } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Eyebrow, SectionTitle } from "@/components/section-heading"

interface Plan {
  name: string
  audience: string
  tickets: number
  perTicket: number
  total: number
  pin: string
  /** cor de identidade do tier (usada na borda, glow, anel e botão) */
  accent: string
  popular?: boolean
}

const PLANS: Plan[] = [
  {
    name: "Ouro",
    audience: "Individual",
    tickets: 3,
    perTicket: 69.9,
    total: 209.7,
    pin: "/prime/pin-ouro.png",
    accent: "var(--color-gold)",
  },
  {
    name: "Elite",
    audience: "Para times",
    tickets: 24,
    perTicket: 39.9,
    total: 957.6,
    pin: "/prime/pin-elite.png",
    accent: "var(--color-blood)",
    popular: true,
  },
  {
    name: "Platina",
    audience: "Para duplas",
    tickets: 10,
    perTicket: 59.9,
    total: 599.0,
    pin: "/prime/pin-platina.png",
    accent: "var(--color-platina)",
  },
]

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function PrimePlans() {
  return (
    <section id="prime" className="relative overflow-hidden bg-[#0d0d0f] py-16 md:py-24">
      {/* âncora de navegação (bottom sheet mobile "Escape Prime") */}
      <span id="escape-prime" aria-hidden="true" className="block scroll-mt-24" />
      {/* pattern de símbolos a 4% */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(/pattern-symbols.png)",
          backgroundSize: "320px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow center>Planos de assinatura</Eyebrow>
          <SectionTitle>{"ESCAPE *PRIME*"}</SectionTitle>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[var(--color-ash)]">
            Ingressos com desconto, cards colecionáveis e acesso antecipado a
            salas novas. Jogue mais, pague menos.
          </p>
        </div>

        <div className="mt-14 grid items-end gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{ "--accent": plan.accent } as CSSProperties}
              className={cn(
                "relative flex flex-col items-center gap-5 rounded-[18px] border p-7 text-center transition-transform",
                plan.popular
                  ? "z-10 border-[var(--accent)] bg-[var(--color-carbon)] shadow-[0_30px_70px_-25px_rgba(225,28,36,0.5)] md:-translate-y-6 md:scale-[1.05]"
                  : "border-[color-mix(in_srgb,var(--accent)_20%,transparent)] bg-[var(--color-void)]/40",
              )}
            >
              {/* glow radial na cor do tier (mais forte no Elite/popular) */}
              <div
                className={cn(
                  "pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[var(--accent)] blur-3xl",
                  plan.popular ? "opacity-30" : "opacity-15",
                )}
                aria-hidden="true"
              />

              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-gold)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#3a2e08]">
                  Mais Popular
                </span>
              )}

              {/* slot de pin oficial do plano */}
              <span className="flex size-16 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] bg-[var(--color-void)]/60 p-1">
                <Image
                  src={plan.pin || "/placeholder.svg"}
                  alt={`Pin do plano ${plan.name}`}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                />
              </span>

              <div className="flex flex-col gap-1">
                <h3 className="font-display text-[24px] leading-none text-white">
                  {plan.name}
                </h3>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ash)]">
                  {plan.audience}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-[52px] leading-none text-[var(--color-gold)]">
                  {plan.tickets}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ash)]">
                  Ingressos
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-white">
                  R$ {brl(plan.perTicket)}
                  <span className="text-[12px] font-normal text-[var(--color-ash)]">
                    {" "}
                    /ingresso
                  </span>
                </span>
                <span className="text-[12px] text-[var(--color-ash)]">
                  total R$ {brl(plan.total)}
                </span>
              </div>

              <button
                type="button"
                className={cn(
                  "mt-auto flex h-12 w-full items-center justify-center rounded-full text-[12px] font-bold uppercase tracking-[0.06em] transition-colors",
                  plan.popular
                    ? "bg-[var(--color-blood)] text-white hover:bg-[var(--color-blood-dark)]"
                    : "border-[1.5px] border-[var(--accent)] text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]",
                )}
              >
                Assinar {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
