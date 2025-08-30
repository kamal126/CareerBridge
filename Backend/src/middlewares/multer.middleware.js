import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
    // specify the destination directory for uploaded files
    destination: function(req, file, cb){    // cb -> callback function
        cb(null, "public/temp") 
    },
    // specify the filename for the uploaded files
    filename: function(req, file, cb){
        cb(null,Date.now() +"-" + file.originalname)
    }
});

export const upload = multer({ storage });