import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  firstNameLength = 0;


  validationMessages = {
    'firstName': {
      'required': 'First Name is required.',
      'minlength': 'First name must be greater than 2 characters.',
      'maxlength': 'First name should not be exceed 10 characters.'
    },
    'lastName': {     
      'minlength': 'Last name must be greater than 2 characters.'      
    },
    'address': {
      'required': 'Address is required'
    },
    'phone': {
      'required': 'Phone number is required'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be gmail.com'
    },
    'userName': {
      'required': 'User Name is required'
    },
    'password': {
      'required': 'Password is required'
    },
    'skillName': {
      'required': 'Skill Name is required.'
    },
    'experienceInYears': {
      'required': 'Experience is required.'
    },
    'proficiency': {
      'required': 'Proficiency is required.'
    },
    'captcha': {
      'required': 'Captcha is required.'
    },
    'terms': {
      'required': 'Terms is required.'
    }

  };
  formErrors = {
    'firstName': '',
    'lastName': '',
    'address': '',
    'phone': '',
    'email': '',
    'userName': '',
    'password': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': '',
    'captcha': '',
    'terms': ''
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    /* this.registrationForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      address: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      captcha: new FormControl(),
      terms: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    }) */

    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName: ['', Validators.minLength(2)],
      address: ['', Validators.required],
      contactPreference: ['email'],
      phone: [''],
      email: ['', [Validators.required, emailDomain]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
      terms: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });

   /*  this.registrationForm.get('firstName').valueChanges.subscribe((value: string) => {
      this.firstNameLength = value.length;
    }) */

    this.registrationForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    })

    this.registrationForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.registrationForm);
    })
  }
  

  logValidationErrors(group: FormGroup = this.registrationForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
            && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  onContactPreferenceChange(selectedValue: string){
    const phoneControl = this.registrationForm.get('phone');
    if(selectedValue === 'phone'){
      phoneControl.setValidators(Validators.required)
    }else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  onLoadDataClick(): void{
    /* this.registrationForm.setValue({
      firstName: 'SangeethaShan',
      lastName: 'Selvaraj',
      address: 'Bedok South',
      phone: '9095983456',
      email: 'deepa@gmail.com',
      userName: 'Sangee',
      password: 'sangee12' ,
      captcha: '20',
      terms: true,
      skills: {
        skillName: 'Angular',
        experienceInYears: '1.5' ,
        proficiency: 'intermediate'
      }
    }) */
   /*  this.logValidationErrors(this.registrationForm); */
  }

  onSubmit(): void{
  console.log(this.registrationForm.value);
  console.log(this.registrationForm.touched);

  console.log(this.registrationForm.controls.firstName.touched);
  console.log(this.registrationForm.get('firstName').value);
  }


}
function emailDomain(control: AbstractControl): {[key: string] : any} | null{
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@')+1);
  if(email === '' || domain.toLowerCase() === 'gmail.com'){
    return null;
  }else{
    return {'emailDomain': true}
  }
}
