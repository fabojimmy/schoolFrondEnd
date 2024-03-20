import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/userAuth/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginFrom:FormGroup | undefined |any;
  public message:string ="";


  constructor(private user:UserServiceService,
              private fb: FormBuilder ,
              private route:Router        
    ){  
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.loginFrom=this.fb.group({
        email:["",Validators.required],
        password:["",Validators.required]

      })
    }

    login(){

      const email = this.loginFrom.get('email').value;
      const password = this.loginFrom.get('password').value;

      if(email && password)
      {

          this.user.loginSer(this.loginFrom.value).subscribe((response)=>{
            console.log(response)
            this.loginFrom.reset();
            this.message = 'Connection reussi';
            setTimeout(() => {
              this.message = '';
              if(response.role.toLowerCase()==='role_apprenant')
              {

                this.route.navigate(['/dashboard']);
              }
              else{
                this.message = 'Vous avez pas accès à cette interface';
              }
            }, 5000); 
          },
          (error) => {
            console.error(error);
            this.message = 'Données erronée';
            // Réinitialiser les valeurs des champs
            this.loginFrom.reset();
          })
        }
        else
        {
          alert("error");
        }
      }
}
