# KuroiFlip - NFT Coinflip Game

A modern, decentralized coinflip game built on Aptos blockchain. Players can create and join coinflip games with APT tokens.

## Features

- 🎮 **Decentralized Gaming**: Built on Aptos blockchain for transparency and fairness
- 💰 **Real Money Gaming**: Bet and win APT tokens
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔐 **Secure Wallet Integration**: Connect with any Aptos wallet (Petra, Martian, etc.)
- ⚡ **Real-time Updates**: Automatic game state updates
- 📱 **Mobile Responsive**: Works on all devices
- 👑 **NFT Holder Benefits**: Exclusive dividends and reduced fees for KUROI NFT holders
- 🚀 **Multiple Games**: Coinflip and Rocket Crash games available
- 🎯 **Dedicated Game Pages**: Full-screen gaming experience for each game type

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Lucide React Icons
- **Blockchain**: Aptos SDK v1.10.0
- **Wallet**: Aptos Wallet Standard

## Prerequisites

- Node.js 16+ 
- npm or yarn
- An Aptos wallet (Petra, Martian, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kuroiflip-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Play

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection
2. **Create Game**: Set your bet amount and choose Heads or Tails
3. **Join Games**: Browse available games and join with the same bet amount
4. **Wait for Result**: The coinflip result determines the winner
5. **Claim Rewards**: Winners can claim their APT tokens

## Smart Contract

The game uses a Move smart contract deployed on Aptos mainnet:
- **Contract Address**: `0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c`
- **Module**: `Flip`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
├── components/          # React components
│   ├── Auth.tsx        # Authentication context
│   ├── Header.tsx      # Navigation header
│   ├── CreateGame.tsx  # Game creation form
│   └── GameCard.tsx    # Individual game display
├── App.tsx             # Main application
└── index.tsx           # Entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Links

- **Twitter**: [@KuroiNFTs](https://twitter.com/KuroiNFTs)
- **TradePort Collection**: [Kuroi Collection](https://www.tradeport.xyz/aptos/collection/aptos-kuroi-f0b9fb78?bottomTab=trades&tab=items)
- **Wapal Collection**: [Kuroi NFTs](https://wapal.io/collection/Kuroi-0x79901c2e5752018de789bba229facd4ddfbff65c4a74ee4dc7b3dbc68d2585db)
- **Aptos**: [aptos.dev](https://aptos.dev)
