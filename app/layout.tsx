import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Montserrat } from 'next/font/google'
import { WhatsappButton } from '@/components/whatsapp-button'
import './globals.css'

const anton = Anton({
  variable: '--font-anton',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '60 Minutos Escape Game — A maior de Brasília | 16 Aventuras',
  description:
    'Trancados num cenário real, você e sua equipe resolvem enigmas e desafiam o relógio. Não é terror — é aventura pra todo mundo. 4 unidades, 16 salas temáticas.',
  generator: 'v0.app',
  keywords: [
    'escape game',
    'escape room',
    'Brasília',
    'aventura',
    'jogo de fuga',
    '60 minutos',
  ],
  openGraph: {
    title: '60 Minutos Escape Game — A maior de Brasília',
    description:
      'Não é terror — é aventura pra todo mundo. 16 salas temáticas em 4 unidades.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${montserrat.variable} bg-[#0A0A0A]`}
    >
      <body className="font-sans antialiased">
        {children}
        <WhatsappButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
