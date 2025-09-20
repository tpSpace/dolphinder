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
        name: "Phuc Pham",
        username: "Phucpt05",
        avatar: "https://avatars.githubusercontent.com/u/166826058?s=96&v=4",
        github: "https://github.com/Phucpt05",
        linkedin: "https://www.linkedin.com/in/ph%E1%BA%A1m-ph%C3%BAc-34164b211/",
        bio: "I am a third-year university student passionate about Web3 and blockchain.",
        slushWallet: "0x3161f4083d09983b4fc68ea208bd2ea3616f1bf91e8fd9c5303552d5aa64af19",
    },
];

export default DEV_DATA;