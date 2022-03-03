import { post} from "./HTTPService";

export class EntityService{
    static getEntiryList = (queryData={},config={}) => {
        // API URL = /authentications/user/login/ will chnage accordingly
        return post("/authentications/user/login/",queryData,config);
    }
    // queryData = body 
    static getEntiry = (queryData={},config={},param={id:"",}) => {
        return post(`/authentications/user/login/${param.configid}`,queryData,config);
    }
} 