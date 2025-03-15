/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const multer = require('multer');
// const path = require('path');
const { User } = require('../db/index');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// upload avatar
router.put('/update-avatar/:googleId', upload.single('avatar'), async (req, res) => {
  const { googleId } = req.params;
  try {
    const user = await User.findOne({ where: { googleId } });
    if (!user) return res.status(404);
    user.avatar = req.file.filename;
    await user.save();
    res.status(200).json({ avatar: user.avatar });
  } catch (err) {
    console.error('err updating avatar:', err);
    res.status(500);
  }
});

// delete avatar
router.delete('/delete-avatar/:googleId', async (req, res) => {
  const { googleId } = req.params;
  try {
    const user = await User.findOne({ where: { googleId } });
    if (!user) return res.status(404);
    user.avatar = 'avatar.png';
    await user.save();
    res.status(200).json({ message: 'avatar deleted' });
  } catch (err) {
    console.error('err deleting avatar:', err);
    res.status(500);
  }
});

module.exports = router;
