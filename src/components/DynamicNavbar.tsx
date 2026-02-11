import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

const DynamicNavbar: React.FC = () => {
    const { siteData } = useSite();
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white text-[#161616] border-b border-[#e0e0e0] z-50 h-12 md:h-14">
            <div className="max-w-[1584px] mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex items-center gap-8 h-full">
                    <Link to="/" className="flex items-center gap-2 pr-6 border-r border-[#e0e0e0] h-full">
                        <img
                            src={siteData.branding.logoUrl}
                            alt="Logo"
                            className="h-8 w-auto object-contain"
                        />
                    </Link>

                    <div className="hidden md:flex items-center h-full">
                        {siteData.navigation.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`text-sm h-full flex items-center px-4 transition-colors relative hover:bg-[#f4f4f4] ${location.pathname === item.path
                                    ? 'bg-[#f4f4f4] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0F62FE]'
                                    : ''
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/contacto"
                        className="bg-[#0f62fe] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#0043ce] transition-all"
                    >
                        CONTACTAR
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default DynamicNavbar;
