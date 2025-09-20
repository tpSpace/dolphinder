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
        name: "Hulk",
        username: "hulk",
        avatar: "/avatar/hulk-avatar.png",
        github: "https://github.com/Huc06",
        linkedin: "https://www.linkedin.com/in/hulk-phuc-ha-84a685301/",
        bio: "This product offers a unique solution to a common problem.",
        slushWallet: "0xaea6f58e4261b34032934c6c20e0b5b4fd94bac2e86734e3f2d3d5856b443108",
    },
    {
        name: "Alvin Ichi",
        username: "alvin-ichi",
        avatar: "https://avatars.githubusercontent.com/u/48800728?s=96&v=4",
        github: "https://github.com/nhatlapross",
        linkedin: "https://www.linkedin.com/in/nguyen-ho%C3%A0ng-nhat-69b85b134/",
        bio: "Web2 developer go to web3.",
        slushWallet: "0x3808b95f4603b8140b5d2082d4d6970ded65f49dac8980db525fe6f0a0f05396",
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
    {
        name: "222tee",
        username: "teededung",
        avatar: "https://avatars.githubusercontent.com/u/9781158?v=4",
        github: "https://github.com/teededung",
        linkedin: "https://www.linkedin.com/in/tuan-anh-nguyen-990140157/",
        bio: "Full-Stack Web Developer & Sui Blockchain Builder.",
        slushWallet: "0x2290bae249486a402698286c85d57ff46d27bf79ad706543d84646ef03a00362",
    },
];

export default DEV_DATA;