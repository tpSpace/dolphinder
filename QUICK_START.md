# 🚀 Dolphinder Quick Start Guide

## What We've Built

**Dolphinder** - An on-chain LinkedIn platform on Sui blockchain where developers can create professional profiles stored permanently on-chain with images on Walrus storage.

## ✅ Phase 1 Complete: Profile System

### Features Implemented

1. **Professional Profiles**
   - Name, bio, avatar, banner images
   - Social media links
   - Admin verification badges

2. **Work Experience**
   - Job title, company, dates
   - Descriptions
   - Sortable entries

3. **Education**
   - School, degree, field of study
   - Dates
   - Sortable entries

4. **Certificates**
   - Certificate name, issuer, date
   - Upload certificate images
   - Stored permanently on Walrus

5. **Skills**
   - Add/remove skills
   - Endorsement counts
   - Tag-based display

6. **Key Benefits**
   - 🎉 **Gas-free transactions** - All operations sponsored
   - 🖼️ **Permanent storage** - Images on Walrus
   - 🔐 **Fully on-chain** - Profile data on Sui blockchain
   - ✨ **Modern UI** - Beautiful interface with shadcn/ui
   - 📱 **Responsive** - Works on all devices

## 📁 Project Structure

```
dolphinder/
├── dolphinders/              # Move smart contract ✅
│   └── sources/dolphinders.move
├── app/                      # Next.js pages ✅
│   ├── page.tsx             # Home with sidebar nav
│   └── profile/             # Profile pages
├── components/              # React components ✅
│   ├── ProfileCard.tsx
│   ├── ExperienceCard.tsx
│   ├── EducationCard.tsx
│   ├── CertificateCard.tsx
│   └── ImageUpload.tsx
└── lib/                     # Utilities ✅
    ├── sui.ts              # Blockchain queries
    ├── walrus.ts           # Image storage
    ├── sponsor.ts          # Gas-free transactions
    └── hooks/useProfile.ts # Data fetching
```

## 🚀 Quick Deploy

### 1. Deploy Smart Contract

```bash
cd dolphinders
sui move build
sui client publish --gas-budget 100000000
```

**Save these from output:**
- Package ID
- GlobalRegistry ID
- AdminCap ID (for verification)

### 2. Update Frontend Config

Edit `lib/constants.ts`:

```typescript
export const PACKAGE_ID = '0xYOUR_PACKAGE_ID_HERE';
export const GLOBAL_REGISTRY_ID = '0xYOUR_REGISTRY_ID_HERE';
```

### 3. Install & Run

```bash
bun install         # or npm install
bun run dev         # or npm run dev
```

Visit: http://localhost:3000

## 💡 How to Use

### For Users

1. **Connect Wallet**
   - Click "Connect Wallet"
   - Select Suiet or another Sui wallet
   - Connect to testnet

2. **Create Profile**
   - Click "Create Profile"
   - Upload avatar & banner (Walrus storage)
   - Fill in name & bio
   - Submit (gas-free!)

3. **Add Information**
   - Go to "Edit Profile"
   - Add experiences, education, certificates, skills
   - All transactions are sponsored

4. **Share Profile**
   - View your profile
   - Share URL: `/profile/YOUR_ADDRESS`

### For Admins

Verify profiles using AdminCap:

```bash
sui client call \
  --package YOUR_PACKAGE_ID \
  --module dolphinders \
  --function verify_profile \
  --args YOUR_ADMIN_CAP_ID PROFILE_ID \
  --gas-budget 10000000
```

## 🎨 Tech Stack

- **Blockchain**: Sui (Move language)
- **Storage**: Walrus (permanent image storage)
- **Frontend**: Next.js 16 + TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **State**: TanStack Query
- **Wallet**: @mysten/dapp-kit (Suiet support)

## 📊 What's Working

✅ Smart contract (540 lines)
✅ Frontend app (3500+ lines)  
✅ Profile creation & editing
✅ Experience management
✅ Education management
✅ Certificate management
✅ Skill management
✅ Image uploads to Walrus
✅ Sponsored gas transactions
✅ Admin verification
✅ Responsive UI
✅ Zero linting errors

## 🔜 Phase 2: Posts & Feed (Planned)

- Create posts with images
- Like & comment on posts
- Infinite scroll feed
- Real-time updates

## 📚 Documentation

- `DEPLOYMENT.md` - Full deployment guide
- `PROJECT_STATUS.md` - Detailed project status
- `README.md` - Original project info

## 🎯 Ready to Deploy!

**Phase 1 is 100% complete.** Just deploy the contract, update the constants, and you're live!

## 🆘 Support

- **Sui Docs**: https://docs.sui.io
- **Walrus Docs**: https://walrus.site
- **Sponsored Tx**: https://docs.sui.io/concepts/transactions/sponsored-transactions

---

**Built with ❤️ for the Sui Builder Challenge**

