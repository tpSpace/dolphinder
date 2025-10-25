import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, GLOBAL_REGISTRY_ID } from './constants';

/**
 * Contract interaction helpers for Dolphinder
 */

// ==================== Profile Transactions ====================

export function createProfileTx(
  name: string,
  bio: string,
  avatarUrl: string,
  bannerUrl: string
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::create_profile`,
    arguments: [
      tx.object(GLOBAL_REGISTRY_ID),
      tx.pure.string(name),
      tx.pure.string(bio),
      tx.pure.string(avatarUrl),
      tx.pure.string(bannerUrl),
    ],
  });

  return tx;
}

export function updateProfileTx(
  profileId: string,
  name: string,
  bio: string,
  avatarUrl: string,
  bannerUrl: string
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::update_profile`,
    arguments: [
      tx.object(profileId),
      tx.pure.string(name),
      tx.pure.string(bio),
      tx.pure.string(avatarUrl),
      tx.pure.string(bannerUrl),
    ],
  });

  return tx;
}

export function updateSocialLinksTx(profileId: string, links: string[]): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::update_social_links`,
    arguments: [tx.object(profileId), tx.pure.vector('string', links)],
  });

  return tx;
}

// ==================== Experience Transactions ====================

export function addExperienceTx(
  profileId: string,
  jobTitle: string,
  company: string,
  startDate: string,
  endDate: string,
  description: string,
  orderIndex: number
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::add_experience`,
    arguments: [
      tx.object(profileId),
      tx.pure.string(jobTitle),
      tx.pure.string(company),
      tx.pure.string(startDate),
      tx.pure.string(endDate),
      tx.pure.string(description),
      tx.pure.u64(orderIndex),
    ],
  });

  return tx;
}

export function updateExperienceTx(
  profileId: string,
  experienceId: number,
  jobTitle: string,
  company: string,
  startDate: string,
  endDate: string,
  description: string,
  orderIndex: number
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::update_experience`,
    arguments: [
      tx.object(profileId),
      tx.pure.u64(experienceId),
      tx.pure.string(jobTitle),
      tx.pure.string(company),
      tx.pure.string(startDate),
      tx.pure.string(endDate),
      tx.pure.string(description),
      tx.pure.u64(orderIndex),
    ],
  });

  return tx;
}

export function removeExperienceTx(profileId: string, experienceId: number): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::remove_experience`,
    arguments: [tx.object(profileId), tx.pure.u64(experienceId)],
  });

  return tx;
}

// ==================== Education Transactions ====================

export function addEducationTx(
  profileId: string,
  school: string,
  degree: string,
  fieldOfStudy: string,
  startDate: string,
  endDate: string,
  orderIndex: number
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::add_education`,
    arguments: [
      tx.object(profileId),
      tx.pure.string(school),
      tx.pure.string(degree),
      tx.pure.string(fieldOfStudy),
      tx.pure.string(startDate),
      tx.pure.string(endDate),
      tx.pure.u64(orderIndex),
    ],
  });

  return tx;
}

export function updateEducationTx(
  profileId: string,
  educationId: number,
  school: string,
  degree: string,
  fieldOfStudy: string,
  startDate: string,
  endDate: string,
  orderIndex: number
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::update_education`,
    arguments: [
      tx.object(profileId),
      tx.pure.u64(educationId),
      tx.pure.string(school),
      tx.pure.string(degree),
      tx.pure.string(fieldOfStudy),
      tx.pure.string(startDate),
      tx.pure.string(endDate),
      tx.pure.u64(orderIndex),
    ],
  });

  return tx;
}

export function removeEducationTx(profileId: string, educationId: number): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::remove_education`,
    arguments: [tx.object(profileId), tx.pure.u64(educationId)],
  });

  return tx;
}

// ==================== Certificate Transactions ====================

export function addCertificateTx(
  profileId: string,
  name: string,
  issuer: string,
  issueDate: string,
  certificateUrl: string,
  orderIndex: number
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::add_certificate`,
    arguments: [
      tx.object(profileId),
      tx.pure.string(name),
      tx.pure.string(issuer),
      tx.pure.string(issueDate),
      tx.pure.string(certificateUrl),
      tx.pure.u64(orderIndex),
    ],
  });

  return tx;
}

export function updateCertificateTx(
  profileId: string,
  certificateId: number,
  name: string,
  issuer: string,
  issueDate: string,
  certificateUrl: string,
  orderIndex: number
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::update_certificate`,
    arguments: [
      tx.object(profileId),
      tx.pure.u64(certificateId),
      tx.pure.string(name),
      tx.pure.string(issuer),
      tx.pure.string(issueDate),
      tx.pure.string(certificateUrl),
      tx.pure.u64(orderIndex),
    ],
  });

  return tx;
}

export function removeCertificateTx(profileId: string, certificateId: number): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::remove_certificate`,
    arguments: [tx.object(profileId), tx.pure.u64(certificateId)],
  });

  return tx;
}

// ==================== Skill Transactions ====================

export function addSkillTx(profileId: string, skillName: string): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::add_skill`,
    arguments: [tx.object(profileId), tx.pure.string(skillName)],
  });

  return tx;
}

export function removeSkillTx(profileId: string, skillIndex: number): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::remove_skill`,
    arguments: [tx.object(profileId), tx.pure.u64(skillIndex)],
  });

  return tx;
}

// ==================== Admin Transactions ====================

export function verifyProfileTx(adminCapId: string, profileId: string): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::verify_profile`,
    arguments: [tx.object(adminCapId), tx.object(profileId)],
  });

  return tx;
}

export function unverifyProfileTx(adminCapId: string, profileId: string): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::unverify_profile`,
    arguments: [tx.object(adminCapId), tx.object(profileId)],
  });

  return tx;
}

// ==================== Post Transactions (Phase 2) ====================

export function createPostTx(
  profileId: string,
  content: string,
  imageUrls: string[]
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::create_post`,
    arguments: [
      tx.object(GLOBAL_REGISTRY_ID),
      tx.object(profileId),
      tx.pure.string(content),
      tx.pure.vector('string', imageUrls),
    ],
  });

  return tx;
}

export function deletePostTx(postId: string): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::delete_post`,
    arguments: [tx.object(postId)],
  });

  return tx;
}

export function likePostTx(postId: string, profileId: string): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::like_post`,
    arguments: [tx.object(postId), tx.object(profileId)],
  });

  return tx;
}

export function unlikePostTx(postId: string, profileId: string): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::unlike_post`,
    arguments: [tx.object(postId), tx.object(profileId)],
  });

  return tx;
}

export function addCommentTx(
  postId: string,
  profileId: string,
  content: string
): Transaction {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::dolphinders::add_comment`,
    arguments: [tx.object(postId), tx.object(profileId), tx.pure.string(content)],
  });

  return tx;
}

