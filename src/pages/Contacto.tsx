import React from 'react';
import { useSite } from '../context/SiteContext';

const Contacto: React.FC = () => {
    const { siteData } = useSite();
    const { contacto } = siteData.sections;

    return (
        <div className="pt-12 md:pt-14 bg-white min-h-screen">
            <header className="bg-[#f4f4f4] py-16 md:py-24 border-b border-[#e0e0e0]">
                <div className="max-w-[1584px] mx-auto px-4">
                    <p className="text-[#0F62FE] font-medium mb-2 text-sm uppercase tracking-widest">Contacto</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#161616]">
                        Estamos listos para optimizar su infraestructura.
                    </h1>
                </div>
            </header>

            <main className="max-w-[1584px] mx-auto flex flex-col lg:flex-row">
                {/* Contact Info - IBM Style */}
                <div className="lg:w-1/2 p-4 md:p-16 lg:p-24 border-r border-[#e0e0e0] bg-white">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#161616] mb-12">Información Corporativa</h2>

                    <div className="space-y-16">
                        <div className="group">
                            <h3 className="text-xs font-bold text-[#525252] uppercase mb-4 tracking-widest group-hover:text-[#0F62FE] transition-colors">Ubicación Móvil y Física</h3>
                            <p className="text-2xl font-light text-[#161616] leading-tight">
                                {contacto.direccion}
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="group flex-1">
                                <h3 className="text-xs font-bold text-[#525252] uppercase mb-4 tracking-widest group-hover:text-[#0F62FE] transition-colors">Teléfono Directo</h3>
                                <p className="text-2xl font-light text-[#161616]">
                                    {contacto.telefono}
                                </p>
                            </div>
                            <div className="group flex-1">
                                <h3 className="text-xs font-bold text-[#525252] uppercase mb-4 tracking-widest group-hover:text-[#0F62FE] transition-colors">Correo Electrónico</h3>
                                <p className="text-2xl font-light text-[#161616]">
                                    {contacto.email}
                                </p>
                            </div>
                        </div>

                        <div className="pt-8 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-crosshair">
                            <div className="h-64 bg-gray-200 border border-[#e0e0e0] flex items-center justify-center">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 font-mono">[ Vista de Mapa Industrial ]</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form - IBM Style */}
                <div className="lg:w-1/2 p-4 md:p-16 lg:p-24 bg-[#f4f4f4]">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#161616] mb-12">Solicitar Asistencia Técnica</h2>

                    <form className="space-y-8">
                        <div>
                            <label className="block text-xs font-bold text-[#525252] uppercase mb-2">Nombre completo</label>
                            <input
                                type="text"
                                className="w-full bg-white border-b-2 border-[#e0e0e0] focus:border-[#0F62FE] p-4 outline-none transition-colors text-lg font-light"
                                placeholder="Escribe tu nombre..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#525252] uppercase mb-2">Correo corporativo</label>
                            <input
                                type="email"
                                className="w-full bg-white border-b-2 border-[#e0e0e0] focus:border-[#0F62FE] p-4 outline-none transition-colors text-lg font-light"
                                placeholder="email@empresa.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#525252] uppercase mb-2">Mensaje o requerimiento</label>
                            <textarea
                                rows={5}
                                className="w-full bg-white border-b-2 border-[#e0e0e0] focus:border-[#0F62FE] p-4 outline-none transition-colors text-lg font-light resize-none"
                                placeholder="Describa brevemente su necesidad técnica..."
                            ></textarea>
                        </div>

                        <button className="w-full bg-[#161616] text-white p-5 font-medium hover:bg-[#393939] active:bg-[#0F62FE] transition-all flex justify-between items-center group">
                            <span className="uppercase tracking-widest text-sm font-bold">Enviar Requerimiento</span>
                            <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                        </button>

                        <p className="text-[10px] text-[#525252] leading-tight mt-6">
                            Al enviar este formulario, usted acepta nuestra política de privacidad industrial y el procesamiento de sus datos técnicos para fines de consultoría profesional.
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Contacto;
