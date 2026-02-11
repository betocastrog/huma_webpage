import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import DynamicNavbar from './components/DynamicNavbar';
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Productos from './pages/Productos';
import Instrumentacion from './pages/Instrumentacion';
import Aplicaciones from './pages/Aplicaciones';
import Contacto from './pages/Contacto';
import ControlPanel from './pages/Admin/ControlPanel';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <DynamicNavbar />
            <div className="flex-1">
                {children}
            </div>
            <footer className="bg-[#161616] text-[#525252] py-4 border-t border-[#393939]">
                <div className="max-w-[1584px] mx-auto px-4 flex justify-between items-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 Huma Automatización | Verificación Industrial</p>
                    <a href="/admin" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#0f62fe] transition-colors">
                        Panel de Control
                    </a>
                </div>
            </footer>
        </div>
    );
};

function App() {
    return (
        <SiteProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/admin" element={<ControlPanel />} />

                    <Route path="/" element={<PublicLayout><Inicio /></PublicLayout>} />
                    <Route path="/nosotros" element={<PublicLayout><Nosotros /></PublicLayout>} />
                    <Route path="/servicios" element={<PublicLayout><Servicios /></PublicLayout>} />
                    <Route path="/productos" element={<PublicLayout><Productos /></PublicLayout>} />
                    <Route path="/instrumentacion" element={<PublicLayout><Instrumentacion /></PublicLayout>} />
                    <Route path="/aplicaciones" element={<PublicLayout><Aplicaciones /></PublicLayout>} />
                    <Route path="/contacto" element={<PublicLayout><Contacto /></PublicLayout>} />
                </Routes>
            </Router>
        </SiteProvider>
    );
}

export default App;
