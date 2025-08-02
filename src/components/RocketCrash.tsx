import React, { useState, useEffect } from 'react';
import { useAuth } from './Auth';
import { Rocket, Zap, TrendingUp, AlertCircle } from 'lucide-react';

interface RocketCrashProps {
  isConnected: boolean;
}

const RocketCrash: React.FC<RocketCrashProps> = ({ isConnected }) => {
  const { address } = useAuth();
  const [betAmount, setBetAmount] = useState<string>('');
  const [cashoutMultiplier, setCashoutMultiplier] = useState<string>('2.0');
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [gameHistory, setGameHistory] = useState<number[]>([1.5, 2.3, 1.8, 3.2, 1.2]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive) {
      interval = setInterval(() => {
        setCurrentMultiplier(prev => prev + 0.1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  const startGame = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!betAmount || parseFloat(betAmount) < 0.01) {
      setError('Please enter a valid bet amount (min 0.01 APT)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // In real implementation, this would call the smart contract
      console.log('Starting Rocket Crash game...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsGameActive(true);
      setCurrentMultiplier(1.0);
    } catch (err) {
      setError('Failed to start game');
    } finally {
      setIsLoading(false);
    }
  };

  const cashout = async () => {
    if (!isGameActive) return;

    setIsLoading(true);
    try {
      // In real implementation, this would call the smart contract
      console.log('Cashing out at multiplier:', currentMultiplier);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to history
      setGameHistory(prev => [currentMultiplier, ...prev.slice(0, 4)]);
      
      setIsGameActive(false);
      setCurrentMultiplier(1.0);
      setBetAmount('');
    } catch (err) {
      setError('Failed to cashout');
    } finally {
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setIsGameActive(false);
    setCurrentMultiplier(1.0);
    setBetAmount('');
    setError('');
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center border border-amber-200/30">
          <Rocket size={20} className="text-amber-800" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-amber-100">Rocket Crash</h2>
          <p className="text-amber-200 text-sm">Cash out before the rocket crashes!</p>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rocket size={24} className="text-amber-300" />
          </div>
          <h3 className="text-lg font-medium text-amber-200 mb-2">Connect Wallet</h3>
          <p className="text-amber-300 text-sm">
            Connect your wallet to play Rocket Crash
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Game Display */}
          <div className="bg-stone-800/50 rounded-lg p-6 border border-stone-700">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-100 mb-2">
                {isGameActive ? `${currentMultiplier.toFixed(1)}x` : '1.0x'}
              </div>
              <div className="text-sm text-amber-300">
                {isGameActive ? 'Rocket is flying!' : 'Ready to launch'}
              </div>
            </div>
          </div>

          {/* Game History */}
          <div className="flex justify-center space-x-2">
            {gameHistory.map((multiplier, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  multiplier >= 2.0 
                    ? 'bg-green-900/20 text-green-400 border border-green-500/30'
                    : 'bg-red-900/20 text-red-400 border border-red-500/30'
                }`}
              >
                {multiplier.toFixed(1)}x
              </div>
            ))}
          </div>

          {/* Bet Amount */}
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">
              Bet Amount (APT)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max="100"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="0.01"
              className="input-field w-full"
              disabled={isGameActive || !isConnected}
            />
          </div>

          {/* Cashout Multiplier */}
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">
              Auto Cashout at
            </label>
            <input
              type="number"
              step="0.1"
              min="1.1"
              max="10"
              value={cashoutMultiplier}
              onChange={(e) => setCashoutMultiplier(e.target.value)}
              className="input-field w-full"
              disabled={isGameActive}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 flex items-center space-x-2">
              <AlertCircle size={16} className="text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!isGameActive ? (
              <button
                onClick={startGame}
                disabled={isLoading || !isConnected}
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Rocket size={16} />
                <span>
                  {isLoading ? 'Starting...' : 'Start Game'}
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={cashout}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap size={16} />
                  <span>
                    {isLoading ? 'Cashing Out...' : 'Cash Out'}
                  </span>
                </button>
                <button
                  onClick={resetGame}
                  className="bg-stone-700 hover:bg-stone-600 text-amber-200 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  Reset
                </button>
              </>
            )}
          </div>

          {/* Game Info */}
          <div className="bg-stone-800/30 rounded-lg p-4 border border-stone-700">
            <h3 className="text-sm font-medium text-amber-200 mb-2">How to Play</h3>
            <div className="space-y-1 text-xs text-amber-300">
              <p>• Place your bet and start the game</p>
              <p>• The multiplier increases over time</p>
              <p>• Cash out before the rocket crashes to win</p>
              <p>• Higher multipliers = bigger rewards</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RocketCrash; 