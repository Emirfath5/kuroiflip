import React, { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';
import { AuthProvider, useAuth } from './components/Auth';
import Header from './components/Header';
import CreateGame from './components/CreateGame';
import GameCard from './components/GameCard';
import NFTBanner from './components/NFTBanner';
import NFTInfoCard from './components/NFTInfoCard';
import RocketCrashPage from './pages/RocketCrashPage';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const client = new AptosClient("https://api.mainnet.aptoslabs.com/v1");

interface Game {
  bet_amount?: string;
  coin_store: { value: string };
  game_id: string;
  joinee: { vec: [] };
  owner: string;
  owner_choice: boolean;
  result: { vec: Array<string> };
  room_creation_time: string;
  winner: { vec: [] };
}

interface GameStore {
  games?: Array<Game>;
}

const publishedAddress = "0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c";

const AppContent: React.FC = () => {
  const { address, isConnected, signAndSubmitTransaction } = useAuth();
  const [games, setGames] = useState<GameStore>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchGames = async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const resource = await client.getAccountResource(
        publishedAddress,
        `${publishedAddress}::Flip::GameStore`
      );
      
      const data: GameStore = resource.data;
      if (data?.games !== undefined) {
        setGames(data);
      }
    } catch (err) {
      console.error('Failed to fetch games:', err);
      setError('Failed to load games. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGames();
    
    // Set up polling for game updates
    const interval = setInterval(fetchGames, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const createGame = async (betAmount: number, choice: boolean) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setIsLoading(true);
    setError(null);

    try {
      const roomId = Math.floor(Math.random() * 100000) + 1;
      
      // Convert bet amount to octas (1 APT = 100,000,000 octas)
      // This ensures we're passing an integer value to the blockchain
      const betAmountInOctas = Math.floor(betAmount * 100000000);
      
      const transaction = {
        type: "entry_function_payload",
        function: `${publishedAddress}::Flip::create_room`,
        arguments: [roomId, betAmountInOctas, choice],
        type_arguments: [],
      };

      await signAndSubmitTransaction(transaction);
      await fetchGames();
    } catch (err) {
      console.error('Failed to create game:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to create game');
    } finally {
      setIsLoading(false);
    }
  };

  const playGame = async (gameId: string) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setIsLoading(true);
    setError(null);

    try {
      const transaction = {
        type: "entry_function_payload",
        function: `${publishedAddress}::Flip::join_room`,
        arguments: [parseInt(gameId)],
        type_arguments: [],
      };

      await signAndSubmitTransaction(transaction);
      await fetchGames();
    } catch (err) {
      console.error('Failed to join game:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to join game');
    } finally {
      setIsLoading(false);
    }
  };

  const claimRewards = async (gameId: string) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setIsLoading(true);
    setError(null);

    try {
      const transaction = {
        type: "entry_function_payload",
        function: `${publishedAddress}::Flip::claim_rewards`,
        arguments: [parseInt(gameId)],
        type_arguments: [],
      };

      await signAndSubmitTransaction(transaction);
      await fetchGames();
    } catch (err) {
      console.error('Failed to claim rewards:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to claim rewards');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900">
      <Header />
      <NFTBanner />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Game Section */}
          <div className="lg:col-span-1">
            <CreateGame
              onCreateGame={createGame}
              isLoading={isLoading}
              isConnected={isConnected}
            />
          </div>

          {/* Available Games Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-amber-100">Available Games</h2>
                <p className="text-amber-200 text-sm">Choose your game</p>
              </div>
            </div>

            {/* Game Cards */}
            <div className="space-y-4">
              {/* Coinflip Game */}
              <div className="card hover:bg-stone-800 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center border border-amber-200/30">
                      <span className="text-amber-800 font-bold text-lg">🪙</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-100">Coinflip</h3>
                      <p className="text-amber-300 text-sm">Classic heads or tails</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-100 font-medium">{games?.games?.length || 0} active</div>
                    <div className="text-amber-300 text-xs">Available now</div>
                  </div>
                </div>
              </div>

              {/* Rocket Crash Game */}
              <div className="card relative">
                {/* Coming Soon Badge */}
                <div className="absolute top-3 right-3 bg-amber-900/80 border border-amber-500/50 rounded-full px-3 py-1 z-10">
                  <span className="text-amber-200 text-xs font-medium">COMING SOON</span>
                </div>
                <div className="flex items-center justify-between opacity-60">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center border border-amber-200/30">
                      <span className="text-amber-800 font-bold text-lg">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-100">Rocket Crash</h3>
                      <p className="text-amber-300 text-sm">Cash out before it crashes!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-300 text-xs">Smart contract in development</div>
                  </div>
                </div>
              </div>
            </div>

            {/* NFT Info Card */}
            <div className="mt-6">
              <NFTInfoCard />
            </div>
          </div>

          {/* Active Coinflip Games */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-amber-100">Active Coinflip Games</h2>
                <p className="text-amber-200 text-sm">
                  {games?.games?.length || 0} games available
                </p>
              </div>
              
              <button
                onClick={fetchGames}
                disabled={isRefreshing}
                className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-amber-200 hover:text-amber-100 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center space-x-2">
                <AlertCircle size={16} className="text-red-400" />
                <span className="text-red-400">{error}</span>
              </div>
            )}

            {/* Games Grid */}
            {games?.games && games.games.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.games.map((game) => (
                  <GameCard
                    key={game.game_id}
                    game={game}
                    onPlay={playGame}
                    onClaim={claimRewards}
                    isLoading={isLoading}
                    userAddress={address}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw size={24} className="text-amber-300" />
                </div>
                <h3 className="text-lg font-medium text-amber-200 mb-2">No games available</h3>
                <p className="text-amber-300 text-sm">
                  Create a new game to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/rocket-crash" element={<RocketCrashPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
