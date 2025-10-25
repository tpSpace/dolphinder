# 🧱 Sui Builder Challenge — DOLPHINDER

## 🧠 Build your on-chain developer profile, showcase your projects, and prove your skills on Sui

> Powered by **Sui** 🪙 + **Walrus** 🧊 + **Sponsored Gas** ⛽  
> Hosted by **SuiHub APAC**

---

## 🎯 Mục tiêu Cuộc Thi

**Dolphinder** là dự án mẫu cho dev Web3:

- Tạo **on-chain developer profile** trực tiếp trên Sui.  
- Showcase **dự án cá nhân** (project cards với hình ảnh, video, link).  
- Đăng **chứng chỉ / thành tích** (self-issued certificates).  
- Lưu hình ảnh vĩnh viễn bằng **Walrus**.  
- Không cần backend, không tốn gas – dùng **Sponsored Transactions**.  
- Có thể được **xác thực (verified)** bởi admin/community.  

---

## 🧩 Tính năng yêu cầu

| Thành phần              | Mô tả                                                                           |
| ----------------------- | ------------------------------------------------------------------------------- |
| 👤 **Developer Profile** | Lưu on-chain: name, bio, social links, avatar/banner (Walrus), verified badge ✅ |
| 🚀 **Project Showcase**  | Dự án cá nhân: hình ảnh, video, mô tả, demo link — tất cả on-chain              |
| 🎓 **Certificates**      | Builder tự đăng chứng chỉ hoặc thành tích (self-issued certificates)            |
| ✅ **Verification**      | Admin xác thực builder (verified badge)                                         |
| 🧊 **Walrus Storage**    | Lưu hình ảnh, video thumbnail, certificate scan vĩnh viễn                       |
| ⛽ **Sponsored Gas**     | User publish/update mà không cần SUI trong ví                                   |

---

## ⚙️ Yêu cầu kỹ thuật

- **Frontend:** Astro + React + Tailwind  
- **Blockchain:** Sui testnet  
- **Smart Contract:** Move  
- **Storage:** Walrus (permanent)  
- **Wallet:** Sui Wallet / Suiet / Ethos  
- **Sponsored Gas:** MystenLabs sponsored API  

---

## 🚀 **DEPLOYED TO SUI TESTNET** ✅

**Contract deployed successfully! Ready for testing.**

### **Important Contract IDs**

- **Package ID**:
`0xcde463d95d04c81e56b8997fbd8378b1006897985760e177ee234f82d7cd68ba`
- **GlobalRegistry**: `0xe8f02280c428f61e667f10d8493075e376841dbbb09cd6d2b8b12461a9cf2c56`
- **AdminCap**: `0xddb76187a2ecef1c3968a638665829047f156610748759f67441f04f323ec666`
- **Admin Address**: `0x06c69714bd8c50f1c2b50f4bf4f8343648d2d72fc12df4dc267ad8636410cdc1`

### **Deployment Details**

- **Network**: Sui Testnet
- **Transaction**: [9vwJrF2qYrrdN8YdNMdqFhaKKhJF82vFnu42bPFXjQEC](https://testnet.suivision.xyz/txblock/9vwJrF2qYrrdN8YdNMdqFhaKKhJF82vFnu42bPFXjQEC)
- **Epoch**: 897
- **Gas Used**: ~38.3 SUI (including storage)

### **Quick Start**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Connect wallet and test profile creation!
```

---

## 🧱 Cấu trúc dự án

```bash
src/
 ├─ components/
 │   ├─ ProfileCard.tsx
 │   ├─ ProjectCard.tsx
 │   ├─ CertificateCard.tsx
 │   ├─ EditProfileForm.tsx
 │   ├─ AddProjectForm.tsx
 │   ├─ AddCertificateForm.tsx
 │   └─ WalletConnect.tsx
 ├─ lib/
 │   ├─ sui.ts
 │   ├─ walrus.ts
 │   └─ sponsor.ts
 ├─ pages/
 │   ├─ index.astro
 │   ├─ profile/[address].astro
 │   ├─ edit.astro
 │   ├─ add-project.astro
 │   ├─ add-certificate.astro
 │   └─ verify.astro
move/
 └─ dolphinder_profiles/
     ├─ sources/profiles.move
     └─ Move.toml
```

---

## 🧊 Upload Media với Walrus (Gợi ý)

```ts
import { WalrusClient } from "@mysten/walrus.js";
const client = new WalrusClient({ network: "testnet" });

export async function uploadToWalrus(file: File): Promise<string> {
  const { reference } = await client.upload(file);
  return reference; // wal://0xabc123...
}
```

---

## ⛽ Sponsored Gas API (Gợi ý)

```ts
import { Transaction } from "@mysten/sui.js";

export async function sendSponsoredTx(wallet, tx) {
  const kindBytes = await tx.build({ onlyTransactionKind: true });
  const userSig = await wallet.signData(kindBytes);
  const res = await fetch("https://sponsor.sui.io/api/sponsor", {
    method: "POST",
    body: JSON.stringify({
      kindBytes: Buffer.from(kindBytes).toString("base64"),
      userSig,
      pubKey: wallet.publicKey(),
    }),
  });
  return await res.json();
}
```

---

## 🖥 Trang UI cần có

| Trang             | Chức năng                                           |
| ----------------- | --------------------------------------------------- |
| 🏠 Home            | Danh sách builder + verified badge                  |
| 👤 Profile         | Thông tin cá nhân + project showcase + certificates |
| ✏️ Edit Profile    | Form cập nhật hồ sơ                                 |
| 🚀 Add Project     | Form thêm dự án                                     |
| 🎓 Add Certificate | Form thêm chứng chỉ                                 |
| 🧑‍💼 Admin Verify    | Trang xác thực builder                              |

---

## 🧠 Checklist Merge

| Hạng mục                     | Trạng thái |
| ---------------------------- | ---------- |
| Move module hoạt động        | ✅ **DEPLOYED** |
| Form hồ sơ, dự án, chứng chỉ | ✅ **COMPLETE** |
| Walrus upload OK             | ✅ **IMPLEMENTED** |
| Sponsored gas OK             | ✅ **IMPLEMENTED** |
| README cập nhật              | ✅ **UPDATED** |
| Test E2E                     | 🔄 **READY FOR TESTING** |

---

## 🏆 Giải thưởng (Tổng cộng 100 USDC)

| Hạng mục                    | Giải thưởng | Mô tả                                             |
| --------------------------- | ----------- | ------------------------------------------------- |
| 🥇 **Best On-chain Profile** | **40 USDC** | Profile + Projects + Certificates + Sponsored Gas |
| 🥈 **Best UI/UX**            | **25 USDC** | Giao diện đẹp, hiển thị rõ ràng                   |
| 🥉 **Best Move Contract**    | **20 USDC** | Module Move rõ ràng, chuẩn và an toàn             |
| 💡 **Innovation Award**      | **15 USDC** | Tính năng sáng tạo (badges, score, reputation...) |

💰 Tổng: **100 USDC**  
Phần thưởng gửi **trực tiếp bằng USDC trên Sui** – công bố ngày **08/11/2025**.

---

## 📅 Timeline

| Giai đoạn         | Thời gian                                    |
| ----------------- | -------------------------------------------- |
| 🚀 Bắt đầu         | 22/10/2025                                   |
| 🛠 Nộp bài         | 25/10/2025 (demo trưa thứ 7 tại SuiHub HCMC) |
| 🏁 Công bố kết quả | 5/11/2025                                    |

---

## 💬 Cách Tham Gia

1. Fork repo 👉 [https://github.com/terrancrypt/dolphinder](https://github.com/terrancrypt/dolphinder)  
2. Build hoặc mở rộng tính năng (frontend + Move).  
3. Gửi Pull Request + screenshot/demo link.  
4. Đăng tweet giới thiệu dự án kèm hashtag (nếu có dùng X)

   **`#SuiBuilderChallenge #Dolphinder #SuiHubAPAC @terrancrypt @SuiHubAPAC`**  

---

## 🔗 Tài nguyên

| Chủ đề                   | Link                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| 📘 Sui Docs               | https://docs.sui.io                                              |
| 🧊 Walrus                 | https://walrus.site                                              |
| ⛽ Sponsored Transactions | https://docs.sui.io/concepts/transactions/sponsored-transactions |
| 💻 Sui SDK JS             | https://sdk.mystenlabs.com/typescript                            |

---

## 🚀 Lời kết

> **DOLPHINDER** – Nơi bạn có thể chứng minh năng lực thật của mình,  
> qua hồ sơ, dự án, và thành tích — tất cả **on-chain**.  

**Build. Prove. Verify. On Sui.**
