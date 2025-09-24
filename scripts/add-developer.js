#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEVELOPERS_DIR = path.join(__dirname, "../src/data/developers");

// Template for new developer
const DEVELOPER_TEMPLATE = {
  name: "",
  username: "",
  avatar: "",
  github: "",
  linkedin: "",
  website: "",
  bio: "",
  slushWallet: "",
};

function createDeveloper(username, data) {
  const filePath = path.join(DEVELOPERS_DIR, `${username}.json`);

  if (fs.existsSync(filePath)) {
    console.error(`❌ Developer ${username} already exists!`);
    process.exit(1);
  }

  const developerData = {
    ...DEVELOPER_TEMPLATE,
    username,
    ...data,
  };

  // Remove empty fields
  Object.keys(developerData).forEach(key => {
    if (!developerData[key]) {
      delete developerData[key];
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(developerData, null, 2));
  console.log(`✅ Created developer profile: ${filePath}`);
}

function listDevelopers() {
  const files = fs
    .readdirSync(DEVELOPERS_DIR)
    .filter(file => file.endsWith(".json"));
  console.log("📋 Current developers:");
  files.forEach(file => {
    const username = path.basename(file, ".json");
    console.log(`  - ${username}`);
  });
}

function validateDeveloper(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const required = ["name", "username", "github"];
    const missing = required.filter(field => !data[field]);

    if (missing.length > 0) {
      console.error(
        `❌ ${filePath} missing required fields: ${missing.join(", ")}`
      );
      return false;
    }

    console.log(`✅ ${filePath} is valid`);
    return true;
  } catch (error) {
    console.error(`❌ ${filePath} invalid JSON: ${error.message}`);
    return false;
  }
}

function validateAll() {
  const files = fs
    .readdirSync(DEVELOPERS_DIR)
    .filter(file => file.endsWith(".json"));
  let allValid = true;

  files.forEach(file => {
    const filePath = path.join(DEVELOPERS_DIR, file);
    if (!validateDeveloper(filePath)) {
      allValid = false;
    }
  });

  if (allValid) {
    console.log("🎉 All developer profiles are valid!");
  } else {
    process.exit(1);
  }
}

// CLI
const command = process.argv[2];

switch (command) {
  case "add":
    const username = process.argv[3];
    if (!username) {
      console.error("Usage: node add-developer.js add <username>");
      process.exit(1);
    }

    // Interactive mode - could be enhanced with prompts
    console.log(`Creating developer profile for: ${username}`);
    console.log(
      "Please edit the generated JSON file with the developer information."
    );

    createDeveloper(username, {
      name: `[Enter ${username}'s full name]`,
      github: `https://github.com/${username}`,
      bio: "[Enter bio]",
    });
    break;

  case "list":
    listDevelopers();
    break;

  case "validate":
    const targetFile = process.argv[3];
    if (targetFile) {
      validateDeveloper(path.join(DEVELOPERS_DIR, targetFile));
    } else {
      validateAll();
    }
    break;

  default:
    console.log(`
🐬 Dolphinder Developer Management

Usage:
  node scripts/add-developer.js add <username>     - Create new developer profile
  node scripts/add-developer.js list              - List all developers
  node scripts/add-developer.js validate [file]   - Validate developer profile(s)

Examples:
  node scripts/add-developer.js add john-doe
  node scripts/add-developer.js validate john-doe.json
    `);
}
