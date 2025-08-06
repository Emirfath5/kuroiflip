# Deploy Rocket Crash Contract via Aptos Playground

## 🚀 **Step-by-Step Deployment Guide**

### **Step 1: Open Aptos Playground**
1. Go to: https://playground.aptoslabs.com/
2. Click "Create New Project"
3. Name it: `kuroi_rocket_crash`

### **Step 2: Create Move Module**
1. Click "Create Module"
2. Name: `rocket_crash`
3. Copy the entire Move contract code from `RocketCrash.move`

### **Step 3: Update Module Address**
Replace the module declaration with your address:
```move
module 0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c::rocket_crash {
    // ... rest of the contract code
}
```

### **Step 4: Compile**
1. Click "Compile" button
2. Fix any compilation errors
3. Ensure compilation succeeds

### **Step 5: Deploy**
1. Click "Deploy" button
2. Connect your wallet (Petra, Martian, etc.)
3. Confirm the transaction
4. Wait for deployment confirmation

### **Step 6: Get Contract Address**
After deployment, you'll get:
- **Contract Address**: `0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c`
- **Module Name**: `rocket_crash`
- **Full Path**: `0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c::rocket_crash`

## 🔧 **Alternative: Manual CLI Installation**

If you prefer CLI, try this PowerShell approach:

```powershell
# Download Rust installer
Invoke-WebRequest -Uri "https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe" -OutFile "rustup-init.exe"

# Run installer
.\rustup-init.exe -y

# Restart PowerShell, then:
cargo install aptos
```

## 📋 **Deployment Checklist**

- [ ] Contract compiles successfully
- [ ] Deployed to mainnet
- [ ] Contract address saved
- [ ] Test create_game function
- [ ] Test join_game function
- [ ] Test start_game function
- [ ] Test cash_out function
- [ ] Update frontend with contract address

## 🎯 **After Deployment**

Once deployed, update your frontend:

```typescript
// src/config/contracts.ts
export const ROCKET_CRASH_CONTRACT = {
  address: "0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c",
  module: "rocket_crash",
  name: "RocketCrash"
};
```

## 🔗 **View on Explorer**

After deployment, view your contract at:
https://explorer.aptoslabs.com/account/0x891bdbd410600de9973cda45e61154f48500c1f0eb37eb0c2ff8d58b65be816c 