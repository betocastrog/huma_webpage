import React from 'react';
import { useSite } from '../context/SiteContext';

const Nosotros: React.FC = () => {
    const { siteData } = useSite();
    const { nosotros } = siteData.sections;

    return (
        <div className="pt-12 md:pt-14 bg-white min-h-screen">
            <header className="bg-[#161616] py-16 md:py-32 border-b border-[#e0e0e0] text-white">
                <div className="max-w-[1584px] mx-auto px-4">
                    <p className="text-[#0F62FE] font-medium mb-4 text-sm uppercase tracking-widest">Sobre Huma</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight max-w-4xl">
                        Nuestra misión es transformar la administración del agua con ingeniería de precisión.
                    </h1>
                </div>
            </header>

            <main className="max-w-[1584px] mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#161616] mb-8 border-b border-[#e0e0e0] pb-2 inline-block">
                            Nuestra Historia
                        </h2>
                        <p className="text-xl md:text-2xl font-light text-[#525252] leading-relaxed mb-12">
                            {nosotros.historia}
                        </p>

                        <div className="grid md:grid-cols-2 gap-12 mt-20">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F62FE] mb-4">Misión</h3>
                                <p className="text-[#161616] text-lg font-light leading-relaxed">
                                    {nosotros.mision}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F62FE] mb-4">Visión</h3>
                                <p className="text-[#161616] text-lg font-light leading-relaxed">
                                    {nosotros.vision}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-[#f4f4f4] p-10 border-t-4 border-[#0F62FE]">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[#161616] mb-8">
                                Valores Fundamentales
                            </h2>
                            <ul className="space-y-6">
                                {nosotros.valores.map((valor, index) => (
                                    <li key={index} className="flex items-center gap-4 group">
                                        <span className="w-8 h-[1px] bg-[#e0e0e0] group-hover:bg-[#0F62FE] group-hover:w-12 transition-all"></span>
                                        <span className="text-lg font-normal text-[#161616]">{valor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* Technical Detail Section */}
            <section className="bg-[#161616] py-24 text-white">
                <div className="max-w-[1584px] mx-auto px-4 flex flex-col md:flex-row justify-between items-end gap-8">
                    <h2 className="text-3xl font-light max-w-xl">
                        Expertos en control hídrico desde 1993, integrando las mejores marcas tecnológicas del mercado.
                    </h2>
                    <div className="w-full md:w-auto">
                        <button className="bg-[#0F62FE] text-white px-8 py-4 font-medium hover:bg-[#0043CE] transition-colors w-full md:w-auto">
                            Explorar Capacidad Técnica
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Nosotros;
