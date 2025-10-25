module dolphinders::dolphinders;

use std::string::String;
use sui::table::{Self, Table};

// ==================== Error Codes ====================
const ENotProfileOwner: u64 = 1;
const ENotAdmin: u64 = 2;
const EProfileAlreadyExists: u64 = 3;
const EProfileNotFound: u64 = 4;
const EInvalidOrderIndex: u64 = 5;

// ==================== Structs ====================

/// Admin capability for verification and management
public struct AdminCap has key, store {
    id: UID,
}

/// User Profile - stores all user information
public struct Profile has key, store {
    id: UID,
    owner: address,
    name: String,
    bio: String,
    avatar_url: String,
    banner_url: String,
    social_links: vector<String>,
    is_verified: bool,
    created_at: u64,
    experiences: Table<u64, Experience>,
    experience_count: u64,
    educations: Table<u64, Education>,
    education_count: u64,
    certificates: Table<u64, Certificate>,
    certificate_count: u64,
    skills: vector<Skill>,
}

/// Work Experience entry
public struct Experience has copy, drop, store {
    id: u64,
    job_title: String,
    company: String,
    start_date: String,
    end_date: String,
    description: String,
    order_index: u64,
}

/// Education entry
public struct Education has copy, drop, store {
    id: u64,
    school: String,
    degree: String,
    field_of_study: String,
    start_date: String,
    end_date: String,
    order_index: u64,
}

/// Certificate entry
public struct Certificate has copy, drop, store {
    id: u64,
    name: String,
    issuer: String,
    issue_date: String,
    certificate_url: String,
    order_index: u64,
}

/// Skill
public struct Skill has copy, drop, store {
    name: String,
    endorsement_count: u64,
}

/// Global Registry for profile discovery
public struct GlobalRegistry has key {
    id: UID,
    profiles: Table<address, ID>,
    profile_count: u64,
    posts: Table<ID, address>, // post_id -> author_address
    post_count: u64,
}

/// Post - social media style posts for sharing achievements
public struct Post has key, store {
    id: UID,
    author: address,
    profile_id: ID,
    content: String,
    image_urls: vector<String>, // Walrus URLs for images
    like_count: u64,
    comment_count: u64,
    liked_by: Table<address, bool>, // address -> liked
    created_at: u64,
    updated_at: u64,
}

/// Comment on a post
public struct Comment has copy, drop, store {
    id: u64,
    author: address,
    profile_id: ID,
    content: String,
    created_at: u64,
    order_index: u64,
}

// ==================== Events ====================

public struct ProfileCreated has copy, drop {
    profile_id: ID,
    owner: address,
    name: String,
}

public struct ProfileUpdated has copy, drop {
    profile_id: ID,
    owner: address,
}

public struct ProfileVerified has copy, drop {
    profile_id: ID,
    owner: address,
    is_verified: bool,
}

public struct ExperienceAdded has copy, drop {
    profile_id: ID,
    experience_id: u64,
}

public struct EducationAdded has copy, drop {
    profile_id: ID,
    education_id: u64,
}

public struct CertificateAdded has copy, drop {
    profile_id: ID,
    certificate_id: u64,
}

public struct PostCreated has copy, drop {
    post_id: ID,
    author: address,
    profile_id: ID,
    content: String,
}

public struct PostLiked has copy, drop {
    post_id: ID,
    liker: address,
    profile_id: ID,
}

public struct PostUnliked has copy, drop {
    post_id: ID,
    unliker: address,
    profile_id: ID,
}

public struct CommentAdded has copy, drop {
    post_id: ID,
    comment_id: u64,
    author: address,
    profile_id: ID,
}

public struct PostDeleted has copy, drop {
    post_id: ID,
    author: address,
    profile_id: ID,
}

// ==================== Init Function ====================

/// Initialize the module - create AdminCap and GlobalRegistry
fun init(ctx: &mut TxContext) {
    // Create and transfer AdminCap to deployer
    let admin_cap = AdminCap {
        id: object::new(ctx),
    };
    transfer::transfer(admin_cap, ctx.sender());

    // Create and share GlobalRegistry
    let registry = GlobalRegistry {
        id: object::new(ctx),
        profiles: table::new(ctx),
        profile_count: 0,
        posts: table::new(ctx),
        post_count: 0,
    };
    transfer::share_object(registry);
}

// ==================== Profile Functions ====================

/// Create a new profile
public entry fun create_profile(
    registry: &mut GlobalRegistry,
    name: String,
    bio: String,
    avatar_url: String,
    banner_url: String,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();

    // Check if profile already exists
    assert!(!registry.profiles.contains(sender), EProfileAlreadyExists);

    let profile_uid = object::new(ctx);
    let profile_id = profile_uid.to_inner();

    let profile = Profile {
        id: profile_uid,
        owner: sender,
        name,
        bio,
        avatar_url,
        banner_url,
        social_links: vector::empty(),
        is_verified: false,
        created_at: ctx.epoch_timestamp_ms(),
        experiences: table::new(ctx),
        experience_count: 0,
        educations: table::new(ctx),
        education_count: 0,
        certificates: table::new(ctx),
        certificate_count: 0,
        skills: vector::empty(),
    };

    // Add to registry
    registry.profiles.add(sender, profile_id);
    registry.profile_count = registry.profile_count + 1;

    // Emit event
    sui::event::emit(ProfileCreated {
        profile_id,
        owner: sender,
        name: profile.name,
    });

    // Share the profile object
    transfer::share_object(profile);
}

/// Update profile basic information
public entry fun update_profile(
    profile: &mut Profile,
    name: String,
    bio: String,
    avatar_url: String,
    banner_url: String,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);

    profile.name = name;
    profile.bio = bio;
    profile.avatar_url = avatar_url;
    profile.banner_url = banner_url;

    sui::event::emit(ProfileUpdated {
        profile_id: object::id(profile),
        owner: profile.owner,
    });
}

/// Add social link to profile
public entry fun add_social_link(profile: &mut Profile, link: String, ctx: &mut TxContext) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.social_links.push_back(link);
}

/// Update social links
public entry fun update_social_links(
    profile: &mut Profile,
    links: vector<String>,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.social_links = links;
}

// ==================== Experience Functions ====================

/// Add work experience
public entry fun add_experience(
    profile: &mut Profile,
    job_title: String,
    company: String,
    start_date: String,
    end_date: String,
    description: String,
    order_index: u64,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);

    let experience_id = profile.experience_count;
    let experience = Experience {
        id: experience_id,
        job_title,
        company,
        start_date,
        end_date,
        description,
        order_index,
    };

    profile.experiences.add(experience_id, experience);
    profile.experience_count = profile.experience_count + 1;

    sui::event::emit(ExperienceAdded {
        profile_id: object::id(profile),
        experience_id,
    });
}

/// Update experience
public entry fun update_experience(
    profile: &mut Profile,
    experience_id: u64,
    job_title: String,
    company: String,
    start_date: String,
    end_date: String,
    description: String,
    order_index: u64,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);

    let experience = Experience {
        id: experience_id,
        job_title,
        company,
        start_date,
        end_date,
        description,
        order_index,
    };

    *profile.experiences.borrow_mut(experience_id) = experience;
}

/// Remove experience
public entry fun remove_experience(profile: &mut Profile, experience_id: u64, ctx: &mut TxContext) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.experiences.remove(experience_id);
}

// ==================== Education Functions ====================

/// Add education
public entry fun add_education(
    profile: &mut Profile,
    school: String,
    degree: String,
    field_of_study: String,
    start_date: String,
    end_date: String,
    order_index: u64,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);

    let education_id = profile.education_count;
    let education = Education {
        id: education_id,
        school,
        degree,
        field_of_study,
        start_date,
        end_date,
        order_index,
    };

    profile.educations.add(education_id, education);
    profile.education_count = profile.education_count + 1;

    sui::event::emit(EducationAdded {
        profile_id: object::id(profile),
        education_id,
    });
}

/// Update education
public entry fun update_education(
    profile: &mut Profile,
    education_id: u64,
    school: String,
    degree: String,
    field_of_study: String,
    start_date: String,
    end_date: String,
    order_index: u64,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);

    let education = Education {
        id: education_id,
        school,
        degree,
        field_of_study,
        start_date,
        end_date,
        order_index,
    };

    *profile.educations.borrow_mut(education_id) = education;
}

/// Remove education
public entry fun remove_education(profile: &mut Profile, education_id: u64, ctx: &mut TxContext) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.educations.remove(education_id);
}

// ==================== Certificate Functions ====================

/// Add certificate
public entry fun add_certificate(
    profile: &mut Profile,
    name: String,
    issuer: String,
    issue_date: String,
    certificate_url: String,
    order_index: u64,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);

    let certificate_id = profile.certificate_count;
    let certificate = Certificate {
        id: certificate_id,
        name,
        issuer,
        issue_date,
        certificate_url,
        order_index,
    };

    profile.certificates.add(certificate_id, certificate);
    profile.certificate_count = profile.certificate_count + 1;

    sui::event::emit(CertificateAdded {
        profile_id: object::id(profile),
        certificate_id,
    });
}

/// Update certificate
public entry fun update_certificate(
    profile: &mut Profile,
    certificate_id: u64,
    name: String,
    issuer: String,
    issue_date: String,
    certificate_url: String,
    order_index: u64,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);

    let certificate = Certificate {
        id: certificate_id,
        name,
        issuer,
        issue_date,
        certificate_url,
        order_index,
    };

    *profile.certificates.borrow_mut(certificate_id) = certificate;
}

/// Remove certificate
public entry fun remove_certificate(
    profile: &mut Profile,
    certificate_id: u64,
    ctx: &mut TxContext,
) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.certificates.remove(certificate_id);
}

// ==================== Skill Functions ====================

/// Add skill
public entry fun add_skill(profile: &mut Profile, skill_name: String, ctx: &mut TxContext) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);

    let skill = Skill {
        name: skill_name,
        endorsement_count: 0,
    };

    profile.skills.push_back(skill);
}

/// Remove skill
public entry fun remove_skill(profile: &mut Profile, skill_index: u64, ctx: &mut TxContext) {
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.skills.remove(skill_index);
}

// ==================== Admin Functions ====================

/// Verify a profile (admin only)
public entry fun verify_profile(
    _admin_cap: &AdminCap,
    profile: &mut Profile,
    _ctx: &mut TxContext,
) {
    profile.is_verified = true;

    sui::event::emit(ProfileVerified {
        profile_id: object::id(profile),
        owner: profile.owner,
        is_verified: true,
    });
}

/// Unverify a profile (admin only)
public entry fun unverify_profile(
    _admin_cap: &AdminCap,
    profile: &mut Profile,
    _ctx: &mut TxContext,
) {
    profile.is_verified = false;

    sui::event::emit(ProfileVerified {
        profile_id: object::id(profile),
        owner: profile.owner,
        is_verified: false,
    });
}

// ==================== Post Functions ====================

/// Create a new post
public entry fun create_post(
    registry: &mut GlobalRegistry,
    profile: &Profile,
    content: String,
    image_urls: vector<String>,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    assert!(profile.owner == sender, ENotProfileOwner);

    let post_id = object::new(ctx);
    let post = Post {
        id: post_id,
        author: sender,
        profile_id: object::id(profile),
        content,
        image_urls,
        like_count: 0,
        comment_count: 0,
        liked_by: table::new(ctx),
        created_at: sui::tx_context::epoch(ctx),
        updated_at: sui::tx_context::epoch(ctx),
    };

    let post_obj_id = object::id(&post);
    registry.posts.add(post_obj_id, sender);
    registry.post_count = registry.post_count + 1;

    sui::event::emit(PostCreated {
        post_id: post_obj_id,
        author: sender,
        profile_id: object::id(profile),
        content: post.content,
    });

    transfer::share_object(post);
}

/// Delete a post (only by author)
public entry fun delete_post(post: &mut Post, ctx: &mut TxContext) {
    let sender = ctx.sender();
    assert!(post.author == sender, ENotProfileOwner);

    let post_id = object::id(post);

    sui::event::emit(PostDeleted {
        post_id,
        author: sender,
        profile_id: post.profile_id,
    });
}

/// Like a post
public entry fun like_post(post: &mut Post, profile: &Profile, ctx: &mut TxContext) {
    let sender = ctx.sender();
    assert!(profile.owner == sender, ENotProfileOwner);

    // Check if already liked
    if (post.liked_by.contains(sender)) {
        return // Already liked
    };

    post.liked_by.add(sender, true);
    post.like_count = post.like_count + 1;

    sui::event::emit(PostLiked {
        post_id: object::id(post),
        liker: sender,
        profile_id: object::id(profile),
    });
}

/// Unlike a post
public entry fun unlike_post(post: &mut Post, profile: &Profile, ctx: &mut TxContext) {
    let sender = ctx.sender();
    assert!(profile.owner == sender, ENotProfileOwner);

    // Check if liked
    if (!post.liked_by.contains(sender)) {
        return // Not liked
    };

    post.liked_by.remove(sender);
    post.like_count = post.like_count - 1;

    sui::event::emit(PostUnliked {
        post_id: object::id(post),
        unliker: sender,
        profile_id: object::id(profile),
    });
}

/// Add comment to post
public entry fun add_comment(
    post: &mut Post,
    profile: &Profile,
    _content: String,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    assert!(profile.owner == sender, ENotProfileOwner);

    // Note: In a real implementation, we'd store comments in a table
    // For now, we'll just increment the comment count
    post.comment_count = post.comment_count + 1;

    sui::event::emit(CommentAdded {
        post_id: object::id(post),
        comment_id: post.comment_count,
        author: sender,
        profile_id: object::id(profile),
    });
}

// ==================== View Functions ====================

/// Get profile owner
public fun get_owner(profile: &Profile): address {
    profile.owner
}

/// Get profile name
public fun get_name(profile: &Profile): String {
    profile.name
}

/// Get profile bio
public fun get_bio(profile: &Profile): String {
    profile.bio
}

/// Check if verified
public fun is_verified(profile: &Profile): bool {
    profile.is_verified
}

/// Get experience count
public fun get_experience_count(profile: &Profile): u64 {
    profile.experience_count
}

/// Get education count
public fun get_education_count(profile: &Profile): u64 {
    profile.education_count
}

/// Get certificate count
public fun get_certificate_count(profile: &Profile): u64 {
    profile.certificate_count
}

/// Get post count from registry
public fun get_post_count(registry: &GlobalRegistry): u64 {
    registry.post_count
}

/// Get post author
public fun get_post_author(post: &Post): address {
    post.author
}

/// Get post content
public fun get_post_content(post: &Post): String {
    post.content
}

/// Get post like count
public fun get_post_like_count(post: &Post): u64 {
    post.like_count
}

/// Get post comment count
public fun get_post_comment_count(post: &Post): u64 {
    post.comment_count
}

/// Get post image URLs
public fun get_post_image_urls(post: &Post): vector<String> {
    post.image_urls
}

/// Check if user liked a post
public fun is_post_liked_by(post: &Post, user: address): bool {
    post.liked_by.contains(user)
}
