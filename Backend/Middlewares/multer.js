const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null, "profilephotos");
    },
    filename: function (req, file, cb){
        const ext = file.mimetype.split("/")[1];
        cb(
            null,
            `${Date.now()}${path.extname(file.originalname)}.${ext}`
        );
    },
})

const upload = multer({ storage: storage});

module.exports = upload;