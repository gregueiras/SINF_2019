import axios from 'axios';
import Login from '../components/Login/Login';

export default class UserService {

    constructor() {
        this.basePath ="/";
    }


    /*login(data,callback){
        axios.post(`/login`,{
            username: data.username,
            password: data.password,
        }).then(response =>{
            callback(response);

        }).catch(error=>{
                callback(error);

        });*/

    }

}
