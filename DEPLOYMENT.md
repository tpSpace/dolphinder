# Dolphinder Deployment Guide

## Phase 1: Profile System (COMPLETED)

This guide covers deploying the Dolphinder on-chain LinkedIn platform with the Profile system.

## Prerequisites

1. **Sui CLI** - Install from https://docs.sui.io/guides/developer/getting-started/sui-install
2. **Node.js** (v18+) and npm/bun
3. **Sui Wallet** - Install browser extension
4. **Testnet SUI tokens** - Get from faucet

## Step 1: Deploy Move Smart Contract

### 1.1 Build the Move package

```bash
cd dolphinders
sui move build
```

### 1.2 Deploy to Sui testnet

```bash
sui client publish --gas-budget 100000000
```

### 1.3 Save the deployment information

After deployment, you'll get:

- **Package ID**: The published package address
- **Global Registry ID**: The shared GlobalRegistry object ID
- **Admin Cap ID**: The AdminCap object ID (for profile verification)

Example output:

```bash
Published Objects:
- Package ID: 0xABC123...
- Object ID: 0xDEF456... (GlobalRegistry)
- Object ID: 0x789XYZ... (AdminCap - transferred to deployer)
```

## Step 2: Configure Frontend

### 2.1 Update constants

Edit `lib/constants.ts` with your deployment information:

```typescript
export const PACKAGE_ID = '0xYOUR_PACKAGE_ID';
export const GLOBAL_REGISTRY_ID = '0xYOUR_REGISTRY_ID';
```

### 2.2 Install dependencies

```bash
# Using npm
npm install

# OR using bun
bun install
```

### 2.3 Run development server

```bash
# Using npm
npm run dev

# OR using bun
bun run dev
```

Visit http://localhost:3000

## Step 3: Test the Application

### 3.1 Connect Wallet

1. Open the app in your browser
2. Click "Connect Wallet"
3. Select Suiet or another Sui wallet
4. Connect to testnet

### 3.2 Create Profile

1. Click "Create Profile"
2. Upload avatar and banner (stored on Walrus)
3. Fill in name and bio
4. Click "Create Profile"
5. Transaction will be sponsored (no gas needed!)

### 3.3 Add Experiences, Education, Certificates, Skills

1. Go to "Edit Profile"
2. Navigate through tabs
3. Add your professional information
4. All transactions are gas-sponsored

### 3.4 View Profile

1. Navigate to your profile
2. See all your information displayed
3. Share your profile URL with others

## Step 4: Admin Verification (Optional)

If you're the admin (deployer), you can verify profiles:

```bash
sui client call \
  --package YOUR_PACKAGE_ID \
  --module dolphinders \
  --function verify_profile \
  --args YOUR_ADMIN_CAP_ID PROFILE_ID_TO_VERIFY \
  --gas-budget 10000000
```

## Environment Variables

Create a `.env.local` file (if needed for custom endpoints):

```env
# Optional: Custom Walrus endpoints
NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space

# Optional: Custom sponsor API
NEXT_PUBLIC_SPONSOR_API_URL=https://sponsor.sui.io/api/sponsor
```

## Troubleshooting

### Issue: Transaction fails

**Solution**: 

- Check you're on testnet
- Ensure Package ID and Registry ID are correct
- Check browser console for errors

### Issue: Images not uploading

**Solution**:

- Verify Walrus endpoints are accessible
- Check image size (max 5MB)
- Ensure image format is supported (jpg, png, gif, webp)

### Issue: Profile not found

**Solution**:

- Ensure you've created a profile first
- Check wallet is connected to correct network
- Verify Registry ID is correct

## Phase 2: Post/Feed System (Coming Soon)

The next phase will include:

- Post creation with images
- Like and comment functionality
- Infinite scroll feed
- Real-time updates

## Project Structure

```bash
dolphinder/
├── dolphinders/              # Move smart contract
│   ├── sources/
│   │   └── dolphinders.move # Main contract
│   └── Move.toml
├── app/                      # Next.js pages
│   ├── page.tsx             # Home feed
│   ├── profile/
│   │   ├── [address]/       # View profile
│   │   └── edit/            # Edit profile
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # shadcn components
│   ├── ProfileCard.tsx
│   ├── ExperienceCard.tsx
│   ├── EducationCard.tsx
│   ├── CertificateCard.tsx
│   ├── SkillBadge.tsx
│   ├── ImageUpload.tsx
│   └── WalletConnect.tsx
└── lib/                     # Utilities
    ├── sui.ts              # Sui client
    ├── walrus.ts           # Walrus integration
    ├── sponsor.ts          # Sponsored gas
    ├── contract.ts         # Contract interactions
    ├── constants.ts        # Configuration
    ├── types.ts            # TypeScript types
    └── hooks/
        └── useProfile.ts   # TanStack Query hooks
```

## Features Implemented

✅ User profiles with bio, avatar, banner
✅ Work experiences with dates and descriptions
✅ Education history
✅ Certificates with Walrus-stored images
✅ Skills with endorsement counts
✅ Admin verification badge
✅ Profile view and edit pages
✅ Sponsored transactions (gas-free for users)
✅ Walrus image storage
✅ TanStack Query for data fetching
✅ shadcn/ui components
✅ Responsive design with Tailwind CSS

## Next Steps

1. Deploy to Sui testnet
2. Update constants with deployed addresses
3. Test all functionality
4. Phase 2: Implement post feed system
5. Phase 3: Deploy to mainnet

## Support

For issues or questions, refer to:

- Sui Docs: https://docs.sui.io
- Walrus Docs: https://walrus.site
- Project README: README.md
