import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Interfaces ---

export interface NavItem {
    id: string; // unique id for list management
    name: string;
    path: string;
}

export interface BrandSettings {
    name: string; // Company Name text
    logoUrl: string; // URL to the image
}

export interface SectionContent {
    title: string;
    description: string;
    imageUrl: string;
}

export interface PageContent {
    brand: BrandSettings;
    navigation: NavItem[];
    hero: SectionContent;
    nosotros: SectionContent;
    servicios: SectionContent;
    productos: SectionContent;
    contacto: SectionContent;
    [key: string]: any; // fallback for loose typing if needed
}

// --- Default State ---

const defaultContent: PageContent = {
    brand: {
        name: "Huma Automatización",
        logoUrl: "/logo.svg"
    },
    navigation: [
        { id: '1', name: 'Inicio', path: '/' },
        { id: '2', name: 'Servicios', path: '/servicios' },
        { id: '3', name: 'Productos', path: '/productos' },
        { id: '4', name: 'Nosotros', path: '/nosotros' },
        { id: '5', name: 'Contacto', path: '/contacto' },
    ],
    hero: {
        title: "Control y Eficiencia en cada Gota",
        description: "Soluciones para la administración, distribución y control del agua.",
        imageUrl: "https://placehold.co/1920x1080/003366/ffffff?text=Huma+Hero+Image"
    },
    nosotros: {
        title: "Sobre Nosotros",
        description: "Brindar la llave a las mejores soluciones tecnológicas de control y medición.",
        imageUrl: "https://placehold.co/800x600/005b96/ffffff?text=Nosotros"
    },
    servicios: {
        title: "Nuestros Servicios",
        description: "Automatización de pozos, industrial y agrícola.",
        imageUrl: "https://placehold.co/800x600/6497b1/ffffff?text=Servicios"
    },
    productos: {
        title: "Catálogo de Productos",
        description: "Hardware y Software especializado.",
        imageUrl: "https://placehold.co/800x600/b3cde0/005b96?text=Productos"
    },
    contacto: {
        title: "Contáctanos",
        description: "Estamos listos para atender tus necesidades.",
        imageUrl: "https://placehold.co/800x600/005b96/ffffff?text=Contacto"
    }
};

// --- Context ---

interface ContentContextType {
    content: PageContent;
    updateSection: (sectionKey: string, data: Partial<SectionContent>) => void;
    updateBrand: (data: Partial<BrandSettings>) => void;
    updateNavigation: (newNav: NavItem[]) => void;
    resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// --- Provider ---

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<PageContent>(() => {
        try {
            const savedContent = localStorage.getItem('huma_site_content_v2'); // v2 key to avoid conflicts
            return savedContent ? JSON.parse(savedContent) : defaultContent;
        } catch (error) {
            console.error("Error loading content:", error);
            return defaultContent;
        }
    });

    useEffect(() => {
        localStorage.setItem('huma_site_content_v2', JSON.stringify(content));
    }, [content]);

    const updateSection = (sectionKey: string, data: Partial<SectionContent>) => {
        setContent(prev => ({
            ...prev,
            [sectionKey]: { ...prev[sectionKey], ...data }
        }));
    };

    const updateBrand = (data: Partial<BrandSettings>) => {
        setContent(prev => ({
            ...prev,
            brand: { ...prev.brand, ...data }
        }));
    };

    const updateNavigation = (newNav: NavItem[]) => {
        setContent(prev => ({
            ...prev,
            navigation: newNav
        }));
    };

    const resetContent = () => {
        if (confirm("¿Estás seguro de restaurar todos los valores por defecto?")) {
            setContent(defaultContent);
        }
    };

    return (
        <ContentContext.Provider value={{ content, updateSection, updateBrand, updateNavigation, resetContent }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) throw new Error('useContent must be used within a ContentProvider');
    return context;
};
