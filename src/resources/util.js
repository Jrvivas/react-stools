export default class Format{
    static isCel(text){
        if(text.length>6){
            return true
        }else{
            return false
        }
    }

    static isDir(text){
        if(text.length>6){
            return true
        }else{
            return false
        }
    }
    static isEmail(text){
        if(text.length>6 && text.indexOf('@')>-1 && text.indexOf('.')>-1){
            return true
        }else{
            return false
        }
    }
}