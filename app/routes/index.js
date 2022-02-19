const Express = require('express');
const router = Express.Router();
const Url = require('../models/Url');

router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (!url) {
      res.status(404).json('not found');
      return;
    }

    url.save();
    return res.redirect(url.originalUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json('server error');
  }
});

module.exports = router;
