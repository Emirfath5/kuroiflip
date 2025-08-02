import React from 'react';
import { useAuth } from './Auth';
import { Wallet, Twitter, ExternalLink, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { address, isConnected, isLoading, error, connect, disconnect } = useAuth();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center border-2 border-amber-200/50 shadow-lg">
                <div className="text-amber-800 font-black text-xl tracking-tight">K</div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-amber-100 tracking-wider">KUROI</h1>
                <span className="text-xs text-amber-300 tracking-widest font-medium">FLIP</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="https://twitter.com/KuroiNFTs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-amber-200 hover:text-amber-100 transition-colors"
            >
              <Twitter size={18} />
              <span>Twitter</span>
            </a>
            <a 
              href="https://www.tradeport.xyz/aptos/collection/aptos-kuroi-f0b9fb78?bottomTab=trades&tab=items" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-amber-200 hover:text-amber-100 transition-colors"
            >
              <ExternalLink size={18} />
              <span>TradePort</span>
            </a>
            <a 
              href="https://wapal.io/collection/Kuroi-0x79901c2e5752018de789bba229facd4ddfbff65c4a74ee4dc7b3dbc68d2585db" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-amber-200 hover:text-amber-100 transition-colors"
            >
              <ExternalLink size={18} />
              <span>Wapal</span>
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="bg-stone-800 px-3 py-2 rounded-lg border border-stone-700">
                  <span className="text-amber-200 text-sm">
                    {formatAddress(address!)}
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="flex items-center space-x-2 text-amber-300 hover:text-red-400 transition-colors"
                  title="Disconnect Wallet"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isLoading}
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <Wallet size={18} />
                <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 