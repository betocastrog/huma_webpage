import React, { useState } from 'react';
import { useContent, SectionContent, NavItem } from '../../context/ContentContext';
import MediaEditor from '../../components/Admin/MediaEditor';
import { LogOut, RotateCcw, Monitor, LayoutDashboard, Menu as MenuIcon, Image as ImageIcon, Plus, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { content, updateSection, updateBrand, updateNavigation, resetContent } = useContent();
    const navigate = useNavigate();

    // -- Authentication State --
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // -- Tab State --
    const [activeTab, setActiveTab] = useState<'content' | 'navigation' | 'brand'>('content');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'huma2026') {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Contraseña incorrecta.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
    };

    // -- Content Handlers --
    const sections = ['hero', 'nosotros', 'servicios', 'productos', 'contacto'];

    const handleTextChange = (section: string, field: keyof SectionContent, value: string) => {
        updateSection(section, { [field]: value });
    };

    // -- Navigation Handlers --
    const handleNavChange = (id: string, field: keyof NavItem, value: string) => {
        const newNav = content.navigation.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        updateNavigation(newNav);
    };

    const handleAddNavItem = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        const newNav = [...content.navigation, { id: newId, name: 'Nuevo Link', path: '/' }];
        updateNavigation(newNav);
    };

    const handleDeleteNavItem = (id: string) => {
        if (confirm('¿Eliminar este ítem del menú?')) {
            const newNav = content.navigation.filter(item => item.id !== id);
            updateNavigation(newNav);
        }
    };

    // -- Render Logic --

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-huma-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            H
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">CMS Admin</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Contraseña de acceso"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-huma-blue outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                        <button type="submit" className="w-full py-2 bg-huma-blue text-white rounded-md hover:bg-huma-light transition-colors font-medium">
                            Entrar
                        </button>
                    </form>
                    <button onClick={() => navigate('/')} className="block w-full text-center mt-4 text-sm text-gray-400 hover:text-gray-600">
                        Volver al sitio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Bar */}
            <header className="bg-white shadow sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="text-huma-blue" />
                        <h1 className="text-xl font-bold text-gray-800">Panel de Control</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => window.open('/', '_blank')} className="btn-secondary flex items-center gap-2 text-sm text-huma-blue bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100">
                            <Monitor size={16} /> Ver Web
                        </button>
                        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
                            <LogOut size={16} /> Salir
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-4 w-full py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'content' ? 'bg-huma-blue text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ImageIcon size={20} /> Páginas
                    </button>
                    <button
                        onClick={() => setActiveTab('navigation')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'navigation' ? 'bg-huma-blue text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        <MenuIcon size={20} /> Menú & Rutas
                    </button>
                    <button
                        onClick={() => setActiveTab('brand')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'brand' ? 'bg-huma-blue text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Edit size={20} /> Identidad (Logo)
                    </button>

                    <div className="pt-8 border-t border-gray-200 mt-8">
                        <button onClick={resetContent} className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 text-red-500 hover:bg-red-50 text-sm">
                            <RotateCcw size={16} /> Restaurar Fábrica
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3 space-y-6">

                    {/* -- CONTENT EDITOR -- */}
                    {activeTab === 'content' && (
                        <div className="grid grid-cols-1 gap-8">
                            {sections.map((sectionKey) => {
                                const data = content[sectionKey];
                                if (!data) return null;
                                return (
                                    <div key={sectionKey} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 uppercase tracking-wider text-xs font-bold text-gray-500">
                                            Sección: {sectionKey}
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => handleTextChange(sectionKey, 'title', e.target.value)}
                                                className="w-full font-bold text-lg border-b border-gray-300 focus:border-huma-blue outline-none py-1 placeholder-gray-400"
                                                placeholder="Título Principal"
                                            />
                                            <textarea
                                                value={data.description}
                                                onChange={(e) => handleTextChange(sectionKey, 'description', e.target.value)}
                                                className="w-full text-gray-600 border border-gray-200 rounded p-3 focus:border-huma-blue outline-none resize-none h-24 text-sm"
                                                placeholder="Descripción de la sección..."
                                            />
                                            <div className="pt-2">
                                                <MediaEditor
                                                    label="Imagen de Fondo / Principal"
                                                    value={data.imageUrl}
                                                    onChange={(url) => handleTextChange(sectionKey, 'imageUrl', url)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* -- NAVIGATION EDITOR -- */}
                    {activeTab === 'navigation' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-800">Estructura del Menú</h3>
                                <button onClick={handleAddNavItem} className="flex items-center gap-2 text-sm bg-huma-blue text-white px-3 py-1.5 rounded-full hover:bg-huma-light">
                                    <Plus size={16} /> Agregar Link
                                </button>
                            </div>

                            <div className="space-y-4">
                                {content.navigation.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100 group">
                                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-500 uppercase font-bold">Etiqueta</label>
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => handleNavChange(item.id, 'name', e.target.value)}
                                                    className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:border-huma-blue outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 uppercase font-bold">Ruta (Path)</label>
                                                <input
                                                    type="text"
                                                    value={item.path}
                                                    onChange={(e) => handleNavChange(item.id, 'path', e.target.value)}
                                                    className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:border-huma-blue outline-none font-mono text-gray-600"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteNavItem(item.id)}
                                            className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-gray-400">
                                Nota: Las rutas deben corresponder a páginas existentes (/servicios, /contacto, etc) o enlaces externos.
                            </p>
                        </div>
                    )}

                    {/* -- BRAND / LOGO EDITOR -- */}
                    {activeTab === 'brand' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Identidad de Marca</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
                                    <input
                                        type="text"
                                        value={content.brand.name}
                                        onChange={(e) => updateBrand({ name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-huma-blue focus:border-huma-blue"
                                    />
                                </div>

                                <MediaEditor
                                    label="Logotipo Oficial (URL)"
                                    value={content.brand.logoUrl}
                                    onChange={(url) => updateBrand({ logoUrl: url })}
                                    helperText="Sube tu logo a un host y pega el link aquí. Recomendado: PNG Transparente, max-height 80px."
                                />

                                <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex justify-center items-center">
                                    {content.brand.logoUrl ? (
                                        <img src={content.brand.logoUrl} alt="Logo Preview" className="h-16 object-contain" />
                                    ) : (
                                        <span className="text-gray-400 italic">Sin logo configurado</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
