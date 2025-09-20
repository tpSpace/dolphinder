type Dev = {
  name: string;
  username: string;
  avatar?: string;
  github: string;
  linkedin?: string;
  website?: string;
  bio?: string;
  slushWallet?: string;
};

const DEV_DATA: Dev[] = [
  {
    name: "John Doe",
    username: "john-doe",
    avatar: "https://github.com/john-doe.png",
    github: "https://github.com/john-doe",
    linkedin: "https://www.linkedin.com/in/john-doe",
    website: "https://john-doe.com",
    bio: "John Doe is a software engineer at Google.",
    slushWallet: "0x1234567890123456789012345678901234567890",
  },
  {
    name: "Jane Smith",
    username: "jane-smith",
    avatar: "https://github.com/jane-smith.png",
    github: "https://github.com/jane-smith",
    linkedin: "https://www.linkedin.com/in/jane-smith",
    website: "https://jane-smith.dev",
    bio: "Jane Smith is a full-stack developer specializing in React and Node.js.",
    slushWallet: "0x2345678901234567890123456789012345678901",
  },
  {
    name: "Alex Wilson",
    username: "alex-wilson",
    avatar: "https://github.com/alex-wilson.png",
    github: "https://github.com/alex-wilson",
    linkedin: "https://www.linkedin.com/in/alex-wilson",
    website: "https://alexwilson.tech",
    bio: "Alex Wilson is a blockchain developer and crypto enthusiast.",
    slushWallet: "0x3456789012345678901234567890123456789012",
  },
  {
    name: "Sarah Chen",
    username: "sarah-chen",
    avatar: "https://github.com/sarah-chen.png",
    github: "https://github.com/sarah-chen",
    linkedin: "https://www.linkedin.com/in/sarah-chen",
    website: "https://sarahchen.io",
    bio: "Sarah Chen is a UI/UX designer and frontend developer.",
    slushWallet: "0x4567890123456789012345678901234567890123",
  },
  {
    name: "Mike Johnson",
    username: "mike-johnson",
    avatar: "https://github.com/mike-johnson.png",
    github: "https://github.com/mike-johnson",
    linkedin: "https://www.linkedin.com/in/mike-johnson",
    website: "https://mikejohnson.dev",
    bio: "Mike Johnson is a DevOps engineer and cloud architecture expert.",
    slushWallet: "0x5678901234567890123456789012345678901234",
  },
  {
    name: "Hoang Son",
    username: "Yi",
    avatar: "/avatar/Yi-avatar.png",
    github: "https://github.com/sonmessia",
    linkedin: "https://www.linkedin.com/in/mike-johnson",
    bio: "Backend | Passionate about blockchain, AI, and scalable systems.",
    slushWallet: "0x5678901234567890123456789012345678901234",
  },
];

export default DEV_DATA;
