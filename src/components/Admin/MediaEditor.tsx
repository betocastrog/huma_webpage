import React, { useState, useRef } from 'react';
import { Eye, Check, X, Upload, Image as ImageIcon } from 'lucide-react';

interface MediaEditorProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    helperText?: string;
}

const MediaEditor: React.FC<MediaEditorProps> = ({ label, value, onChange, helperText }) => {
    const [isValid, setIsValid] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageError = () => {
        setIsValid(false);
    };

    const handleImageLoad = () => {
        setIsValid(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check size (localStorage has limits, usually 5MB total)
            if (file.size > 1024 * 1024 * 0.8) { // 800KB limit for safety
                alert("La imagen es muy pesada. Favor de subir una imagen menor a 800KB para asegurar la persistencia.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onChange(base64String);
                setIsValid(true);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mb-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <ImageIcon size={16} className="text-huma-blue" />
                {label}
                {value && (
                    isValid ? (
                        <Check size={14} className="text-green-500" />
                    ) : (
                        <X size={14} className="text-red-500" />
                    )
                )}
            </label>

            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    {/* Preview Box */}
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center flex-shrink-0">
                        {value ? (
                            <img
                                src={value}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                            />
                        ) : (
                            <Eye className="text-gray-300" />
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex-grow space-y-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 bg-huma-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-huma-light transition-all w-full justify-center"
                        >
                            <Upload size={16} /> Subir Imagen Local
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider">Formatos: JPG, PNG, WEBP</p>
                    </div>

                    {value && (
                        <button
                            onClick={() => onChange('')}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Quitar imagen"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* URL Fallback (optional but kept as a hidden feature or developer tool) */}
                <div className="relative group">
                    <input
                        type="text"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] text-gray-400 outline-none focus:border-huma-blue transition-all"
                        value={value.startsWith('data:') ? '[Archivo Local Carregado]' : value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="O pegue una URL aquí..."
                    />
                    <div className="absolute right-2 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] text-gray-300 font-bold uppercase">Modo URL</span>
                    </div>
                </div>

                {helperText && <p className="text-xs text-gray-400 italic">{helperText}</p>}
            </div>
        </div>
    );
};

export default MediaEditor;
