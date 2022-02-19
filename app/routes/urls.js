const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');
const utils = require('../utils/utils');
require('dotenv').config({ path: '../../config/.env' });

router.post('/tinify', async (req, res) => {
  const { originalUrl } = req.body;
  const base = process.env.BASE;

  if (!utils.validateUrl(originalUrl)) {
    res.status(400).json('invalid url');
    return;
  }

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json(url);
      return;
    }

    const urlId = shortid.generate();
    const tinyUrl = `${base}/${urlId}`;
    url = new Url({ originalUrl, tinyUrl, urlId, date: new Date() });

    await url.save();
    res.json(url);
  } catch (err) {
    console.log(err)
    res.status(500).json('server error');
  }
});

module.exports = router;
