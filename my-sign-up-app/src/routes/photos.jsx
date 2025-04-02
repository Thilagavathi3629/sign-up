import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { fetchPhotos } from '../utils/api';

export const Route = createFileRoute('/photos')({
  component: RouteComponent,
  loader: async () => {
    console.log(' prefetching photos...');
    const data = await fetchPhotos();
    return { data };
  }
});

function RouteComponent() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos();
        setPhotos(data);
      } catch (error) {
        setError('Failed to load photos');
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const filteredPhotos = photos.filter((photo) =>
    photo.title?.toLowerCase().includes(filterText.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500 bg-opacity-20 p-8 rounded-lg border-2 border-red-500 animate-pulse">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-white">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center relative">
          {/* Neon Loading Effect */}
          <div className="w-20 h-20 border-4 border-t-blue-400 border-b-purple-400 border-l-pink-400 border-r-indigo-400 rounded-full animate-spin mx-auto shadow-lg shadow-blue-500/50"></div>
          <div className="absolute w-8 h-8 bg-purple-500 rounded-full top-6 left-6 animate-ping opacity-75"></div>
          <p className="mt-6 text-xl font-medium text-gray-300">Loading your gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl"></div>
      </div>

      <header className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-6">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Photos Gallery
            </span>
            <span className="block text-sm font-light mt-2 text-gray-400">Your visual adventure</span>
          </h1>
          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search photos..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full bg-gray-800 text-white border-2 border-purple-500 rounded-full py-3 px-5 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 max-w-6xl mx-auto relative z-10">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No photos found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.slice(0, 30).map((photo) => (
              <div key={photo.id} className="group perspective">
                <div className="bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-500 group-hover:shadow-xl shadow-md border border-gray-700 group-hover:border-purple-500 group-hover:rotate-2 group-hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://picsum.photos/id/${photo.id % 30}/300/300`}
                      alt={photo.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 relative">
                    <h3 className="font-medium text-gray-300 group-hover:text-cyan-300 transition-colors duration-300 truncate">{photo.title || 'Untitled'}</h3>
                    <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 mt-2 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-12 py-8 relative z-10 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <button
              onClick={() => navigate({ to: '/Home' })}
              className="px-6 py-3 mr-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-full transition-all duration-300 hover:bg-cyan-500 hover:text-gray-900"
            >
              Back Home
            </button>
            <button
              onClick={() => navigate({ to: '/' })}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Logout
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}