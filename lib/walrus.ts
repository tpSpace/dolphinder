import { WALRUS_PUBLISHER_URL, WALRUS_AGGREGATOR_URL } from './constants';

export interface WalrusUploadResponse {
  newlyCreated?: {
    blobObject: {
      id: string;
      storedEpoch: number;
      blobId: string;
      size: number;
      erasureCodeType: string;
      certifiedEpoch: number;
      storage: {
        id: string;
        startEpoch: number;
        endEpoch: number;
        storageSize: number;
      };
    };
    encodedSize: number;
    cost: number;
  };
  alreadyCertified?: {
    blobId: string;
    event: any;
    endEpoch: number;
  };
}

/**
 * Upload a file to Walrus
 * @param file - The file to upload
 * @param epochs - Number of epochs to store (default 1)
 * @returns Walrus blob ID and URL
 */
export async function uploadToWalrus(
  file: File,
  epochs: number = 1
): Promise<{ blobId: string; url: string }> {
  try {
    const response = await fetch(`${WALRUS_PUBLISHER_URL}/v1/store?epochs=${epochs}`, {
      method: 'PUT',
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data: WalrusUploadResponse = await response.json();

    let blobId: string;
    if (data.newlyCreated) {
      blobId = data.newlyCreated.blobObject.blobId;
    } else if (data.alreadyCertified) {
      blobId = data.alreadyCertified.blobId;
    } else {
      throw new Error('Invalid response from Walrus');
    }

    const url = getWalrusUrl(blobId);
    return { blobId, url };
  } catch (error) {
    console.error('Error uploading to Walrus:', error);
    throw error;
  }
}

/**
 * Get the URL for a Walrus blob
 * @param blobId - The Walrus blob ID
 * @returns Full URL to access the blob
 */
export function getWalrusUrl(blobId: string): string {
  return `${WALRUS_AGGREGATOR_URL}/v1/${blobId}`;
}

/**
 * Upload an image and get the URL
 * @param file - Image file to upload
 * @returns URL to the uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  // Validate file is an image
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Optionally compress/resize image here before uploading
  const { url } = await uploadToWalrus(file, 5); // Store for 5 epochs
  return url;
}

/**
 * Upload multiple images
 * @param files - Array of image files
 * @returns Array of URLs
 */
export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file));
  return Promise.all(uploadPromises);
}

/**
 * Download a blob from Walrus
 * @param blobId - The Walrus blob ID
 * @returns Blob data
 */
export async function downloadFromWalrus(blobId: string): Promise<Blob> {
  try {
    const response = await fetch(getWalrusUrl(blobId));
    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    console.error('Error downloading from Walrus:', error);
    throw error;
  }
}

