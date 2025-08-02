import React, { useState, useEffect } from 'react';
import { useAuth } from './Auth';
import { Crown, Coins, Gift, Users } from 'lucide-react';

interface NFTDividendsProps {
  isConnected: boolean;
}

const NFTDividends: React.FC<NFTDividendsProps> = ({ isConnected }) => {
  const { address } = useAuth();
  const [nftCount, setNftCount] = useState<number>(0);
  const [dividendAmount, setDividendAmount] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real implementation, this would fetch from blockchain
  const nftContractAddress = "0x79901c2e5752018de789bba229facd4ddfbff65c4a74ee4dc7b3dbc68d2585db";

  useEffect(() => {
    if (isConnected && address) {
      // In real implementation, fetch NFT balance from blockchain
      // For now, using mock data
      setNftCount(2); // Mock: user has 2 KUROI NFTs
      setDividendAmount('0.15'); // Mock: 0.15 APT available
    } else {
      setNftCount(0);
      setDividendAmount('0.00');
    }
  }, [isConnected, address]);

  const claimDividends = async () => {
    if (!isConnected || !address) {
      return;
    }

    setIsLoading(true);
    try {
      // In real implementation, this would call the smart contract
      // to claim dividends for NFT holders
      console.log('Claiming dividends...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDividendAmount('0.00');
    } catch (error) {
      console.error('Failed to claim dividends:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center border border-amber-200/30">
          <Crown size={20} className="text-amber-800" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-amber-100">NFT Holder Benefits</h2>
          <p className="text-amber-200 text-sm">Exclusive rewards for KUROI NFT holders</p>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown size={24} className="text-amber-300" />
          </div>
          <h3 className="text-lg font-medium text-amber-200 mb-2">Connect Wallet</h3>
          <p className="text-amber-300 text-sm">
            Connect your wallet to view your NFT benefits
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* NFT Balance */}
          <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown size={16} className="text-amber-400" />
                <span className="text-amber-200 text-sm">KUROI NFTs Owned</span>
              </div>
              <span className="text-amber-100 font-semibold">{nftCount}</span>
            </div>
          </div>

          {/* Available Dividends */}
          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Coins size={16} className="text-amber-400" />
                <span className="text-amber-200 text-sm">Available Dividends</span>
              </div>
              <span className="text-amber-100 font-semibold">{dividendAmount} APT</span>
            </div>
            <p className="text-amber-300 text-xs">
              Earned from game fees and platform revenue
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-amber-200 mb-3">NFT Holder Benefits</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Gift size={14} className="text-amber-400" />
                <span className="text-amber-300">Reduced game fees (50% off)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Coins size={14} className="text-amber-400" />
                <span className="text-amber-300">Weekly dividend distributions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Users size={14} className="text-amber-400" />
                <span className="text-amber-300">Exclusive access to new games</span>
              </div>
            </div>
          </div>

          {/* Claim Button */}
          {parseFloat(dividendAmount) > 0 && (
            <button
              onClick={claimDividends}
              disabled={isLoading}
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Coins size={16} />
              <span>
                {isLoading ? 'Claiming...' : 'Claim Dividends'}
              </span>
            </button>
          )}

          {/* NFT Collection Link */}
          <div className="text-center pt-4 border-t border-stone-700">
            <a 
              href="https://wapal.io/collection/Kuroi-0x79901c2e5752018de789bba229facd4ddfbff65c4a74ee4dc7b3dbc68d2585db" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              View KUROI NFT Collection →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTDividends; 