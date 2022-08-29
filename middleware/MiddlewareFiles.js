import { Files } from './../db/DAOs/files/filesDaoFiles.js'

let instance = null;

export class MiddlewareFiles {

    constructor() {
        this.avatar = new Files('public/uploads/avatar', 'img')
    }
    static get getMiddleware() {
        if (!instance) instance = new MiddlewareFiles();
        return instance
    }

}
