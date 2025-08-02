import React from 'react';
import { Crown, Gift, Coins, Users, ExternalLink } from 'lucide-react';

const NFTInfoCard: React.FC = () => {
  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center border border-amber-200/30">
          <Crown size={20} className="text-amber-800" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-amber-100">KUROI NFT Benefits</h2>
          <p className="text-amber-200 text-sm">Exclusive rewards for NFT holders</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Gift size={16} className="text-amber-400" />
            <span className="text-amber-300 text-sm">50% off game fees</span>
          </div>
          <div className="flex items-center space-x-2">
            <Coins size={16} className="text-amber-400" />
            <span className="text-amber-300 text-sm">Weekly dividends</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-amber-400" />
            <span className="text-amber-300 text-sm">Exclusive access</span>
          </div>
        </div>

        <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
          <div className="text-center">
            <h3 className="text-amber-100 font-medium mb-2">Get KUROI NFTs</h3>
            <p className="text-amber-300 text-sm mb-3">
              Own KUROI NFTs to unlock exclusive benefits and earn dividends from platform revenue
            </p>
            <a 
              href="https://wapal.io/collection/Kuroi-0x79901c2e5752018de789bba229facd4ddfbff65c4a74ee4dc7b3dbc68d2585db" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              <ExternalLink size={16} />
              <span>View Collection</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTInfoCard; 