'use client';

import { useState } from 'react';

export default function DBConfigPage() {
    const [uri, setUri] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null);

    const handleTestConnection = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/check-db', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uri }),
            });

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setResult({
                success: false,
                message: 'Error de red al intentar validar la conexión.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Conectar MongoDB Atlas</h1>
            <p className="text-sm text-gray-600 mb-6">
                Pega tu cadena de conexión (URI) para comprobar que la base de datos esté lista para CIPLatam.
            </p>

            <form onSubmit={handleTestConnection} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        URI de MongoDB Atlas:
                    </label>
                    <input
                        type="text"
                        placeholder="mongodb+srv://usuario:password@cluster.mongodb.net/dbname"
                        value={uri}
                        onChange={(e) => setUri(e.target.value)}
                        required
                        className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`p-3 text-white font-semibold rounded-md transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Verificando...' : 'Probar Conexión'}
                </button>
            </form>

            {result && (
                <div
                    className={`mt-6 p-4 rounded-md border text-sm ${result.success
                        ? 'bg-green-50 border-green-300 text-green-800'
                        : 'bg-red-50 border-red-300 text-red-800'
                        }`}
                >
                    <strong>{result.success ? '¡Éxito!' : 'Error:'}</strong> {result.message}
                </div>
            )}
        </div>
    );
}