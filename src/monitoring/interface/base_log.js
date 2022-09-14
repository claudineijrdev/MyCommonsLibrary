module.exports = class BaseLog {
    async log(args){
        throw new Error("Not implemented");
    }
    async error(args){
        throw new Error("Not implemented");
    }
    async warn(args){ 
        throw new Error("Not implemented");
    }
    async info(args){
        throw new Error("Not implemented");
    }
}