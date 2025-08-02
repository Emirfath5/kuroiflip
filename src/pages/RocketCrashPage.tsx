import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth';
import { Rocket, Zap, TrendingUp, AlertCircle, ArrowLeft, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NFTBanner from '../components/NFTBanner';

const RocketCrashPage: React.FC = () => {
  const { address, isConnected } = useAuth();
  const navigate = useNavigate();
  const [betAmount, setBetAmount] = useState<string>('');
  const [cashoutMultiplier, setCashoutMultiplier] = useState<string>('2.0');
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [gameHistory, setGameHistory] = useState<number[]>([1.5, 2.3, 1.8, 3.2, 1.2, 4.1, 1.9, 2.7]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [autoCashoutEnabled, setAutoCashoutEnabled] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive) {
      interval = setInterval(() => {
        setCurrentMultiplier(prev => prev + 0.1);
        setElapsedTime(Date.now() - gameStartTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, gameStartTime]);

  // Auto cashout logic
  useEffect(() => {
    if (isGameActive && autoCashoutEnabled && currentMultiplier >= parseFloat(cashoutMultiplier)) {
      cashout();
    }
  }, [currentMultiplier, autoCashoutEnabled, cashoutMultiplier, isGameActive]);

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
      setGameStartTime(Date.now());
      setElapsedTime(0);
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
      setGameHistory(prev => [currentMultiplier, ...prev.slice(0, 7)]);
      
      setIsGameActive(false);
      setCurrentMultiplier(1.0);
      setBetAmount('');
      setAutoCashoutEnabled(false);
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
    setAutoCashoutEnabled(false);
    setElapsedTime(0);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

    return (
      <div className="min-h-screen bg-stone-900">
        {/* Header */}
        <div className="bg-stone-800 border-b border-stone-700">
        </div>
        <NFTBanner />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-amber-200 hover:text-amber-100 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Games</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-amber-300">
                <Users size={16} />
                <span className="text-sm">1,247 players</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-300">
                <Clock size={16} />
                <span className="text-sm">Next round in 30s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <div className="card">
              {/* Game Display */}
              <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-lg p-8 border border-stone-700 mb-6">
                <div className="text-center">
                  <div className="text-6xl font-black text-amber-100 mb-4">
                    {isGameActive ? `${currentMultiplier.toFixed(1)}x` : '1.0x'}
                  </div>
                  <div className="text-lg text-amber-300 mb-2">
                    {isGameActive ? '🚀 Rocket is flying!' : 'Ready to launch'}
                  </div>
                  {isGameActive && (
                    <div className="text-sm text-amber-400">
                      Time: {formatTime(elapsedTime)}
                    </div>
                  )}
                </div>
              </div>

              {/* Game History */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-amber-200 mb-3">Recent Results</h3>
                <div className="grid grid-cols-8 gap-2">
                  {gameHistory.map((multiplier, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded text-center text-sm font-medium ${
                        multiplier >= 2.0 
                          ? 'bg-green-900/20 text-green-400 border border-green-500/30'
                          : 'bg-red-900/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {multiplier.toFixed(1)}x
                    </div>
                  ))}
                </div>
              </div>

              {/* Betting Controls */}
              {!isGameActive && (
                <div className="space-y-4">
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
                      disabled={!isConnected}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-2">
                      Auto Cashout at
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="number"
                        step="0.1"
                        min="1.1"
                        max="10"
                        value={cashoutMultiplier}
                        onChange={(e) => setCashoutMultiplier(e.target.value)}
                        className="input-field flex-1"
                        disabled={isGameActive}
                      />
                      <button
                        onClick={() => setAutoCashoutEnabled(!autoCashoutEnabled)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          autoCashoutEnabled
                            ? 'bg-green-600 text-white'
                            : 'bg-stone-700 text-amber-200 hover:bg-stone-600'
                        }`}
                      >
                        {autoCashoutEnabled ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 flex items-center space-x-2">
                      <AlertCircle size={16} className="text-red-400" />
                      <span className="text-red-400 text-sm">{error}</span>
                    </div>
                  )}

                  {/* Start Button */}
                  <button
                    onClick={startGame}
                    disabled={isLoading || !isConnected}
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    <Rocket size={20} />
                    <span>
                      {isLoading ? 'Starting...' : 'Launch Rocket'}
                    </span>
                  </button>
                </div>
              )}

              {/* Game Controls */}
              {isGameActive && (
                <div className="flex space-x-4">
                  <button
                    onClick={cashout}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    <Zap size={20} />
                    <span>
                      {isLoading ? 'Cashing Out...' : 'Cash Out'}
                    </span>
                  </button>
                  <button
                    onClick={resetGame}
                    className="bg-stone-700 hover:bg-stone-600 text-amber-200 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-amber-100 mb-4">How to Play</h3>
              <div className="space-y-3 text-sm text-amber-300">
                <p>• Place your bet and launch the rocket</p>
                <p>• The multiplier increases over time</p>
                <p>• Cash out before the rocket crashes to win</p>
                <p>• Higher multipliers = bigger rewards</p>
                <p>• Use auto cashout for hands-free play</p>
              </div>
            </div>

            {/* Statistics */}
            <div className="card">
              <h3 className="text-lg font-semibold text-amber-100 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-amber-300 text-sm">House Edge</span>
                  <span className="text-amber-100 font-medium">1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300 text-sm">Max Multiplier</span>
                  <span className="text-amber-100 font-medium">1000x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300 text-sm">Min Bet</span>
                  <span className="text-amber-100 font-medium">0.01 APT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300 text-sm">Max Bet</span>
                  <span className="text-amber-100 font-medium">100 APT</span>
                </div>
              </div>
            </div>

            {/* Recent Winners */}
            <div className="card">
              <h3 className="text-lg font-semibold text-amber-100 mb-4">Recent Winners</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-300">Player123</span>
                  <span className="text-green-400 font-medium">5.2x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-300">CryptoKing</span>
                  <span className="text-green-400 font-medium">12.8x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-300">AptosGamer</span>
                  <span className="text-green-400 font-medium">3.1x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketCrashPage; 