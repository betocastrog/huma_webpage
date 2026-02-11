export interface NavItem {
    id: string;
    label: string;
    path: string;
}

export interface CardItem {
    id: string;
    titulo: string;
    descripcion: string;
    imageUrl: string;
    categoria?: string;
}

export interface Branding {
    logoUrl: string;
    slogan: string;
}

export interface Client {
    id: string;
    nombre: string;
    logoUrl: string;
}

export interface InicioSection {
    heroImg: string;
    clientes: Client[];
}

export interface NosotrosSection {
    mision: string;
    vision: string;
    historia: string;
    valores: string[];
}

export interface ContactoSection {
    direccion: string;
    telefono: string;
    email: string;
}

export interface SiteConfig {
    branding: Branding;
    navigation: NavItem[];
    sections: {
        inicio: InicioSection;
        nosotros: NosotrosSection;
        servicios: CardItem[];
        productos: CardItem[];
        instrumentacion: CardItem[];
        aplicaciones: CardItem[];
        contacto: ContactoSection;
    };
}
