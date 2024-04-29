import conf  from '../conf.js';
// step   1 importing all appwrite  envirment variabl form file  name conf
import {Client,Account,ID} from "appwrite"
// step 2   importing all 

// step 3 creating a  class whhich will  provide all  services as method 
export class AuthService {

    client =new Client();
    account;
    // A constructor is a special member function of a class that is called whenever an object of that class is created
    // so  we have created  constructor 
    constructor(){
        this.client
           .setEndpoint(conf.appWriteUrl) 
           .setProject(conf.appWriteProjectId);
        this.account = new Account  (this.client);        
                    
    }
    // we have use the async so  after the  acount created then this servoce will accessable 
    // we will cretae  another method 
    async createAccount ({email,password,name}){
        try{
            const userAccount= await this.account.create(ID.unique(),email,password,name);
            
            if (userAccount){
                //call another method 
                return this.login({email,password})

            }else{
                return userAccount;
            }
        }catch (error){
            
            throw error;
            

        }
    }

    async login({email,password}){
        try{
            return  await this.account.createEmailPasswordSession()

        }catch(error){
            throw error;
        }

    }

    async getCurrentUser(){
         try{
            return await this.account.get()
         }
         catch(error){
            console.log("Appwrite service:: getCurrentUser::error",error);

         }
         return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions('current');

        } catch (error) {
            console.log("Appwrite service:: logout::error",error);

            
        }
    }
}

const authService =new AuthService();
// Here   i have created a  authService name  object and import it  so in anothe place the  it will eaiser to use the method   object.methodname 
export default authService