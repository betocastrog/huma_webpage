import React from 'react';
import { CardItem } from '../types/site';

interface GridPageProps {
    title: string;
    items: CardItem[];
}

const GridPage: React.FC<GridPageProps> = ({ title, items }) => {
    return (
        <div className="pt-12 md:pt-14 bg-white min-h-screen">
            <header className="bg-[#f4f4f4] py-16 md:py-24 border-b border-[#e0e0e0]">
                <div className="max-w-[1584px] mx-auto px-4">
                    <p className="text-[#0F62FE] font-medium mb-2 text-sm uppercase tracking-widest">Portafolio Huma</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#161616]">
                        {title}
                    </h1>
                </div>
            </header>

            <main className="max-w-[1584px] mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#e0e0e0]">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border-r border-b border-[#e0e0e0] flex flex-col group hover:bg-[#f4f4f4] transition-colors overflow-hidden"
                        >
                            <div className="relative h-72 overflow-hidden bg-[#f4f4f4]">
                                <img
                                    src={item.imageUrl}
                                    alt={item.titulo}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                />
                                {item.categoria && (
                                    <div className="absolute top-0 left-0 bg-[#0F62FE] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                        {item.categoria}
                                    </div>
                                )}
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-normal text-[#161616] mb-4 group-hover:text-[#0F62FE] transition-colors">
                                    {item.titulo}
                                </h3>
                                <p className="text-[#525252] text-sm leading-relaxed mb-8">
                                    {item.descripcion}
                                </p>
                                <div className="mt-auto flex justify-between items-center pt-6 border-t border-[#f4f4f4] group-hover:border-[#e0e0e0]">
                                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-[#0F62FE] transition-colors">
                                        Explorar detalles
                                    </span>
                                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Placeholder for expansion */}
                    {items.length % 3 !== 0 && Array.from({ length: 3 - (items.length % 3) }).map((_, i) => (
                        <div key={`empty-${i}`} className="border-r border-b border-[#e0e0e0] bg-[#f4f4f4]/30 hidden lg:block" />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default GridPage;
