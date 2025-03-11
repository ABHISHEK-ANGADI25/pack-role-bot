require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

const ROLE_NAME = "Frontend-Developer"; // Change this to the role you want to assign

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "!join") {
    let role = message.guild.roles.cache.find((r) => r.name === ROLE_NAME);
    if (!role) return message.reply("Role not found!");

    try {
      await message.member.roles.add(role);
      message.reply(`You have been given the ${ROLE_NAME} role!`);
    } catch (error) {
      console.error(error);
      message.reply("I don't have permission to assign roles.");
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
