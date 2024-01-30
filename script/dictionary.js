module.exports.config = {
  name: "dictionary",
  version: "1.0.0",
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const {
    threadID,
    messageID
  } = event;
  const fs = require("fs");
  const input = args.join(" ");
  if (!input) {
    api.sendMessage("Please provide a word to search for.", threadID, messageID);
    return;
  }
  try {
    const response = await require("axios").get(encodeURI(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`));
    const data = response.data[0];
    const example = data.meanings[0].definitions.example;
    const phonetics = data.phonetics;
    const meanings = data.meanings;
    let msg_meanings = "";
    meanings.forEach((item) => {
      const definition = item.definitions[0].definition;
      const example = item.definitions[0].example ? `\n*example:\n \"${item.definitions[0].example[0].toUpperCase() + item.definitions[0].example.slice(1)}\"` : "";
      msg_meanings += `\n• ${item.partOfSpeech}\n ${definition[0].toUpperCase() + definition.slice(1) + example}`;
    });
    let msg_phonetics = "";
    phonetics.forEach((item) => {
      const text = item.text ? `\n    /${item.text}/` : "";
      msg_phonetics += text;
    });
    const msg = `❰ ❝ ${data.word} ❞ ❱` + msg_phonetics + msg_meanings;
    api.sendMessage(msg, threadID, messageID);
  } catch (error) {
    if (error.response?.status === 404) {
      api.sendMessage(`No definitions found for '${word}'.`, threadID, messageID);
    } else {
      api.sendMessage("An error occurred while fetching the definition. Please try again later.", threadID, messageID);
    }
  }
};