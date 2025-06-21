// screens/HeavenWallet.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { ethers } from 'ethers';

// Replace with your deployed contract address on Polygon Mumbai/Scroll/Base
const CONTRACT_ADDRESS = '0xYourHeavenCoinContractAddress';

// Minimal ABI for balanceOf, transfer, mint
const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function mint(address to, uint256 amount)",
  "function decimals() view returns (uint8)"
];

export default function HeavenWallet() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [decimals, setDecimals] = useState(18);

  // For demo: hardcoded admin address — replace with your admin's address
  const ADMIN_ADDRESS = '0xAdminAddressHere';

  useEffect(() => {
    async function init() {
      try {
        // MetaMask Mobile / WalletConnect provider injection expected here
        if (typeof window.ethereum !== 'undefined') {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const signer = web3Provider.getSigner();
          const userAddress = await signer.getAddress();

          const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
          const decimals = await contract.decimals();

          setProvider(web3Provider);
          setSigner(signer);
          setContract(contract);
          setAddress(userAddress);
          setDecimals(decimals);

          loadBalance(contract, userAddress, decimals);
        } else {
          Alert.alert('Error', 'No Ethereum provider found. Please use MetaMask or WalletConnect.');
        }
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    }
    init();
  }, []);

  async function loadBalance(contract, userAddress, decimals) {
    try {
      const bal = await contract.balanceOf(userAddress);
      const formatted = ethers.utils.formatUnits(bal, decimals);
      setBalance(formatted);
    } catch (err) {
      Alert.alert('Error loading balance', err.message);
    }
  }

  async function sendTokens() {
    if (!ethers.utils.isAddress(recipient)) {
      Alert.alert('Invalid recipient address');
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Invalid amount');
      return;
    }

    try {
      const tx = await contract.transfer(
        recipient,
        ethers.utils.parseUnits(amount, decimals)
      );
      await tx.wait();
      Alert.alert('Success', 'Tokens sent!');
      loadBalance(contract, address, decimals);
    } catch (err) {
      Alert.alert('Transaction failed', err.message);
    }
  }

  async function mintTokens() {
    if (address.toLowerCase() !== ADMIN_ADDRESS.toLowerCase()) {
      Alert.alert('Unauthorized', 'Only admin can mint tokens.');
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Invalid amount');
      return;
    }

    try {
      const tx = await contract.mint(
        address,
        ethers.utils.parseUnits(amount, decimals)
      );
      await tx.wait();
      Alert.alert('Mint successful');
      loadBalance(contract, address, decimals);
    } catch (err) {
      Alert.alert('Mint failed', err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HeavenWallet</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.text}>{address}</Text>

      <Text style={styles.label}>Balance:</Text>
      <Text style={styles.text}>{balance} HVN</Text>

      <Text style={styles.label}>Recipient Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="0xRecipientAddress"
        value={recipient}
        onChangeText={setRecipient}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Button title="Send Tokens" onPress={sendTokens} />

      {/* Mint button visible only for admin */}
      {address.toLowerCase() === ADMIN_ADDRESS.toLowerCase() && (
        <>
          <View style={{ marginTop: 20 }} />
          <Button title="Mint Tokens (Admin)" onPress={mintTokens} color="green" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#0ff',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    color: '#aaa',
    marginTop: 15,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#222',
    color: '#0ff',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
