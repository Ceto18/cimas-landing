import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CIMA’S Ingenieros | Ingeniería y construcción en Perú',
  description: 'CIMA’S & INGENIEROS E.I.R.L. desarrolla soluciones de ingeniería, construcción y consultoría desde Huaraz, Áncash.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>
}
