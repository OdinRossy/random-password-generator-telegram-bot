// https://github.com/yagop/node-telegram-bot-api
import TelegramBot from 'node-telegram-bot-api';
// https://github.com/bermi/password-generator
import generatePassword from 'password-generator';

import { getBotToken } from './config.js';

const service = () => {
    console.debug('Bot started..');

    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(getBotToken(), { polling: true });

    // Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, resp);
    });

    // Listen for any kind of message. There are different kinds of messages.
    bot.on('message', (message) => {
        const { chat, text } = message;

        const passwordLenght = getPasswordLenght(text);
        const generatedPassword = generatePassword(passwordLenght, false, /\w/);

        sendMarkdownMessage(bot, chat.id, 'Your password is:');
        sendMarkdownMessage(bot, chat.id, '`' + generatedPassword + '`');
    });

    const getPasswordLenght = (text) => {
        if (!isNaN(text)) {
            const integerValue = parseInt(text);
            if (integerValue > 5) {
                return integerValue;
            }
        }

        return 10;
    };

    const sendMarkdownMessage = (bot, chatId, text) => {
        bot.sendMessage(chatId, text, { parse_mode: 'markdown' });
    };
};

export default { service };