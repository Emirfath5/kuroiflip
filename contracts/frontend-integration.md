# Frontend Integration Guide - Aptos Move Contract

## 🚀 Integration Steps

### 1. Update Environment Variables

Add your deployed contract address to your frontend:

```typescript
// src/config/contracts.ts
export const ROCKET_CRASH_CONTRACT = {
  address: "0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c",
  module: "rocket_crash",
  name: "RocketCrash"
};
```

### 2. Update Rocket Crash Page

Replace the mock implementation with real contract calls:

```typescript
// src/pages/RocketCrashPage.tsx
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient, Types } from 'aptos';

const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

export const RocketCrashPage = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [currentGame, setCurrentGame] = useState(null);
  const [gameState, setGameState] = useState('waiting');

  // Create new game
  const createGame = async (betAmount: number) => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::create_game`,
      type_arguments: [],
      arguments: [betAmount * 100000000] // Convert to octas
    };

    const response = await signAndSubmitTransaction({
      payload,
      options: {
        max_gas_amount: "100000",
        gas_unit_price: "100"
      }
    });
    
    await client.waitForTransaction(response.hash);
    return response;
  };

  // Join existing game
  const joinGame = async (gameId: number, betAmount: number) => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::join_game`,
      type_arguments: [],
      arguments: [gameId, betAmount * 100000000]
    };

    const response = await signAndSubmitTransaction({
      payload,
      options: {
        max_gas_amount: "100000",
        gas_unit_price: "100"
      }
    });
    
    await client.waitForTransaction(response.hash);
    return response;
  };

  // Start game
  const startGame = async (gameId: number) => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::start_game`,
      type_arguments: [],
      arguments: [gameId]
    };

    const response = await signAndSubmitTransaction({
      payload,
      options: {
        max_gas_amount: "100000",
        gas_unit_price: "100"
      }
    });
    
    await client.waitForTransaction(response.hash);
    return response;
  };

  // Cash out
  const cashOut = async (gameId: number) => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::cash_out`,
      type_arguments: [],
      arguments: [gameId]
    };

    const response = await signAndSubmitTransaction({
      payload,
      options: {
        max_gas_amount: "100000",
        gas_unit_price: "100"
      }
    });
    
    await client.waitForTransaction(response.hash);
    return response;
  };

  // Get game data
  const getGame = async (gameId: number) => {
    const resource = await client.getAccountResource(
      ROCKET_CRASH_CONTRACT.address,
      `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::GameStore`
    );
    
    // Parse game data from resource
    return resource.data;
  };

  // Get active games
  const getActiveGames = async () => {
    const resource = await client.getAccountResource(
      ROCKET_CRASH_CONTRACT.address,
      `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::GameStore`
    );
    
    // Parse active games from resource
    return resource.data.active_games;
  };

  // Get player stats
  const getPlayerStats = async (playerAddress: string) => {
    const resource = await client.getAccountResource(
      ROCKET_CRASH_CONTRACT.address,
      `${ROCKET_CRASH_CONTRACT.address}::${ROCKET_CRASH_CONTRACT.module}::GameStore`
    );
    
    // Parse player stats from resource
    return resource.data.player_stats[playerAddress];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card">
        {/* Game Interface */}
        <div className="game-controls">
          <button 
            onClick={() => createGame(0.01)}
            className="btn btn-primary"
          >
            Create Game (0.01 APT)
          </button>
          
          <button 
            onClick={() => startGame(currentGame?.game_id)}
            className="btn btn-secondary"
            disabled={!currentGame || gameState !== 'waiting'}
          >
            Start Game
          </button>
          
          <button 
            onClick={() => cashOut(currentGame?.game_id)}
            className="btn btn-success"
            disabled={gameState !== 'active'}
          >
            Cash Out
          </button>
        </div>

        {/* Game Display */}
        <div className="game-display">
          {currentGame && (
            <div>
              <h3>Game #{currentGame.game_id}</h3>
              <p>State: {gameState}</p>
              <p>Total Pot: {currentGame.total_pot / 100000000} APT</p>
              <p>Players: {currentGame.players.length}</p>
              {currentGame.crash_point > 0 && (
                <p>Crash Point: {currentGame.crash_point / 1000000}x</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
```

### 3. Add Real-time Updates

```typescript
// src/hooks/useGameUpdates.ts
import { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';

export const useGameUpdates = (gameId: number) => {
  const [gameData, setGameData] = useState(null);
  const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const game = await getGame(gameId);
        setGameData(game);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [gameId]);

  return gameData;
};
```

### 4. Update App.tsx

Remove the "Coming Soon" overlay and integrate real contract:

```typescript
// src/App.tsx
// Replace the Rocket Crash card with:
<Link to="/rocket-crash" className="block">
  <div className="card">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
        <Rocket size={24} className="text-amber-800" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-amber-100">Rocket Crash</h3>
        <p className="text-amber-300 text-sm">Live on Aptos</p>
      </div>
    </div>
  </div>
</Link>
```

### 5. Error Handling

```typescript
// src/utils/errorHandler.ts
export const handleAptosError = (error: any) => {
  if (error.error_code) {
    switch (error.error_code) {
      case 'ENOT_ENOUGH_BALANCE':
        return 'Insufficient balance';
      case 'EGAME_NOT_FOUND':
        return 'Game not found';
      case 'EGAME_ALREADY_STARTED':
        return 'Game already started';
      case 'EGAME_NOT_ACTIVE':
        return 'Game not active';
      case 'EPLAYER_NOT_IN_GAME':
        return 'Player not in game';
      case 'EPLAYER_ALREADY_CASHED_OUT':
        return 'Player already cashed out';
      case 'EBET_AMOUNT_TOO_LOW':
        return 'Bet amount too low (min 0.01 APT)';
      case 'EBET_AMOUNT_TOO_HIGH':
        return 'Bet amount too high (max 1000 APT)';
      default:
        return 'Transaction failed';
    }
  }
  return 'Transaction failed';
};
```

## 🔧 Deployment Checklist

- [ ] Deploy contract to Aptos mainnet
- [ ] Update contract address in frontend config
- [ ] Test all functions (create, join, start, cash out)
- [ ] Implement real-time updates
- [ ] Add error handling
- [ ] Test with real APT
- [ ] Remove "Coming Soon" overlays

## 📱 Mobile Considerations

- Ensure wallet connection works on mobile
- Test touch interactions
- Optimize for smaller screens
- Add loading states for transactions

## 🎨 UI/UX Updates

- Add transaction status indicators
- Show game countdown timers
- Display player statistics
- Add sound effects for game events
- Implement smooth animations

## 🧪 Testing

- Test with small amounts first
- Verify all game states work correctly
- Test edge cases (network issues, etc.)
- Ensure proper error messages

## 🔒 Security

- Validate all inputs
- Check transaction confirmations
- Implement proper error handling
- Test with multiple wallets 