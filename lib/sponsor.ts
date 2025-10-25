import { Transaction } from '@mysten/sui/transactions';
import { SuiClient } from '@mysten/sui/client';
import { SPONSOR_API_URL } from './constants';

export interface SponsoredTransactionResponse {
  digest: string;
  effects?: any;
}

/**
 * Execute a transaction with sponsored gas
 * @param tx - The transaction to execute
 * @param client - Sui client instance
 * @param userAddress - User's wallet address
 * @param signTransaction - Function to sign the transaction
 * @returns Transaction result
 */
export async function executeSponsoredTransaction(
  tx: Transaction,
  client: SuiClient,
  userAddress: string,
  signTransaction: (transaction: Transaction) => Promise<{ signature: string; transactionBlockBytes: string }>
): Promise<SponsoredTransactionResponse> {
  try {
    // Build the transaction
    tx.setSender(userAddress);
    const txBytes = await tx.build({ client });

    // Sign the transaction
    const { signature } = await signTransaction(tx);

    // Send to sponsor endpoint
    const response = await fetch(SPONSOR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        txBytes: Array.from(txBytes),
        userSignature: signature,
        network: 'testnet',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Sponsored transaction failed: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error executing sponsored transaction:', error);
    throw error;
  }
}

/**
 * Alternative: Execute transaction with zkLogin or other sponsorship method
 * This is a placeholder for future implementation
 */
export async function executeWithZkLogin(
  tx: Transaction,
  client: SuiClient
): Promise<SponsoredTransactionResponse> {
  // TODO: Implement zkLogin sponsored transaction
  throw new Error('zkLogin not yet implemented');
}

/**
 * Check if sponsorship is available
 */
export async function checkSponsorshipAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${SPONSOR_API_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Error checking sponsorship availability:', error);
    return false;
  }
}

