import axios from 'axios';

export default class UserService {

    constructor() {
        this.basePath ="/";
        this.loginBasePath='http://localhost:3335/login';
        this.registerBasePath='http://localhost:3335/register';
    }


    login(data,callback){
        console.log({data});
        axios.post(`${this.loginBasePath}`,{data}).then(response =>{
            callback(response);

        }).catch(error=>{
                callback(error);

        });
    }
    register(data,callback){
        console.log({data});
        axios.post(`${this.registerBasePath}`,{data}).then(response =>{
            callback(response);

        }).catch(error=>{
                callback(error);

        });
    }

}
