import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig } from '../types/site';
import { initialState } from './InitialState';

interface SiteContextType {
    siteData: SiteConfig;
    updateSiteData: (newData: SiteConfig) => void;
    resetToFactory: () => void;
}

const STORAGE_KEY = 'huma_automatizacion_v5';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [siteData, setSiteData] = useState<SiteConfig>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error parsing saved state", e);
                return initialState;
            }
        }
        return initialState;
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
        } catch (error) {
            console.error("Local Storage Error:", error);
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                alert("Error: El espacio de almacenamiento está lleno. Es posible que la imagen sea demasiado grande o que haya demasiados datos guardados. Intente con una imagen más liviana.");
            }
        }
    }, [siteData]);

    const updateSiteData = (newData: SiteConfig) => {
        setSiteData(newData);
    };

    const resetToFactory = () => {
        if (window.confirm('¿Estás seguro de que deseas restablecer todos los datos a la configuración inicial?')) {
            setSiteData(initialState);
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return (
        <SiteContext.Provider value={{ siteData, updateSiteData, resetToFactory }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSite = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSite must be used within a SiteProvider');
    }
    return context;
};
