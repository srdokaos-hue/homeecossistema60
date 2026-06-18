const UNITS = [
  "Píer 21 — Asa Sul, Brasília",
  "ParkShopping — Guará, Brasília",
  "Taguatinga Shopping — Brasília (Loja Pocket)",
  "Shopping Santa Úrsula — Ribeirão Preto",
]

const LINKS = [
  "Salas",
  "Escape Prime",
  "Kings of the Escape",
  "Faça sua festa",
  "Para empresas",
  "Loja",
  "FAQ",
  "Quem somos",
]

const CONTACTS = [
  "(61) 98135-4911 — Pier 21",
  "(61) 99301-1414 — ParkShopping",
  "(61) 99281-8492 — Taguatinga",
  "(16) 99116-3102 — Santa Úrsula",
]

// Ícones de marca não estão neste lucide-react; usamos SVG inline.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .73-5.07V9.66a5.66 5.66 0 0 0-.73-.05 5.66 5.66 0 1 0 5.66 5.66V8.83a7.32 7.32 0 0 0 4.29 1.37V7.1a4.29 4.29 0 0 1-3.21-1.28z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  )
}

const SOCIALS = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "Facebook", icon: FacebookIcon },
  { label: "YouTube", icon: YouTubeIcon },
  { label: "TikTok", icon: TikTokIcon },
]

export function Footer() {
  return (
    <footer
      id="quem-somos"
      className="bg-[#080808] pt-16 text-[var(--color-ash)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="60 Minutos Escape Game"
                className="size-10 shrink-0 object-contain"
              />
              <span className="font-sans text-[12px] font-bold uppercase leading-tight tracking-[0.04em] text-white">
                60 Minutos
                <br />
                Escape Game
              </span>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed">
              A maior empresa de escape game de Brasília. Desde 2016. 10 anos
              criando aventuras reais.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-[rgba(212,175,55,0.18)] text-[var(--color-ash)] transition-colors hover:text-[var(--color-gold)]"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2 — Unidades */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
              Unidades
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {UNITS.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
              Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="transition-colors hover:text-[var(--color-gold)]"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — Contato */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
              Contato
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {CONTACTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[rgba(212,175,55,0.12)] py-6 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 60 Minutos Escape Game 2026 · Todos os direitos reservados
          </span>
          <span className="flex gap-3">
            <a href="#" className="transition-colors hover:text-[var(--color-gold)]">
              Política de Privacidade
            </a>
            ·
            <a href="#" className="transition-colors hover:text-[var(--color-gold)]">
              Regulamentos
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
