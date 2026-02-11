import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import {
    Home, Info, Package, Cpu, Layout, Phone,
    Plus, Trash2, LogOut, Eye, EyeOff, Settings, Image as ImageIcon,
    ChevronRight, Users, Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SiteConfig, CardItem, Client } from '../../types/site';

const ControlPanel = () => {
    const { siteData, updateSiteData } = useSite();
    const [activeTab, setActiveTab] = useState('branding');
    const navigate = useNavigate();

    // -- Local Editing State --
    const [tempData, setTempData] = useState<SiteConfig>(siteData);

    // Sync local state when siteData changes (e.g. on first load)
    useEffect(() => {
        setTempData(siteData);
    }, [siteData]);

    // -- Estado de Autenticación --
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

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

    const commitChanges = () => {
        updateSiteData(tempData);
    };

    const updateTempSection = (key: keyof SiteConfig['sections'], value: any) => {
        setTempData(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [key]: value
            }
        }));
    };

    const SaveButton = () => (
        <div className="mt-12 pt-8 border-t border-[#e0e0e0] flex justify-end">
            <button
                onClick={commitChanges}
                className="bg-[#0f62fe] text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#0043ce] transition-all flex items-center gap-3"
            >
                <Save size={20} /> Guardar Cambios
            </button>
        </div>
    );

    // --- COMPONENTES REUTILIZABLES (ESTILO CARBON) ---

    const TextInput = ({ label, value, onChange, multiline = false }: any) => (
        <div className="mb-8">
            <label className="block text-[11px] font-bold text-[#525252] uppercase tracking-[0.15em] mb-2">{label}</label>
            {multiline ? (
                <textarea
                    className="ibm-input min-h-[100px] resize-none"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type="text"
                    className="ibm-input"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );

    const ImageField = ({ label, value, onChange }: any) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const maxSize = 2 * 1024 * 1024;
                if (file.size > maxSize) {
                    alert("⚠️ El archivo es demasiado grande (máximo 2MB). Por favor, utilice una imagen comprimida.");
                    return;
                }

                const reader = new FileReader();
                reader.onloadend = () => {
                    onChange(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        };

        return (
            <div className="mb-8">
                <label className="block text-[11px] font-bold text-[#525252] uppercase tracking-[0.15em] mb-3">{label}</label>
                <div className="flex gap-6 items-start">
                    <div className="relative group">
                        <div className="w-40 h-40 bg-[#f4f4f4] border border-[#e0e0e0] flex items-center justify-center group-hover:border-[#0f62fe] transition-all relative overflow-hidden">
                            {value ? (
                                <img src={value} alt="Preview" className="w-full h-full object-contain p-4" />
                            ) : (
                                <div className="text-center p-4">
                                    <ImageIcon className="mx-auto text-[#a8a8a8] mb-2" size={32} />
                                    <span className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-widest">Sin archivo</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-[#0f62fe]/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Subir Archivo</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 pt-2">
                        <div className="p-4 border-l-2 border-[#009d9a] bg-[#f4f4f4]">
                            <p className="text-[10px] text-[#007d79] font-bold uppercase tracking-widest mb-1">Activos</p>
                            <p className="text-xs text-[#525252]">Formato recomendado: PNG o WebP.</p>
                        </div>
                        {value && (
                            <button
                                onClick={() => onChange('')}
                                className="mt-4 text-[#d12771] text-[10px] font-bold uppercase tracking-widest hover:bg-[#d12771] hover:text-white px-2 py-1 transition-all"
                            >
                                Eliminar activo
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const ListEditor = ({ label, items, onUpdate }: { label: string, items: string[], onUpdate: (newItems: string[]) => void }) => {
        const [newItem, setNewItem] = useState('');

        return (
            <div className="mb-10">
                <label className="block text-[11px] font-bold text-[#525252] uppercase tracking-[0.15em] mb-4">{label}</label>
                <div className="space-y-0.5">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center bg-[#f4f4f4] p-3 group border-l-2 border-transparent hover:border-[#0f62fe] transition-all">
                            <span className="text-[10px] font-mono text-[#a8a8a8] w-4">{idx + 1}</span>
                            <input
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-[#161616]"
                                value={item}
                                onChange={(e) => {
                                    const next = [...items];
                                    next[idx] = e.target.value;
                                    onUpdate(next);
                                }}
                            />
                            <button onClick={() => onUpdate(items.filter((_, i) => i !== idx))} className="text-[#a8a8a8] hover:text-[#d12771] transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <div className="flex gap-0 mt-4 h-12">
                        <input
                            className="flex-1 bg-white border border-[#e0e0e0] px-4 py-2 text-sm focus:border-[#0f62fe] outline-none"
                            placeholder="Agregar registro..."
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && newItem.trim()) {
                                    onUpdate([...items, newItem.trim()]);
                                    setNewItem('');
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                if (newItem.trim()) {
                                    onUpdate([...items, newItem.trim()]);
                                    setNewItem('');
                                }
                            }}
                            className="bg-[#161616] text-white px-4 hover:bg-[#393939] transition-all"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const ClientEditor = () => {
        const items = tempData.sections.inicio.clientes;

        const updateClient = (id: string, field: keyof Client, value: string) => {
            const next = items.map(item => item.id === id ? { ...item, [field]: value } : item);
            updateTempSection('inicio', { ...tempData.sections.inicio, clientes: next });
        };

        const addClient = () => {
            const newItem: Client = {
                id: Math.random().toString(36).substr(2, 9),
                nombre: 'Nuevo Cliente',
                logoUrl: ''
            };
            updateTempSection('inicio', { ...tempData.sections.inicio, clientes: [...items, newItem] });
        };

        const removeClient = (id: string) => {
            updateTempSection('inicio', { ...tempData.sections.inicio, clientes: items.filter(i => i.id !== id) });
        };

        return (
            <div className="space-y-12">
                <div className="flex justify-between items-end border-b border-[#e0e0e0] pb-6">
                    <div>
                        <h3 className="text-3xl font-light text-[#161616]">Nuestros Clientes</h3>
                        <p className="text-[11px] font-bold text-[#009d9a] uppercase tracking-widest mt-2">
                            Gestión de Logotipos Corporativos
                        </p>
                    </div>
                    <button onClick={addClient} className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest py-3 font-bold">
                        <Plus size={16} /> Agregar Cliente
                    </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {items.map((client) => (
                        <div key={client.id} className="bg-white border border-[#e0e0e0] p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-6 border-b border-[#f4f4f4] pb-2">
                                <span className="text-[10px] font-mono text-[#a8a8a8] uppercase tracking-widest">ID: {client.id}</span>
                                <button onClick={() => removeClient(client.id)} className="text-[#a8a8a8] hover:text-[#d12771] transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <div className="space-y-6">
                                <TextInput label="Nombre de la Institución" value={client.nombre} onChange={(val: string) => updateClient(client.id, 'nombre', val)} />
                                <ImageField label="Logotipo" value={client.logoUrl} onChange={(val: string) => updateClient(client.id, 'logoUrl', val)} />
                            </div>
                        </div>
                    ))}
                </div>
                <SaveButton />
            </div>
        );
    };

    const CardEditor = ({ sectionKey, title }: { sectionKey: keyof SiteConfig['sections'], title: string }) => {
        const items = (tempData.sections[sectionKey] as CardItem[]) || [];

        const updateItem = (id: string, field: keyof CardItem, value: string) => {
            const next = items.map(item => item.id === id ? { ...item, [field]: value } : item);
            updateTempSection(sectionKey, next);
        };

        const addItem = () => {
            const newItem: CardItem = {
                id: Math.random().toString(36).substr(2, 9),
                titulo: 'Nuevo Registro',
                descripcion: 'Descripción...',
                imageUrl: '',
                categoria: 'Genérico'
            };
            updateTempSection(sectionKey, [...items, newItem]);
        };

        const removeItem = (id: string) => {
            updateTempSection(sectionKey, items.filter(i => i.id !== id));
        };

        return (
            <div className="space-y-12">
                <div className="flex justify-between items-end border-b border-[#e0e0e0] pb-6">
                    <div>
                        <h3 className="text-3xl font-light text-[#161616]">{title}</h3>
                        <p className="text-[11px] font-bold text-[#009d9a] uppercase tracking-widest mt-2 italic flex items-center gap-2">
                            Protocolo de Datos Activo
                        </p>
                    </div>
                    <button onClick={addItem} className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest py-3 font-bold">
                        <Plus size={16} /> Agregar Entrada
                    </button>
                </div>
                <div className="space-y-12">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white border border-[#e0e0e0] p-8 shadow-sm">
                            <div className="flex justify-between items-start mb-8 pb-4 border-b border-[#f4f4f4]">
                                <span className="text-[10px] font-mono text-[#a8a8a8]">ID: {item.id}</span>
                                <button onClick={() => removeItem(item.id)} className="text-[#d12771] text-[10px] font-bold uppercase tracking-widest">
                                    Eliminar
                                </button>
                            </div>
                            <div className="grid lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-7 space-y-2">
                                    <TextInput label="Título" value={item.titulo} onChange={(val: string) => updateItem(item.id, 'titulo', val)} />
                                    <TextInput label="Categoría" value={item.categoria} onChange={(val: string) => updateItem(item.id, 'categoria', val)} />
                                    <TextInput label="Descripción" value={item.descripcion} onChange={(val: string) => updateItem(item.id, 'descripcion', val)} multiline />
                                </div>
                                <div className="lg:col-span-5">
                                    <ImageField label="Imagen" value={item.imageUrl} onChange={(val: string) => updateItem(item.id, 'imageUrl', val)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <SaveButton />
            </div>
        );
    };

    if (!isAuthenticated) return (
        <div className="min-h-screen bg-[#161616] flex items-center justify-center p-6">
            <div className="bg-white p-16 w-full max-w-lg border-t-8 border-[#0f62fe]">
                <div className="flex justify-center mb-12">
                    <img
                        src={tempData.branding.logoUrl}
                        alt="Logo"
                        className="h-16 w-auto object-contain"
                    />
                </div>
                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="relative">
                        <label className="block text-[11px] font-bold text-[#525252] uppercase tracking-[0.2em] mb-2">Llave de Acceso</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-[#f4f4f4] border-b-2 border-[#161616] px-6 py-5 focus:border-[#0f62fe] outline-none text-xl font-light tracking-[0.3em]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-5 text-[#a8a8a8] hover:text-[#161616]">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {loginError && <p className="text-[#d12771] text-xs font-bold uppercase p-4 border-l-2 border-[#d12771] bg-[#d12771]/5">{loginError}</p>}
                    <button type="submit" className="w-full py-5 bg-[#0f62fe] text-white font-bold uppercase tracking-[0.3em] hover:bg-[#0043ce] transition-all flex justify-between items-center px-10">
                        Autenticación <ChevronRight size={24} />
                    </button>
                </form>
            </div>
        </div>
    );

    const tabs = [
        { id: 'branding', label: 'Identidad', icon: Settings },
        { id: 'inicio', label: 'Lanzamiento', icon: Home },
        { id: 'clientes', label: 'Clientes', icon: Users },
        { id: 'nosotros', label: 'Génesis', icon: Info },
        { id: 'servicios', label: 'Servicios', icon: Package },
        { id: 'productos', label: 'Sistemas', icon: Cpu },
        { id: 'instrumentacion', label: 'Precisión', icon: Layout },
        { id: 'aplicaciones', label: 'Operaciones', icon: Layout },
        { id: 'contacto', label: 'Nodos', icon: Phone },
    ];

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row">
            {/* Sidebar (IBM Shell style) */}
            <aside className="w-full lg:w-64 bg-[#161616] fixed lg:h-full z-40 overflow-y-auto">
                <div className="p-6 border-b border-[#393939] flex items-center justify-between h-20">
                    <img
                        src={tempData.branding.logoUrl}
                        alt="Logo"
                        className="h-10 w-auto object-contain"
                    />
                    <div className="w-2 h-2 rounded-full bg-[#009d9a] animate-pulse"></div>
                </div>
                <nav className="p-0">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-medium transition-all border-l-4 ${activeTab === tab.id
                                ? 'bg-[#393939] text-white border-[#0f62fe]'
                                : 'text-[#a8a8a8] border-transparent hover:bg-[#262626] hover:text-white'}`}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                    <div className="mt-12 pt-8 border-t border-[#393939] space-y-0.5">
                        <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 px-6 py-4 text-[11px] font-bold text-[#a8a8a8] hover:text-white uppercase tracking-widest transition-all">
                            <Eye size={16} /> Vista Pública
                        </button>
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 text-[11px] font-bold text-[#a8a8a8] hover:text-white uppercase tracking-widest transition-all">
                            <LogOut size={16} /> Terminar Sesión
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Content Area */}
            <main className="flex-1 lg:ml-64 p-8 lg:p-16 pt-24 lg:pt-16">
                <div className="max-w-5xl mx-auto animate-in">

                    {activeTab === 'branding' && (
                        <div className="space-y-16">
                            <div className="bg-white p-12 border border-[#e0e0e0]">
                                <h3 className="text-3xl font-light mb-12 border-b border-[#f4f4f4] pb-6">Tokens de Identidad Global</h3>
                                <TextInput label="Eslogan Principal" value={tempData.branding.slogan} onChange={(val: string) => setTempData({ ...tempData, branding: { ...tempData.branding, slogan: val } })} />
                                <ImageField label="Activo de Logo Principal" value={tempData.branding.logoUrl} onChange={(val: string) => setTempData({ ...tempData, branding: { ...tempData.branding, logoUrl: val } })} />
                                <SaveButton />
                            </div>

                            <div className="bg-white p-12 border border-[#e0e0e0]">
                                <h3 className="text-3xl font-light mb-12 border-b border-[#f4f4f4] pb-6">Registro de Navegación</h3>
                                <div className="space-y-1">
                                    {tempData.navigation.map((item, idx) => (
                                        <div key={item.id} className="flex gap-6 items-center bg-[#f4f4f4] p-4 group">
                                            <span className="text-xs font-mono text-[#a8a8a8] w-4">{idx + 1}</span>
                                            <div className="flex-1">
                                                <label className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-widest block mb-1">Etiqueta</label>
                                                <input
                                                    className="w-full bg-white px-3 py-2 border-b border-[#e0e0e0] focus:border-[#0f62fe] outline-none font-bold"
                                                    value={item.label}
                                                    onChange={(e) => {
                                                        const next = [...tempData.navigation];
                                                        next[idx].label = e.target.value;
                                                        setTempData({ ...tempData, navigation: next });
                                                    }}
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <label className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-widest block mb-1">Contexto de Ruta</label>
                                                <span className="bg-[#e0e0e0] px-3 py-2 text-[11px] font-mono text-[#161616] block">{item.path}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <SaveButton />
                            </div>
                        </div>
                    )}

                    {activeTab === 'inicio' && (
                        <div className="space-y-16">
                            <div className="bg-white p-12 border border-[#e0e0e0]">
                                <h3 className="text-3xl font-light mb-12 border-b border-[#f4f4f4] pb-6">Parámetros de Lanzamiento</h3>
                                <ImageField label="Activo de Atmósfera (Hero)" value={tempData.sections.inicio.heroImg} onChange={(val: string) => updateTempSection('inicio', { ...tempData.sections.inicio, heroImg: val })} />
                                <SaveButton />
                            </div>
                        </div>
                    )}

                    {activeTab === 'clientes' && (
                        <div className="animate-in">
                            <ClientEditor />
                        </div>
                    )}

                    {activeTab === 'nosotros' && (
                        <div className="space-y-16">
                            <div className="bg-white p-12 border border-[#e0e0e0]">
                                <h3 className="text-3xl font-light mb-12 border-b border-[#f4f4f4] pb-6">Contexto de Génesis</h3>
                                <TextInput label="Historia Operacional" value={tempData.sections.nosotros.historia} onChange={(val: string) => updateTempSection('nosotros', { ...tempData.sections.nosotros, historia: val })} multiline />
                                <div className="grid md:grid-cols-2 gap-12">
                                    <TextInput label="Misión Estratégica" value={tempData.sections.nosotros.mision} onChange={(val: string) => updateTempSection('nosotros', { ...tempData.sections.nosotros, mision: val })} multiline />
                                    <TextInput label="Visión Central" value={tempData.sections.nosotros.vision} onChange={(val: string) => updateTempSection('nosotros', { ...tempData.sections.nosotros, vision: val })} multiline />
                                </div>
                                <ListEditor
                                    label="Valores Industriales"
                                    items={tempData.sections.nosotros.valores}
                                    onUpdate={(next) => updateTempSection('nosotros', { ...tempData.sections.nosotros, valores: next })}
                                />
                                <SaveButton />
                            </div>
                        </div>
                    )}

                    {['servicios', 'productos', 'instrumentacion', 'aplicaciones'].includes(activeTab) && (
                        <CardEditor sectionKey={activeTab as any} title={`Portafolio de ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`} />
                    )}

                    {activeTab === 'contacto' && (
                        <div className="space-y-16">
                            <div className="bg-white p-12 border border-[#e0e0e0]">
                                <h3 className="text-3xl font-light mb-12 border-b border-[#f4f4f4] pb-6">Nodos Físicos y Digitales</h3>
                                <div className="grid md:grid-cols-2 gap-x-12">
                                    <TextInput label="Dirección de HQ Global" value={tempData.sections.contacto.direccion} onChange={(val: string) => updateTempSection('contacto', { ...tempData.sections.contacto, direccion: val })} />
                                    <TextInput label="Línea de Comunicación" value={tempData.sections.contacto.telefono} onChange={(val: string) => updateTempSection('contacto', { ...tempData.sections.contacto, telefono: val })} />
                                </div>
                                <TextInput label="Puerta de Enlace Operacional (Email)" value={tempData.sections.contacto.email} onChange={(val: string) => updateTempSection('contacto', { ...tempData.sections.contacto, email: val })} />
                                <SaveButton />
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default ControlPanel;
