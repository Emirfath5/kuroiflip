import React, { createContext, useContext, useEffect, useState } from 'react';
import { AptosClient } from 'aptos';

const client = new AptosClient("https://api.mainnet.aptoslabs.com/v1");

interface AuthContextType {
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  signAndSubmitTransaction: (transaction: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if wallet is available
      if (!window.aptos) {
        throw new Error('No Aptos wallet found. Please install Petra or another Aptos wallet.');
      }

      // Check if already connected
      const isConnected = await window.aptos.isConnected();
      if (isConnected) {
        const account = await window.aptos.account();
        setAddress(account.address);
        setIsConnected(true);
        return;
      }

      // Connect to wallet
      const result = await window.aptos.connect();
      setAddress(result.address);
      setIsConnected(true);
      
      // Store connection state
      localStorage.setItem('kuroiflip_connected', 'true');
      localStorage.setItem('kuroiflip_address', result.address);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      setIsConnected(false);
      setAddress(null);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setError(null);
    localStorage.removeItem('kuroiflip_connected');
    localStorage.removeItem('kuroiflip_address');
  };

  const signAndSubmitTransaction = async (transaction: any) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await window.aptos.signAndSubmitTransaction(transaction);
      await client.waitForTransaction(result.hash);
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Transaction failed');
    }
  };

  // Auto-connect on mount
  useEffect(() => {
    const wasConnected = localStorage.getItem('kuroiflip_connected');
    const savedAddress = localStorage.getItem('kuroiflip_address');
    
    if (wasConnected && savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
    }
  }, []);

  const value: AuthContextType = {
    address,
    isConnected,
    isLoading,
    error,
    connect,
    disconnect,
    signAndSubmitTransaction,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 