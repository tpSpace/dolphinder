import { SuiClient, SuiObjectData } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { NETWORK } from './constants';

// Initialize Sui client
export const suiClient = new SuiClient({
  url: `https://fullnode.${NETWORK}.sui.io:443`,
});

// Get RPC URL
export function getRpcUrl() {
  return `https://fullnode.${NETWORK}.sui.io:443`;
}

// Helper to get owned objects
export async function getOwnedObjects(address: string, type?: string) {
  try {
    const objects = await suiClient.getOwnedObjects({
      owner: address,
      filter: type ? { StructType: type } : undefined,
      options: {
        showContent: true,
        showType: true,
        showOwner: true,
      },
    });
    return objects.data;
  } catch (error) {
    console.error('Error fetching owned objects:', error);
    return [];
  }
}

// Helper to get object details
export async function getObject(objectId: string) {
  try {
    const object = await suiClient.getObject({
      id: objectId,
      options: {
        showContent: true,
        showType: true,
        showOwner: true,
      },
    });
    return object.data;
  } catch (error) {
    console.error('Error fetching object:', error);
    return null;
  }
}

// Helper to parse profile data from object
export function parseProfileData(objectData: SuiObjectData | null) {
  if (!objectData || !objectData.content || objectData.content.dataType !== 'moveObject') {
    return null;
  }

  const fields = objectData.content.fields as any;
  return {
    id: objectData.objectId,
    owner: fields.owner,
    name: fields.name,
    bio: fields.bio,
    avatarUrl: fields.avatar_url,
    bannerUrl: fields.banner_url,
    socialLinks: fields.social_links || [],
    isVerified: fields.is_verified,
    createdAt: fields.created_at,
    experienceCount: parseInt(fields.experience_count),
    educationCount: parseInt(fields.education_count),
    certificateCount: parseInt(fields.certificate_count),
    skills: fields.skills || [],
  };
}

// Query profile by owner address
export async function getProfileByOwner(ownerAddress: string, packageId: string) {
  try {
    const objects = await getOwnedObjects(ownerAddress, `${packageId}::dolphinders::Profile`);
    if (objects.length === 0) {
      return null;
    }
    return parseProfileData(objects[0].data || null);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

// Get profile by object ID
export async function getProfileById(profileId: string) {
  try {
    const objectData = await getObject(profileId);
    return parseProfileData(objectData || null);
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    return null;
  }
}

// Query dynamic field (for experiences, education, certificates)
export async function getDynamicField(parentId: string, fieldName: string, fieldType: string) {
  try {
    const field = await suiClient.getDynamicFieldObject({
      parentId,
      name: {
        type: fieldType,
        value: fieldName,
      },
    });
    return field.data;
  } catch (error) {
    console.error('Error fetching dynamic field:', error);
    return null;
  }
}

// Get all experiences for a profile
export async function getProfileExperiences(profileId: string, count: number) {
  const experiences = [];
  for (let i = 0; i < count; i++) {
    try {
      const field = await getDynamicField(profileId, i.toString(), 'u64');
      if (field && field.content && field.content.dataType === 'moveObject') {
        const data = field.content.fields as any;
        experiences.push(data.value);
      }
    } catch (error) {
      console.error(`Error fetching experience ${i}:`, error);
    }
  }
  return experiences.sort((a, b) => (b.order_index || 0) - (a.order_index || 0));
}

// Get all education for a profile
export async function getProfileEducation(profileId: string, count: number) {
  const education = [];
  for (let i = 0; i < count; i++) {
    try {
      const field = await getDynamicField(profileId, i.toString(), 'u64');
      if (field && field.content && field.content.dataType === 'moveObject') {
        const data = field.content.fields as any;
        education.push(data.value);
      }
    } catch (error) {
      console.error(`Error fetching education ${i}:`, error);
    }
  }
  return education.sort((a, b) => (b.order_index || 0) - (a.order_index || 0));
}

// Get all certificates for a profile
export async function getProfileCertificates(profileId: string, count: number) {
  const certificates = [];
  for (let i = 0; i < count; i++) {
    try {
      const field = await getDynamicField(profileId, i.toString(), 'u64');
      if (field && field.content && field.content.dataType === 'moveObject') {
        const data = field.content.fields as any;
        certificates.push(data.value);
      }
    } catch (error) {
      console.error(`Error fetching certificate ${i}:`, error);
    }
  }
  return certificates.sort((a, b) => (b.order_index || 0) - (a.order_index || 0));
}

