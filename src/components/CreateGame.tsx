import React, { useState } from 'react';
import { Plus, Coins, AlertCircle } from 'lucide-react';

interface CreateGameProps {
  onCreateGame: (betAmount: number, choice: boolean) => Promise<void>;
  isLoading: boolean;
  isConnected: boolean;
}

const CreateGame: React.FC<CreateGameProps> = ({ onCreateGame, isLoading, isConnected }) => {
  const [betAmount, setBetAmount] = useState<string>('');
  const [choice, setChoice] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!betAmount || parseFloat(betAmount) <= 0) {
      setError('Please enter a valid bet amount');
      return;
    }

    // Validate minimum bet amount (0.01 APT)
    if (parseFloat(betAmount) < 0.01) {
      setError('Minimum bet amount is 0.01 APT');
      return;
    }

    try {
      await onCreateGame(parseFloat(betAmount), choice);
      setBetAmount('');
      setChoice(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game');
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center border border-amber-200/30">
          <Plus size={20} className="text-amber-800" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-amber-100">Create New Game</h2>
          <p className="text-amber-200 text-sm">Start a new coinflip game</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bet Amount */}
        <div>
          <label className="block text-sm font-medium text-amber-200 mb-2">
            Bet Amount (APT)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0.01"
              max="1000"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="0.01"
              className="input-field w-full pr-10"
              disabled={!isConnected}
            />
            <Coins size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
          </div>
        </div>

        {/* Choice Selection */}
        <div>
          <label className="block text-sm font-medium text-amber-200 mb-3">
            Your Choice
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setChoice(false)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                choice === false
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                  : 'border-stone-600 bg-stone-700 text-amber-200 hover:border-stone-500'
              }`}
              disabled={!isConnected}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🪙</div>
                <div className="font-medium">Tails</div>
                <div className="text-xs text-amber-300">Tails side</div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setChoice(true)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                choice === true
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                  : 'border-stone-600 bg-stone-700 text-amber-200 hover:border-stone-500'
              }`}
              disabled={!isConnected}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🪙</div>
                <div className="font-medium">Heads</div>
                <div className="text-xs text-amber-300">Heads side</div>
              </div>
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !isConnected}
          className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          <span>
            {isLoading ? 'Creating Game...' : 'Create Game'}
          </span>
        </button>

        {!isConnected && (
          <div className="text-center">
            <p className="text-amber-300 text-sm">
              Connect your wallet to create a game
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateGame; 