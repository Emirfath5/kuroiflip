# KuroiFlip Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to http://localhost:3000

## What's New

### ✅ Modernized Features
- **Updated Dependencies**: All packages updated to latest stable versions
- **Modern UI**: Replaced Semantic UI with Tailwind CSS
- **Better UX**: Improved forms, buttons, and responsive design
- **Centralized Auth**: Proper wallet connection management
- **Error Handling**: Comprehensive error states and user feedback
- **TypeScript**: Full TypeScript support with proper types

### 🔧 Technical Improvements
- **React 18**: Latest React features and hooks
- **Aptos SDK v1.10**: Updated blockchain integration
- **Tailwind CSS**: Modern styling system
- **Lucide Icons**: Beautiful, consistent iconography
- **Component Architecture**: Modular, reusable components

### 🎮 Game Features
- **Real-time Updates**: Automatic game state polling
- **Better Game Cards**: Improved game information display
- **Wallet Integration**: Seamless Aptos wallet connection
- **Transaction Handling**: Proper error handling for blockchain operations

## Troubleshooting

### Common Issues

1. **Wallet Connection Fails**
   - Make sure you have an Aptos wallet installed (Petra, Martian, etc.)
   - Check that the wallet is unlocked and on mainnet

2. **Transaction Errors**
   - Ensure you have sufficient APT for gas fees
   - Check that you're connected to Aptos mainnet

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Make sure you're using Node.js 16+

### Development Tips

- Use the browser console to debug wallet connections
- Check the Network tab for API calls to Aptos
- The app polls for game updates every 10 seconds

## Next Steps

1. **Test the Application**: Create and join some test games
2. **Customize Styling**: Modify Tailwind classes in components
3. **Add Features**: Consider adding game history, user profiles, etc.
4. **Deploy**: Build and deploy to your preferred hosting platform

## Support

For issues or questions:
- Check the browser console for error messages
- Review the Aptos documentation for wallet integration
- Contact the development team 