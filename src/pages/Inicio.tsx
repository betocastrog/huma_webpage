import React from 'react';
import { Activity } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Inicio: React.FC = () => {
    const { siteData } = useSite();
    const { inicio } = siteData.sections;

    return (
        <div className="pt-12 md:pt-14">
            {/* Hero Section - IBM Style */}
            <section className="relative min-h-[70vh] flex items-center bg-[#161616] overflow-hidden">
                <div className="max-w-[1584px] mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center z-10 py-20">
                    <div className="animate-in">
                        <p className="text-[#009d9a] font-bold mb-4 uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#009d9a]"></span>
                            Sistemas de Infraestructura
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-10">
                            {siteData.branding.slogan.split(',').map((part, i) => (
                                <span key={i} className="block">{part.trim()}</span>
                            ))}
                        </h1>
                        <div className="flex flex-wrap gap-0">
                            <button className="bg-[#0f62fe] text-white px-10 py-5 font-medium hover:bg-[#0043ce] transition-all flex items-center gap-4 text-sm uppercase tracking-widest group">
                                Explorar Soluciones <span className="group-hover:translate-x-2 transition-transform text-xl">→</span>
                            </button>
                            <button className="border border-[#393939] text-white px-10 py-5 font-medium hover:bg-white hover:text-[#161616] transition-all text-sm uppercase tracking-widest">
                                Contactar Expertos
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background Image / Pattern */}
                <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-30 lg:opacity-60">
                    <img
                        src={inicio.heroImg}
                        alt="Fondo Industrial"
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#161616] via-[#161616]/80 to-transparent" />
                </div>
            </section>

            {/* Clientes Section - Carrusel IBM Style */}
            <section className="py-24 bg-white border-b border-[#e0e0e0] overflow-hidden">
                <div className="max-w-[1584px] mx-auto px-4 mb-16 flex items-end justify-between border-b border-[#f4f4f4] pb-8">
                    <h2 className="text-3xl md:text-4xl font-light text-[#161616]">Nuestros Clientes</h2>
                    <span className="text-[10px] font-bold text-[#d12771] uppercase tracking-[0.2em] mb-1">Verificación Industrial Activa</span>
                </div>

                <div className="relative group">
                    <div className="flex animate-scroll whitespace-nowrap">
                        {[...inicio.clientes, ...inicio.clientes].map((cliente, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center justify-center bg-white px-12 h-32 border-r border-[#e0e0e0] grayscale hover:grayscale-0 transition-all min-w-[250px]"
                            >
                                {cliente.logoUrl ? (
                                    <img
                                        src={cliente.logoUrl}
                                        alt={cliente.nombre}
                                        className="h-16 w-auto object-contain max-w-[180px]"
                                    />
                                ) : (
                                    <span className="text-[#161616] font-bold uppercase tracking-tighter text-lg italic">
                                        {cliente.nombre}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industrial Quote Section */}
            <section className="py-32 bg-[#161616]">
                <div className="max-w-[1584px] mx-auto px-4">
                    <div className="bg-[#262626] p-12 md:p-24 border-l-8 border-[#d12771] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-[#393939]">
                            <Activity size={120} strokeWidth={0.5} />
                        </div>
                        <p className="text-2xl md:text-4xl font-light text-white leading-tight italic relative z-10">
                            "Transformando la infraestructura de administración del agua a través de la integración precisa de datos y la automatización inteligente para un futuro industrial sostenible."
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Inicio;
