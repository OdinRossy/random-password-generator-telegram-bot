require('https').createServer().listen(process.env.PORT || 5000).on('request', function (req, res) {
    res.end('');
});
const bot = require('./bot');
bot.service();