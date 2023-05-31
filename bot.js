require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

const TOKEN = process.env.TOKEN;
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content === '!hello') {
    message.reply('Hello!');
  } else {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a bot.' },
            { role: 'user', content: message.content },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${CHATGPT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const reply = response.data.choices[0].message.content;
      message.reply(reply);
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

client.login(TOKEN);
