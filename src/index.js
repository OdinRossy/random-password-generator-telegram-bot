import https from 'https';
import bot from './bot.js';

https.createServer()
    .listen(process.env.PORT || 5000)
    .on('request', (req, res) => {
        res.end('');
    });

bot.service();