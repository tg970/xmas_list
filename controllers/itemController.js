const express = require('express');
const router = express.Router();

const Item    = require('../models/itemModel');

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
});

router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new : true } );
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndRemove(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
