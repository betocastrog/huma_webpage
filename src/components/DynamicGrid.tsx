import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface DynamicGridProps {
    sectionKey: string; // 'servicios', 'productos', etc.
    items?: any[]; // Keep for compatibility if we pass array data
    limit?: number;
}

// NOTE: Ideally, the grid items themselves would also be in the CMS context (arrays of items).
// For now, we are mixing the Section Header (from CMS) with the Item List (from static data or future dynamic list).
// This component adapts to show the section header dynamically.

const DynamicGrid: React.FC<DynamicGridProps> = ({ sectionKey, items = [], limit }) => {
    const { content } = useContent();
    const sectionData = content[sectionKey];

    if (!sectionData) return null;

    const displayItems = limit ? items.slice(0, limit) : items;

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Dynamic Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-huma-blue font-semibold tracking-wider uppercase text-sm mb-2 block">
                        {sectionKey}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 capitalize">
                        {sectionData.title}
                    </h2>
                    <div className="w-24 h-1 bg-huma-blue mx-auto rounded-full mb-6"></div>
                    <p className="text-xl text-gray-600">
                        {sectionData.description}
                    </p>
                </div>

                {/* Dynamic Grid Content */}
                {/* Note: The items array is currently passed as prop, but the Section info is from Context */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayItems.length > 0 ? (
                        displayItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
                            >
                                <div className="h-48 overflow-hidden bg-gray-200 relative">
                                    {/* If items were dynamic objects, we'd use their image property here */}
                                    {/* Fallback to section image + index for variety if item doesn't have image */}
                                    <img
                                        src={item.imageUrl || `https://placehold.co/600x400/005b96/ffffff?text=${encodeURIComponent(item.title)}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-huma-blue transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                                        {item.desc || item.description}
                                    </p>
                                    <Link
                                        to={`/${sectionKey}`}
                                        className="inline-flex items-center text-huma-blue font-semibold hover:text-huma-light transition-colors text-sm uppercase tracking-wide"
                                    >
                                        Ver Detalle <ArrowRight size={16} className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Fallback if no items passed, show a placeholder using the main section image
                        <div className="col-span-full text-center py-10">
                            <img
                                src={sectionData.imageUrl}
                                alt={sectionData.title}
                                className="mx-auto rounded-lg shadow-lg max-h-64 object-cover mb-4"
                            />
                            <p className="text-gray-500">Contenido en construcción...</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default DynamicGrid;
