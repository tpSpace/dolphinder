import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCurrentAccount, useSignTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { getProfileByOwner, getProfileById, getProfileExperiences, getProfileEducation, getProfileCertificates } from '../sui';
import { PACKAGE_ID } from '../constants';
import { Post } from '../types';
import { executeSponsoredTransaction } from '../sponsor';
import {
  createProfileTx,
  updateProfileTx,
  updateSocialLinksTx,
  addExperienceTx,
  updateExperienceTx,
  removeExperienceTx,
  addEducationTx,
  updateEducationTx,
  removeEducationTx,
  addCertificateTx,
  updateCertificateTx,
  removeCertificateTx,
  addSkillTx,
  removeSkillTx,
  // Post functions (Phase 2)
  createPostTx,
  deletePostTx,
  likePostTx,
  unlikePostTx,
  addCommentTx,
} from '../contract';

// Helper to wrap signTransaction
async function signTransactionWrapper(
  signFn: any,
  tx: Transaction
): Promise<{ signature: string; transactionBlockBytes: string }> {
  const result = await signFn({ transaction: tx });
  return {
    signature: result.signature,
    transactionBlockBytes: result.transactionBlockBytes,
  };
}

// Query: Get profile by owner address
export function useProfile(address?: string) {
  return useQuery({
    queryKey: ['profile', address],
    queryFn: async () => {
      if (!address) return null;
      return await getProfileByOwner(address, PACKAGE_ID);
    },
    enabled: !!address,
  });
}

// Query: Get profile by ID
export function useProfileById(profileId?: string) {
  return useQuery({
    queryKey: ['profile', 'id', profileId],
    queryFn: async () => {
      if (!profileId) return null;
      return await getProfileById(profileId);
    },
    enabled: !!profileId,
  });
}

// Query: Get profile experiences
export function useProfileExperiences(profileId?: string, count?: number) {
  return useQuery({
    queryKey: ['profile', 'experiences', profileId],
    queryFn: async () => {
      if (!profileId || count === undefined) return [];
      return await getProfileExperiences(profileId, count);
    },
    enabled: !!profileId && count !== undefined,
  });
}

// Query: Get profile education
export function useProfileEducation(profileId?: string, count?: number) {
  return useQuery({
    queryKey: ['profile', 'education', profileId],
    queryFn: async () => {
      if (!profileId || count === undefined) return [];
      return await getProfileEducation(profileId, count);
    },
    enabled: !!profileId && count !== undefined,
  });
}

// Query: Get profile certificates
export function useProfileCertificates(profileId?: string, count?: number) {
  return useQuery({
    queryKey: ['profile', 'certificates', profileId],
    queryFn: async () => {
      if (!profileId || count === undefined) return [];
      return await getProfileCertificates(profileId, count);
    },
    enabled: !!profileId && count !== undefined,
  });
}

// Mutation: Create profile
export function useCreateProfile() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      name,
      bio,
      avatarUrl,
      bannerUrl,
    }: {
      name: string;
      bio: string;
      avatarUrl: string;
      bannerUrl: string;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = createProfileTx(name, bio, avatarUrl, bannerUrl);
      
      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      if (account) {
        queryClient.invalidateQueries({ queryKey: ['profile', account.address] });
      }
    },
  });
}

// Mutation: Update profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      profileId,
      name,
      bio,
      avatarUrl,
      bannerUrl,
    }: {
      profileId: string;
      name: string;
      bio: string;
      avatarUrl: string;
      bannerUrl: string;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = updateProfileTx(profileId, name, bio, avatarUrl, bannerUrl);
      
      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      if (account) {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
  });
}

// Mutation: Update social links
export function useUpdateSocialLinks() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      profileId,
      links,
    }: {
      profileId: string;
      links: string[];
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = updateSocialLinksTx(profileId, links);
      
      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      if (account) {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
  });
}

// Mutation: Add experience
export function useAddExperience() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      profileId,
      jobTitle,
      company,
      startDate,
      endDate,
      description,
      orderIndex,
    }: {
      profileId: string;
      jobTitle: string;
      company: string;
      startDate: string;
      endDate: string;
      description: string;
      orderIndex: number;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = addExperienceTx(
        profileId,
        jobTitle,
        company,
        startDate,
        endDate,
        description,
        orderIndex
      );
      
      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'experiences', variables.profileId] });
    },
  });
}

// Mutation: Update experience
export function useUpdateExperience() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      profileId,
      experienceId,
      jobTitle,
      company,
      startDate,
      endDate,
      description,
      orderIndex,
    }: {
      profileId: string;
      experienceId: number;
      jobTitle: string;
      company: string;
      startDate: string;
      endDate: string;
      description: string;
      orderIndex: number;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = updateExperienceTx(
        profileId,
        experienceId,
        jobTitle,
        company,
        startDate,
        endDate,
        description,
        orderIndex
      );
      
      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'experiences', variables.profileId] });
    },
  });
}

// Mutation: Remove experience
export function useRemoveExperience() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      profileId,
      experienceId,
    }: {
      profileId: string;
      experienceId: number;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = removeExperienceTx(profileId, experienceId);
      
      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'experiences', variables.profileId] });
    },
  });
}

// Similar mutations for Education
export function useAddEducation() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      profileId,
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      orderIndex,
    }: {
      profileId: string;
      school: string;
      degree: string;
      fieldOfStudy: string;
      startDate: string;
      endDate: string;
      orderIndex: number;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = addEducationTx(
        profileId,
        school,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        orderIndex
      );
      
      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'education', variables.profileId] });
    },
  });
}

// Similar pattern for Certificate and Skill mutations...
export function useAddCertificate() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      profileId,
      name,
      issuer,
      issueDate,
      certificateUrl,
      orderIndex,
    }: {
      profileId: string;
      name: string;
      issuer: string;
      issueDate: string;
      certificateUrl: string;
      orderIndex: number;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = addCertificateTx(
        profileId,
        name,
        issuer,
        issueDate,
        certificateUrl,
        orderIndex
      );
      
      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'certificates', variables.profileId] });
    },
  });
}

export function useAddSkill() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async ({
      profileId,
      skillName,
    }: {
      profileId: string;
      skillName: string;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = addSkillTx(profileId, skillName);

      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      if (account) {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
  });
}

// ==================== Post Hooks (Phase 2) ====================

// Query: Get all posts from registry
export function usePosts() {
  const client = useSuiClient();

  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      // Note: In a real implementation, we'd need an indexer or paginated query
      // For now, we'll implement a basic version that queries recent posts
      const registry = await client.getObject({
        id: '0xe8f02280c428f61e667f10d8493075e376841dbbb09cd6d2b8b12461a9cf2c56', // GLOBAL_REGISTRY_ID
        options: { showContent: true },
      });

      // This is a simplified implementation - in production we'd need proper indexing
      return [];
    },
  });
}

// Query: Get post by ID
export function usePost(postId?: string) {
  const client = useSuiClient();

  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (!postId) return null;

      const postObject = await client.getObject({
        id: postId,
        options: { showContent: true },
      });

      if (!postObject.data?.content) return null;

      // Parse post data similar to how profiles are parsed
      const fields = (postObject.data.content as any).fields;
      return {
        id: postId,
        author: fields.author,
        profileId: fields.profile_id,
        content: fields.content,
        imageUrls: fields.image_urls,
        likeCount: Number(fields.like_count),
        commentCount: Number(fields.comment_count),
        createdAt: fields.created_at,
        updatedAt: fields.updated_at,
      };
    },
    enabled: !!postId,
  });
}

// Mutation: Create post
export function useCreatePost() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const signTransaction = useSignTransaction();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      profileId,
      content,
      imageUrls,
    }: {
      profileId: string;
      content: string;
      imageUrls: string[];
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = createPostTx(profileId, content, imageUrls);

      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

// Mutation: Delete post
export function useDeletePost() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const signTransaction = useSignTransaction();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = deletePostTx(postId);

      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

// Mutation: Like post
export function useLikePost() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const signTransaction = useSignTransaction();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      profileId,
    }: {
      postId: string;
      profileId: string;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = likePostTx(postId, profileId);

      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
}

// Mutation: Unlike post
export function useUnlikePost() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const signTransaction = useSignTransaction();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      profileId,
    }: {
      postId: string;
      profileId: string;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = unlikePostTx(postId, profileId);

      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
}

// Mutation: Add comment
export function useAddComment() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const signTransaction = useSignTransaction();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      profileId,
      content,
    }: {
      postId: string;
      profileId: string;
      content: string;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const tx = addCommentTx(postId, profileId, content);

      return await executeSponsoredTransaction(
        tx,
        client,
        account.address,
        (t) => signTransactionWrapper(signTransaction, t)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
}

