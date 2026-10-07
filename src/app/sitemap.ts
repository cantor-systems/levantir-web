import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://levantir.com'
  const routes = [
    '',
    '/aeronaves',
    '/autos',
    '/autos/seguro-de-auto',
    '/contacto',
    '/insights',
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
    '/sectores-especializados'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
