var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();
const multer = require('multer')
let upload = multer()

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// using multer npm, upload.single(name of input) targets input

// app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log(req.file)
//   res.send({name: req.file.originalname, size: req.file.size, type: req.file.mimetype})
// })

// for handling errors we can use this:

upload = multer().single('upfile')

app.post('/api/fileanalyse', function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer error: ", err)
      // A Multer error occurred when uploading.
    } else if (err) {
      console.log("Unknown error: ", err)
      // An unknown error occurred when uploading.
    }
    console.log(req.file)
    res.send({ name: req.file.originalname, size: req.file.size, type: req.file.mimetype })
    // Everything went fine.
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
