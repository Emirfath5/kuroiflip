import React, { useState, useEffect } from 'react';
import { useAuth } from './Auth';
import { Crown, Coins, Gift, Users, X } from 'lucide-react';

const NFTBanner: React.FC = () => {
  const { address, isConnected } = useAuth();
  const [nftCount, setNftCount] = useState<number>(0);
  const [dividendAmount, setDividendAmount] = useState<string>('0.00');
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real implementation, this would fetch from blockchain

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

  // Don't show banner if user is not connected, has no NFTs, or dismissed it
  if (!isConnected || nftCount === 0 || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - NFT info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Crown size={16} className="text-amber-400" />
              <span className="text-amber-200 text-sm font-medium">
                KUROI NFT Holder
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Coins size={14} className="text-amber-400" />
              <span className="text-amber-100 text-sm">
                {nftCount} NFTs • {dividendAmount} APT available
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-amber-300">
              <div className="flex items-center space-x-1">
                <Gift size={12} />
                <span>50% off fees</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={12} />
                <span>Exclusive access</span>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {parseFloat(dividendAmount) > 0 && (
              <button
                onClick={claimDividends}
                disabled={isLoading}
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200 flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Coins size={12} />
                <span>
                  {isLoading ? 'Claiming...' : 'Claim Dividends'}
                </span>
              </button>
            )}
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-amber-400 hover:text-amber-300 transition-colors"
              title="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTBanner; 