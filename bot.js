const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

const TOKEN = 'MTExMzM4NTc1NzM5NTEzNjU5Mg.GxbZsn.j9DOlEahm0Rx4T_TN8AFkBRCIL2rAGoMnpEXUs';
const CHATGPT_API_KEY = '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';

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
