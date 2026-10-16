import { MetadataRoute } from 'next'
import { GUIAS_BASE_PATH, guiasDeSeguros } from '../content/guias-de-seguros'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://levantir.com'
  const routes = [
    '',
    '/aeronaves',
    '/autos',
    '/autos/seguro-de-auto',
    '/aviso-de-privacidad',
    '/contacto',
    GUIAS_BASE_PATH,
    ...guiasDeSeguros.map((guia) => `${GUIAS_BASE_PATH}/${guia.slug}`),
    '/mercancias',
    '/nosotros',
    '/personas',
    '/personas/gastos-medicos-mayores',
    '/personas/retiro',
    '/personas/seguro-de-vida',
    '/pymes',
    '/pymes/hombre-clave',
    '/pymes/responsabilidad-civil',
    '/pymes/seguro-empresarial',
    '/sectores-especializados',
    '/terminos-y-condiciones'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
