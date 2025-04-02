import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useNavigate, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: Home,
});

function Home() {
  const navigate = useNavigate(); // Initialize the navigate hook
  const router = useRouter(); // Access the router instance
  
  // Prefetch the /photos route when the user hovers over the button
  const handlePrefetch = () => {
    router.load({ to: '/photos' }) // Use router.load() to prefetch the /photos route
      .then(() => console.log('Prefetching complete for /photos'))
      .catch((err) => console.error('Error prefetching /photos:', err));
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-[#0b0b2a] text-white">
      <div className="text-center p-8 rounded-lg border border-purple-500 shadow-lg shadow-purple-500/30 backdrop-blur-sm bg-black/20">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Welcome Home!</h1>
        
        <div className="space-y-6">
          <button
            onMouseEnter={handlePrefetch}
            onClick={() => navigate({ to: '/photos' })}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1"
          >
            Go to Photos
          </button>
          
          <div className="pt-6 border-t border-purple-800/50">
            <button
              onClick={() => navigate({ to: '/' })}
              className="px-6 py-2 bg-transparent border-2 border-red-500 text-red-400 rounded-full transition-all duration-300 hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}