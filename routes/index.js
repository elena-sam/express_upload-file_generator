const express = require('express');
const router = express.Router();
const multer = require('multer');
// accept png image only
const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(png)$/)) {
    return cb(new Error('Only png files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({
  dest: 'tmp/',
  limits: {
    files: 3,
    fileSize: 3145728
  },
  fileFilter: imageFilter
}).array('myFiles', 3);
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'File Upload'
  });
});

/* upload file. */
router.post('/fileupload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.send(req.files);
  });
});

module.exports = router;
