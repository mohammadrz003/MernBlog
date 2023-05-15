import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploadPicture = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1000000 //1MB (1 REFERS TO THE 1 MB)
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('Only Images are allowed'))
        }
        cb(null, true)

    }
})

export {uploadPicture}