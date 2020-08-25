const getBotToken = () => {
    return process.env.bot_token || '';
};

export { getBotToken };