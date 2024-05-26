const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Oui je suis là pose ta question 🧘🏽‍♂️`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🤸🏽‍♂️ "${input} \npatientez je vous prie...🧘🏽‍♂️"`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://soyeon-api.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(𝐑𝐄́𝐏𝐎𝐍𝐒𝐄 😉 \n response + '\n\nhttps://www.facebook.com/sory.ronald.alexandre\n', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Erreur au niveau du recherches de ta question 🤧.', event.threadID, event.messageID);
  }
};
