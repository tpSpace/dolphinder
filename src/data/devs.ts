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
    },   {
        name: "Hulk",
        username: "hulk",
        avatar: "/avatar/hulk-avatar.png",
        github: "https://github.com/Huc06",
        linkedin: "https://www.linkedin.com/in/hulk-phuc-ha-84a685301/",
        bio: "This product offers a unique solution to a common problem.",
        slushWallet: "0xaea6f58e4261b34032934c6c20e0b5b4fd94bac2e86734e3f2d3d5856b443108",
    },
    {
        name: "Hữu Bảo",
        username: "huubao",
        avatar: "/avatar/huubao-avatar.jpg",
        github: "https://github.com/lehuubao1810",
        linkedin: "https://www.linkedin.com/in/lehuubao2909/",
        website: "https://lehuubao.vercel.app",
        bio: "I'm a Junior Developer with experience in React, Node.js, Next.js, and React Native. I'm passionate about expanding my skills in Web3 development.",
        slushWallet: "0xd21bc08c287ac02a995e00c121778e7c4d384547ed10e7940994157230d982d7",
    },
];

export default DEV_DATA;