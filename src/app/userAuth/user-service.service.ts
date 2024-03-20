import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { login } from '../login/login/login';
import * as jwt from 'jsonwebtoken';
import { Users } from '../model/users';
import { Role } from '../model/role';

const BASE_URL=['http://localhost:8080'];
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private tokenKey='token';
  
  // private clesecret='fabodaysh1445sqkjhsqhsgyuqguza213598qsqkjbhsijnklhkqsjgjqkjshdjgjqhsvbkj89489qsjhbqshjqjsjhqbqvsbhskjxb';

  private jsonString: string=''
   private  token :string='';
  private tokenRole:string='';
  private  formattedDate='';
  private IsLoginVer:boolean=false;
  constructor(private http: HttpClient) { }



  // signupService(obj:any):Observable<any>{

  //   return this.http.post(BASE_URL+"/user/signup",obj);
  // }

  // loginService(obj:any):Observable<any>{

  //   return this.http.post(BASE_URL+"/user/login",obj);
  // }

  IsLoginUser():boolean{
    
    return this.IsLoginVer;

  }

  loginSer(obj:any):Observable<any>{

    return this.http.post<login>(BASE_URL+"/auth/login",obj).pipe(
      map(response=>{
         this.token=response.token as string;
        this.jsonString=this.decodeToken(this.token)
        console.log(JSON.stringify(this.decodeToken(this.token).iat))
        console.log(JSON.stringify(this.decodeToken(this.token).role))
        console.log(this.jsonString)
        // this.tokenRole=this.decodeToken(token).role

        // console.log(this.getExpirationDate())
        // console.log(this.getRole())
        if( this.token)
        {
          // console.log( this.token);
          // this.decryptToken(token)
          this.storeToken(this.token);
          this.IsLoginVer=true
          return this.jsonString;
        }
        this.IsLoginVer=false
        return false;
      })
    );
  }
  // //fonction pour stoker le token
  storeToken(token:string):void{

    localStorage.setItem(this.tokenKey,token);
  }
  //fonction pour supprimer le token
  removeToken(token:string|null):void{
    // const tokenIns = localStorage.getItem(token!);
    // console.log("dsdsdsdOllo:"+tokenIns)
    localStorage.removeItem(token!);
    const tokenIn = localStorage.getItem(token!);
    console.log("remove : "+tokenIn)
  }
  // isTokenExpired(token:string):boolean{

  //   return false;
  // }

  isLoggedInte():boolean{

    const token = localStorage.getItem(this.tokenKey);
    console.log("tokenAng :"+token)

    return token!=null;
  }

  // // decryptToken(token:string):any{

  // //   try {
  // //     const decodedToken=jwt.decode(token);
  // //     // console.log(decodedToken);
  // //     return token;
      
  // //   } catch (error) {
  // //     return null;
      
  // //   }
  // // }


  decodeToken(token: string){
    const base64Url=token.split('.')[1];
    const base64=base64Url.replace(/-/g, '*').replace(/_/g, '/');
    const jsonPayload=decodeURIComponent(
      atob(base64).split('').map((c)=>{
        return '%' + ('00'+c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    ) ;

    return JSON.parse(jsonPayload)
  }


  // //Recuperer role
  getRole(){
    
    return this.decodeToken( this.token).role
  }

  // //recuperer date expiration

  getExpirationDate(){
    const token:string|null = localStorage.getItem(this.tokenKey)
    console.log(this.decodeToken(token!).exp*1000)
    const date = new Date(this.decodeToken(token!).exp*1000);
    const year=date.getFullYear();
    const month=date.getMonth()+1;
    const day=date.getDate();

    const hours=date.getHours();
    const minutes=date.getMinutes();
    const seconds=date.getSeconds();

     this.formattedDate=`${day}/${month}/${year} : ${hours}/${minutes}/${seconds}`

    return  `${day}/${month}/${year} : ${hours}/${minutes}/${seconds}`
  }

  // //

  DateExpiration():boolean{

    const datenow = new Date();
    const year=datenow.getFullYear();
    const month=datenow.getMonth()+1;
    const day=datenow.getDate();

    const hours=datenow.getHours();
    const minutes=datenow.getMinutes();
    const seconds=datenow.getSeconds();


    const formattedDatenow=`${day}/${month}/${year} : ${hours}/${minutes}/${seconds}`

    console.log(formattedDatenow+"  cssdsd   "+this.getExpirationDate())
    // if(this.DateExpiration()){
      // this.IsLoginVer=false;
    // }
    return formattedDatenow<=this.getExpirationDate();

  }
  

  //projet perso
  public adduser(users:Users){

    console.log(users.dateNais)
     return this.http.post<Users>(BASE_URL+"/users/adduser",users);

  }

  public roleUser(){
    return this.http.get<Role[]>(BASE_URL+"/users/roleUser")
  }
    
}
