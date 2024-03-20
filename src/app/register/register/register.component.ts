import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/userAuth/user-service.service';
import { Users } from 'src/app/model/users';
import { Role } from 'src/app/model/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public successMessage: string='';
  public signupFrom :FormGroup | undefined |any;
  public dateString :string='';
  public formattedDate:string='';
  public ObjecUser:Users | undefined;
  public optionRole:Role | any;

  constructor(
              private uservice : UserServiceService,
              private fb:FormBuilder,
              private toastr: ToastrService){
              }
              
              ngOnInit(): void {
                // this.isButtonClicked = true;
                // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
                // Add 'implements OnInit' to the class.
                
                // if (this.isButtonClicked==true) {
                  
                //   console.log("ffff")
                // }

          this.signupFrom=this.fb.group({
              firstname: ['',Validators.required],
              dateNais: ['',Validators.required],
              number: ['',Validators.required],
              matricule: ['',Validators.required],
              lastname: ['',Validators.required],
              email: ['',Validators.required, Validators.email],
              password: ['',Validators.required],
              role_id: ['',Validators.required],
              // confirmPassword: ['',Validators.required],
          })

          this.uservice.roleUser().subscribe((date:Role[])=>{

            this.processData(date)

          });
  }

    private passwordMatchValidator(formGroup: FormGroup): void{
      const password=formGroup.get('password')?.value;
      const confirmPassword=formGroup.get('confirmPassword')?.value;
      if(confirmPassword!=password)
      {
      formGroup.get("confirmPassword")?.setErrors({passwordMismatch:true})
      }else
      {
      formGroup.get("confirmPassword")?.setErrors(null)
      }
    }

    adduser(){
    // console.log(this.signupFrom?.valid)
    // const name = this.signupFrom.get('name').value;
    // const contactNumber = this.signupFrom.get('contactNumber').value;
    // const role = this.signupFrom.get('role').value;
    // const email = this.signupFrom.get('email').value;
    // const password = this.signupFrom.get('password').value;
    // if(name && contactNumber && role && email && password)
    // {

    //   this.uservice.signupService(this.signupFrom.value).subscribe((response)=>{
    //     console.log(response)
    //     this.signupFrom.reset();
    //     // this.toastr.success('Enregistrement réussi.', 'Succès', {
    //     //   timeOut: 3000, // Durée d'affichage de la notification en millisecondes
    //     //   progressBar: true, // Afficher la barre de progression
    //     //   progressAnimation: 'increasing', // Animation de la barre de progression
    //     //   closeButton: true, // Afficher le bouton de fermeture
    //     //   positionClass: 'toast-top-center', // Position en haut
    //     //   toastClass: 'toast-background-color' // Classe CSS pour personnaliser la couleur de fond
    //     // });
    //     this.successMessage = 'Enregistrement réussi.';
    // // Effacer le message de réussite après quelques secondes (si nécessaire)
    //     setTimeout(() => {
    //       this.successMessage = '';
    //     }, 3000); 
    //   },
    //   (error) => {
    //     console.error(error);
    //     // Réinitialiser les valeurs des champs
    //     this.signupFrom.reset();
    //   });
    // }else
    // {
    //   alert("Rempliez vos cases")
    //   this.signupFrom.reset();
    // }
    console.log(this.signupFrom.value)
    this.uservice.adduser(this.signupFrom.value).subscribe((userResp:any)=>{
        alert(userResp.message)
        this.signupFrom.reset()
    },(error)=>{
       alert(error.error.message)


       this.signupFrom.reset()
    });

  }

  formatDate():void{
    const dateParts=this.dateString.split('-');
    const year=dateParts[0];
    const month=dateParts[1];
    const day=dateParts[2];

    this.formattedDate=`${day}/${month}/${year}`
  }

  processData(data:Role[]){

    this.optionRole=data;
  }
}

