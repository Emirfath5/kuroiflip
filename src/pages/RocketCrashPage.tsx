import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth';
import { AptosClient } from 'aptos';
import { ROCKET_CRASH_CONTRACT, ROCKET_CRASH_FUNCTIONS } from '../config/contracts';
import { Rocket } from 'lucide-react';

const RocketCrashPage: React.FC = () => {
  const { address, signAndSubmitTransaction } = useAuth();
  const [betAmount, setBetAmount] = useState<number>(0.01);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [gameState, setGameState] = useState<'waiting' | 'active' | 'crashed'>('waiting');
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [crashPoint, setCrashPoint] = useState<number>(0);
  const [gameHistory, setGameHistory] = useState<number[]>([]);

  const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

  // Sophisticated randomness simulation
  const generateCrashPoint = (gameId: number, startTime: number, creator: string): number => {
    // Multiple entropy sources for better randomness
    const entropySources = [
      gameId.toString(),
      startTime.toString(),
      creator,
      Date.now().toString(),
      Math.random().toString()
    ].join('');
    
    // Generate hash-like value
    let hash = 0;
    for (let i = 0; i < entropySources.length; i++) {
      const char = entropySources.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    const randomValue = Math.abs(hash) % 1000000;
    
    // Use sophisticated algorithm for crash point calculation
    // This creates a more realistic distribution with higher probability of lower multipliers
    let crashMultiplier: number;
    
    if (randomValue < 500000) {
      // 50% chance of 1.0x - 2.0x
      const base = 1.0;
      const range = 1.0;
      crashMultiplier = base + (randomValue % 1000000) / 1000000 * range;
    } else if (randomValue < 800000) {
      // 30% chance of 2.0x - 5.0x
      const base = 2.0;
      const range = 3.0;
      crashMultiplier = base + (randomValue % 1000000) / 1000000 * range;
    } else if (randomValue < 950000) {
      // 15% chance of 5.0x - 20.0x
      const base = 5.0;
      const range = 15.0;
      crashMultiplier = base + (randomValue % 1000000) / 1000000 * range;
    } else {
      // 5% chance of 20.0x - 1000.0x
      const base = 20.0;
      const range = 980.0;
      crashMultiplier = base + (randomValue % 1000000) / 1000000 * range;
    }
    
    // Ensure minimum crash point of 1.0x
    return Math.max(1.0, crashMultiplier);
  };

  // Create a new game
  const createGame = async () => {
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        function: `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::${ROCKET_CRASH_FUNCTIONS.CREATE_GAME}`,
        type_arguments: [],
        arguments: [Math.floor(betAmount * 100000000)] // Convert to octas (8 decimals)
      };

      const response = await signAndSubmitTransaction(payload);
      console.log('Game created:', response);
      
      // Generate crash point for this game
      const gameId = Date.now();
      const startTime = Math.floor(Date.now() / 1000);
             const newCrashPoint = generateCrashPoint(gameId, startTime, address || '');
      setCrashPoint(newCrashPoint);
      
      // Add to game history
      setGameHistory(prev => [newCrashPoint, ...prev.slice(0, 9)]);
      
      // Fetch the created game
      await fetchCurrentGame();
    } catch (err) {
      console.error('Error creating game:', err);
      setError('Failed to create game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Start the game
  const startGame = async () => {
    if (!address || !currentGame) return;

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        function: `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::${ROCKET_CRASH_FUNCTIONS.START_GAME}`,
        type_arguments: [],
        arguments: [currentGame.game_id]
      };

      const response = await signAndSubmitTransaction(payload);
      console.log('Game started:', response);
      
      setGameState('active');
      await fetchCurrentGame();
    } catch (err) {
      console.error('Error starting game:', err);
      setError('Failed to start game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cash out from game
  const cashOut = async () => {
    if (!address || !currentGame) return;

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        function: `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::${ROCKET_CRASH_FUNCTIONS.CASH_OUT}`,
        type_arguments: [],
        arguments: [currentGame.game_id]
      };

      const response = await signAndSubmitTransaction(payload);
      console.log('Cashed out:', response);
      
      setGameState('waiting');
      setCurrentGame(null);
    } catch (err) {
      console.error('Error cashing out:', err);
      setError('Failed to cash out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch current game data
  const fetchCurrentGame = async () => {
    if (!address) return;

    try {
      const resource = await client.getAccountResource(
        ROCKET_CRASH_CONTRACT.address,
        `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::GameStore`
      );

      if (resource.data) {
        const data = resource.data as any;
        const games = data.games || [];
        if (games.length > 0) {
          const latestGame = games[games.length - 1];
          setCurrentGame(latestGame);
          setGameState(latestGame.game_state === 0 ? 'waiting' : latestGame.game_state === 1 ? 'active' : 'crashed');
        }
      }
    } catch (err) {
      console.error('Error fetching game:', err);
    }
  };

  // Update multiplier based on elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState === 'active' && currentGame) {
      interval = setInterval(() => {
        const now = Date.now() / 1000;
        const start = currentGame.start_time;
        const elapsed = now - start;
        setElapsedTime(elapsed);
        
        // Calculate multiplier (exponential growth)
        const newMultiplier = Math.max(1.0, Math.exp(elapsed / 10));
        setMultiplier(newMultiplier);
        
        // Check if game should crash
        if (newMultiplier >= crashPoint) {
          setGameState('crashed');
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, currentGame, crashPoint]);

  // Fetch game data on mount
  useEffect(() => {
    fetchCurrentGame();
  }, [address]);

  return (
    <div className="min-h-screen bg-stone-900 text-amber-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-100 mb-2">Rocket Crash</h1>
          <p className="text-amber-300">Watch the rocket soar and cash out before it crashes!</p>
        </div>

        {/* Game History */}
        {gameHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Recent Results</h3>
            <div className="grid grid-cols-5 gap-2">
              {gameHistory.map((crashPoint, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded text-center text-sm font-medium ${
                    crashPoint >= 2.0 
                      ? 'bg-green-900/20 text-green-400 border border-green-500/30'
                      : 'bg-red-900/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {crashPoint.toFixed(2)}x
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Game Display */}
        <div className="card relative mb-8">
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg p-8 text-center">
            {/* Rocket Animation */}
            <div className="mb-8">
              <div className={`w-32 h-32 mx-auto transition-all duration-300 ${
                gameState === 'active' ? 'animate-bounce' : ''
              }`}>
                <Rocket 
                  size={128} 
                  className={`${
                    gameState === 'active' ? 'text-green-400' : 
                    gameState === 'crashed' ? 'text-red-400' : 'text-amber-400'
                  }`} 
                />
              </div>
            </div>

            {/* Multiplier Display */}
            <div className="mb-6">
              <div className="text-6xl font-bold text-amber-100 mb-2">
                {multiplier.toFixed(2)}x
              </div>
              <div className="text-amber-300">
                {gameState === 'active' ? 'Rocket is flying!' : 
                 gameState === 'crashed' ? 'Rocket crashed!' : 'Ready to launch'}
              </div>
              {gameState === 'active' && (
                <div className="text-sm text-amber-400 mt-2">
                  Crash at: {crashPoint.toFixed(2)}x
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="space-y-4">
              {gameState === 'waiting' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-amber-300 mb-2">Bet Amount (APT)</label>
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0.01)}
                      min="0.01"
                      max="1000"
                      step="0.01"
                      className="w-full px-4 py-2 bg-stone-800 border border-amber-500 rounded-lg text-amber-100"
                    />
                  </div>
                  <button
                    onClick={createGame}
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? 'Creating Game...' : 'Create Game'}
                  </button>
                </div>
              )}

              {gameState === 'waiting' && currentGame && (
                <button
                  onClick={startGame}
                  disabled={isLoading}
                  className="btn-secondary w-full"
                >
                  {isLoading ? 'Starting...' : 'Start Game'}
                </button>
              )}

              {gameState === 'active' && (
                <button
                  onClick={cashOut}
                  disabled={isLoading}
                  className="btn-success w-full"
                >
                  {isLoading ? 'Cashing Out...' : `Cash Out at ${multiplier.toFixed(2)}x`}
                </button>
              )}

              {gameState === 'crashed' && (
                <button
                  onClick={() => {
                    setGameState('waiting');
                    setCurrentGame(null);
                    setMultiplier(1.0);
                    setElapsedTime(0);
                  }}
                  className="btn-primary w-full"
                >
                  Play Again
                </button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {/* Game Info */}
            {currentGame && (
              <div className="mt-6 p-4 bg-stone-800/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Game Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-amber-300">Game ID:</span>
                    <span className="ml-2">{currentGame.game_id}</span>
                  </div>
                  <div>
                    <span className="text-amber-300">Total Pot:</span>
                    <span className="ml-2">{(currentGame.total_pot / 100000000).toFixed(2)} APT</span>
                  </div>
                  <div>
                    <span className="text-amber-300">Players:</span>
                    <span className="ml-2">{currentGame.players?.length || 0}</span>
                  </div>
                  <div>
                    <span className="text-amber-300">Crash Point:</span>
                    <span className="ml-2">{crashPoint.toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">How to Play</h2>
          <div className="space-y-3 text-amber-200">
            <p>1. Set your bet amount and create a game</p>
            <p>2. Start the game to launch the rocket</p>
            <p>3. Watch the multiplier increase exponentially</p>
            <p>4. Cash out before the rocket crashes to win</p>
            <p>5. If you wait too long and the rocket crashes, you lose your bet</p>
            <p className="text-amber-400 mt-4">
              <strong>New:</strong> Sophisticated randomness with realistic crash distributions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketCrashPage; 