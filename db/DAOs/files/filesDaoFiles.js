import multer from 'multer'
import fs from 'fs'

export class Files {

    constructor(path, tag) {

        this.path = path

        this.storage = multer.diskStorage({
            destination: this.path,
            filename: async (req, file, cb) => {
                cb(null, file.originalname)
            }
        })

        this.upload = multer({
            storage: this.storage,
            fileFilter: (req, file, cb) => {

                fs.readdir(this.path, async (err, files) => {

                    for (let x of files) {
                        if (x === file.originalname) {
                            cb(null, false)
                            return
                        }
                    }
                    cb(null, true)
                })
            }
        }).single(tag)
    }
}