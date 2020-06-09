
var express = require('express')
var bodyParser = require ('body-parser')



var fs = require ('fs')
var multer = require('multer');

const port = process.env.PORT || 3000
const app = express ();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({ storage: storage })


app.post ("/upload",  (req, res)=>{


    console.log (JSON.stringify (req.body.file))
    console.log (JSON.stringify (req.file))

    const content = fs.readFileSync(req.body.file, 'utf8');
    console.log(content);

    res.send (content)
    

})


app.listen (port, ()=>{
    
    console.log ('Server is up on port ' + port)
})