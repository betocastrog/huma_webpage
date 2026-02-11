import { SiteConfig } from '../types/site';

export const initialState: SiteConfig = {
    branding: {
        logoUrl: 'https://huma.mx/wp-content/uploads/2021/05/logo-huma-white.png',
        slogan: 'Soluciones para la administración, distribución y control del agua.'
    },
    navigation: [
        { id: '1', label: 'Inicio', path: '/' },
        { id: '2', label: 'Nosotros', path: '/nosotros' },
        { id: '3', label: 'Servicios', path: '/servicios' },
        { id: '4', label: 'Productos', path: '/productos' },
        { id: '5', label: 'Instrumentación', path: '/instrumentacion' },
        { id: '6', label: 'Aplicaciones', path: '/aplicaciones' },
        { id: '7', label: 'Contacto', path: '/contacto' }
    ],
    sections: {
        inicio: {
            heroImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
            clientes: [
                { id: 'c1', nombre: 'JAPAC', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?q=80&w=200' },
                { id: 'c2', nombre: 'JAPASA', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?q=80&w=200' },
                { id: 'c3', nombre: 'JUMAPAG', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?q=80&w=200' },
                { id: 'c4', nombre: 'SIMAPAG', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?q=80&w=200' },
                { id: 'c5', nombre: 'SIMAPAS', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?q=80&w=200' },
                { id: 'c6', nombre: 'SEAPAL Vallarta', logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?q=80&w=200' }
            ]
        },
        nosotros: {
            mision: 'Proveer soluciones integrales en automatización para el sector hídrico.',
            vision: 'Ser líderes nacionales en tecnología de control de agua.',
            historia: 'Desde 1993 ofreciendo excelencia técnica.',
            valores: ['Pasión', 'Calidad', 'Innovación']
        },
        servicios: [
            { id: 's1', titulo: 'Asesoría Técnica', descripcion: 'Consultoría especializada en sistemas de agua.', imageUrl: 'https://images.unsplash.com/photo-1454165833767-1316b321603b?q=80&w=600', categoria: 'Consultoría' }
        ],
        productos: [
            { id: 'p1', titulo: 'Válvulas de Control', descripcion: 'Alta precisión en flujo.', imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600', categoria: 'Hardware' }
        ],
        instrumentacion: [
            { id: 'i1', titulo: 'Sensores de Nivel', descripcion: 'Monitoreo en tiempo real.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600', categoria: 'Sensores' }
        ],
        aplicaciones: [
            { id: 'a1', titulo: 'Plantas de Tratamiento', descripcion: 'Optimización de procesos.', imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=600', categoria: 'Industrial' }
        ],
        contacto: {
            direccion: 'Blvd. Río Fuerte No. 2425, Los Mochis',
            telefono: '(668) 123 0326',
            email: 'contacto@huma.mx'
        }
    }
};
