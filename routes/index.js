const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const User = db.get('User');

const schema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required()
});

const router = express.Router();
const path = require('path');


router.get('/', async (req, res, next) => {
  try {
    const items = await User.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await User.findOne({
      _id: id,
    });
    if(!item) {
      return next()
    } else {
      return res.json(item)
    }
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await User.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});


router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await schema.validateAsync(req.body);
    const item = await User.findOne({
      _id: id,
    });
    if(!item) {
      return next()
    }
    await User.update({
      _id: id
    }, {
      $set: value
    });
    res.json(value);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.remove({ _id: id })
    res.json({
      message: 'Success'
    })
  } catch (error) {
    next(error);
  }
});







router.use (function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/',function(req,res){
  res.sendFile(path.resolve('views/index.html'));
});

module.exports = router;
