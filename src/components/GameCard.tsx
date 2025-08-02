import React from 'react';
import { Play, Trophy, Clock, Coins } from 'lucide-react';

interface Game {
  bet_amount?: string;
  coin_store: { value: string };
  game_id: string;
  joinee: { vec: [] };
  owner: string;
  owner_choice: boolean;
  result: { vec: Array<string> };
  room_creation_time: string;
  winner: { vec: Array<string> };
}

interface GameCardProps {
  game: Game;
  onPlay: (gameId: string) => void;
  onClaim: (gameId: string) => void;
  isLoading: boolean;
  userAddress: string | null;
}

const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  onPlay, 
  onClaim, 
  isLoading, 
  userAddress 
}) => {
  const isOwner = userAddress === game.owner;
  const hasResult = game.result.vec.length > 0;
  const hasWinner = game.winner.vec.length > 0;
  const canClaim = hasWinner && (isOwner || game.winner.vec.includes(userAddress || ''));
  
  const formatTime = (timestamp: string) => {
    // Convert from microseconds to milliseconds if needed
    const timeInMs = parseInt(timestamp) > 1000000000000 ? parseInt(timestamp) : parseInt(timestamp) * 1000;
    const date = new Date(timeInMs);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getResultText = () => {
    if (!hasResult) return 'Pending';
    return game.result.vec[0] === "0" ? 'Tails' : 'Heads';
  };

  const getResultColor = () => {
    if (!hasResult) return 'text-amber-300';
    return game.result.vec[0] === "0" ? 'text-amber-300' : 'text-amber-400';
  };

  return (
    <div className="card hover:bg-stone-800 transition-colors duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-amber-100 mb-1">
            Game #{game.game_id}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-amber-300">
            <Clock size={14} />
            <span>{formatTime(game.room_creation_time)}</span>
          </div>
        </div>
        
                 <div className="flex items-center space-x-2">
           <Coins size={16} className="text-amber-500" />
           <span className="text-amber-500 font-medium">
             {game.bet_amount ? (parseInt(game.bet_amount) / 100000000).toFixed(2) : '0'} APT
           </span>
         </div>
      </div>

              <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-amber-300 text-sm">Owner Choice:</span>
            <span className={`font-medium ${game.owner_choice ? 'text-amber-400' : 'text-amber-300'}`}>
              {game.owner_choice ? 'Heads' : 'Tails'}
            </span>
          </div>

          {hasResult && (
            <div className="flex justify-between items-center">
              <span className="text-amber-300 text-sm">Result:</span>
              <span className={`font-medium ${getResultColor()}`}>
                {getResultText()}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-amber-300 text-sm">Players:</span>
            <span className="text-amber-100 font-medium">
              {game.joinee.vec.length + 1}
            </span>
          </div>

        {isOwner && (
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg px-3 py-2">
            <span className="text-amber-400 text-sm font-medium">You created this game</span>
          </div>
        )}
      </div>

      <div className="flex space-x-3">
        {!hasWinner ? (
          <button
            onClick={() => onPlay(game.game_id)}
            disabled={isLoading || isOwner}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={16} />
            <span>{isOwner ? 'Waiting...' : 'Join Game'}</span>
          </button>
        ) : canClaim ? (
          <button
            onClick={() => onClaim(game.game_id)}
            disabled={isLoading}
            className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-amber-200 hover:text-amber-100 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trophy size={16} />
            <span>Claim Reward</span>
          </button>
        ) : (
          <div className="flex-1 bg-stone-700 rounded-lg px-4 py-2 flex items-center justify-center">
            <span className="text-amber-300 text-sm">Game Finished</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard; 