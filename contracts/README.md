# Kuroi Rocket Crash Smart Contracts

This directory contains the smart contracts for the Kuroi Rocket Crash game, available in both **Aptos Move** and **Solidity** versions.

## 📁 Contract Structure

```
contracts/
├── RocketCrash.move          # Aptos Move contract
├── RocketCrash.sol           # Solidity contract (Ethereum/Polygon)
├── hardhat.config.js         # Hardhat configuration
├── scripts/
│   └── deploy.js            # Deployment script
├── package.json              # Dependencies
└── README.md                # This file
```

## 🚀 Quick Start

### For Aptos Move Contract

1. **Install Aptos CLI**
   ```bash
   curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
   ```

2. **Deploy to Aptos**
   ```bash
   aptos init
   aptos move publish --named-addresses kuroi_flip=<your-address>
   ```

### For Solidity Contract (Ethereum/Polygon)

1. **Install Dependencies**
   ```bash
   cd contracts
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your private keys and RPC URLs
   ```

3. **Compile Contracts**
   ```bash
   npm run compile
   ```

4. **Deploy to Testnet**
   ```bash
   # Sepolia (Ethereum testnet)
   npm run deploy:sepolia
   
   # Mumbai (Polygon testnet)
   npm run deploy:mumbai
   ```

5. **Deploy to Mainnet**
   ```bash
   # Ethereum mainnet
   npm run deploy:mainnet
   
   # Polygon mainnet
   npm run deploy:polygon
   ```

## 🔧 Contract Features

### Core Functionality
- ✅ **Create Game**: Players can create new rocket crash games
- ✅ **Join Game**: Multiple players can join existing games
- ✅ **Start Game**: Game creator can start the rocket
- ✅ **Cash Out**: Players can cash out before the rocket crashes
- ✅ **Provably Fair**: Crash points generated using cryptographic methods
- ✅ **House Fee**: 1% house fee on all games
- ✅ **Player Stats**: Track player performance and statistics

### Game Mechanics
- **Min Bet**: 0.01 ETH/APT
- **Max Bet**: 1000 ETH/APT
- **Max Multiplier**: 1000x
- **House Edge**: 1%
- **Game States**: Waiting → Active → Crashed

### Provably Fair System
The crash point is generated using:
- Game ID
- Start time
- Block hash (Solidity) / SHA3-256 hash (Move)
- Deterministic but unpredictable

## 📊 Contract Functions

### Player Functions
- `createGame()` - Create a new rocket crash game
- `joinGame(uint256 gameId)` - Join an existing game
- `startGame(uint256 gameId)` - Start the game (creator only)
- `cashOut(uint256 gameId)` - Cash out before crash
- `endGame(uint256 gameId)` - End game when crash point reached

### View Functions
- `getGame(uint256 gameId)` - Get game details
- `getActiveGames()` - Get all active games
- `getGameStats()` - Get platform statistics
- `getPlayerStats(address player)` - Get player statistics

### Admin Functions
- `emergencyWithdraw()` - Emergency withdrawal (owner only)

## 🔒 Security Features

### Reentrancy Protection
- Uses OpenZeppelin's `ReentrancyGuard`
- Prevents reentrancy attacks on critical functions

### Access Control
- Owner-only functions for emergency operations
- Creator-only functions for game management

### Input Validation
- Bet amount validation (min/max limits)
- Game state validation
- Player permission checks

## 🌐 Network Support

### Aptos
- **Mainnet**: `https://api.mainnet.aptoslabs.com/v1`
- **Testnet**: `https://api.testnet.aptoslabs.com/v1`

### Ethereum
- **Mainnet**: Ethereum mainnet
- **Testnet**: Sepolia testnet

### Polygon
- **Mainnet**: Polygon mainnet
- **Testnet**: Mumbai testnet

## 📝 Environment Variables

Create a `.env` file in the contracts directory:

```env
# Private Key (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# RPC URLs
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key
POLYGON_RPC_URL=https://polygon-rpc.com
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your-project-id
MUMBAI_RPC_URL=https://polygon-mumbai.infura.io/v3/your-project-id

# API Keys
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Gas Reporting
REPORT_GAS=true
```

## 🧪 Testing

### Local Testing
```bash
# Start local Hardhat node
npm run node

# Deploy to local network
npm run deploy:local
```

### Testnet Testing
```bash
# Deploy to Sepolia
npm run deploy:sepolia

# Verify on Etherscan
npm run verify:sepolia
```

## 📈 Gas Optimization

The contracts are optimized for gas efficiency:
- ✅ Solidity optimizer enabled (200 runs)
- ✅ Efficient data structures
- ✅ Minimal storage operations
- ✅ Batch operations where possible

## 🔍 Verification

After deployment, verify your contract on block explorers:

### Ethereum/Polygon
```bash
# Sepolia
npm run verify:sepolia

# Mumbai
npm run verify:mumbai

# Mainnet
npm run verify:mainnet
```

### Aptos
- Use Aptos Explorer: https://explorer.aptoslabs.com/
- Enter your module address to verify

## 🚨 Emergency Procedures

### Emergency Withdrawal
```javascript
// Only contract owner can call
await rocketCrash.emergencyWithdraw();
```

### Pause Functionality
The contract includes emergency pause functionality for critical situations.

## 📞 Support

For issues or questions:
1. Check the contract documentation
2. Review the test files
3. Contact the development team

## 📄 License

MIT License - see LICENSE file for details.

---

**⚠️ Important**: Always test thoroughly on testnets before deploying to mainnet. Never deploy untested contracts with real funds. 