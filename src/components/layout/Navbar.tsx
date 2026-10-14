import Image from 'next/image'
import { ArrowUpRight, Menu } from 'lucide-react'

import { SITE_CONFIG } from '@/constants/site'

const navigation = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Certificaciones', href: '#certificaciones' },
]

export function Navbar() {
  return (
    <nav
      className="nav container"
      aria-label="Navegación principal"
    >
      <a href="#inicio" aria-label="Ir al inicio">
        <Image
          src={SITE_CONFIG.logo.negative}
          alt={SITE_CONFIG.shortName}
          width={210}
          height={70}
          className="brand-logo"
          priority
        />
      </a>

      <div className="nav-links">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>

      <a className="nav-cta" href="#contacto">
        Hablemos
        <ArrowUpRight size={16} />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label="Abrir menú"
      >
        <Menu size={22} />
      </button>
    </nav>
  )
}