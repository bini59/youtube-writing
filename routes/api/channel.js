var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

// method : get
// path   : /id
// desc   : get channel id
// params : name (string)
router.get('/id', function (req, res, next) {
    // get params
    const name = req.query.name;
    // get channel id
    const url = `https://www.youtube.com/c/${name}`;
    request(url, function (error, response, body) {
        const $ = cheerio.load(body);
        const id = $('meta[itemprop="channelId"]').attr('content');
        res.json({ id: id });
    });
});


module.exports = router;
