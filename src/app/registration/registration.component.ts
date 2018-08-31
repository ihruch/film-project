import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MessagesService } from './../shared/services/messages.service';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup;
  maskEmail = '[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}';
  editInProgress = false;

  formErrors = {
    logField: '',
    passField: '',
    emailField: ''
  };
  validationMessages = {
    logField: {
      required: 'поле не может быть пустым.',
      minlength: 'Значение должно быть не менее 5 символов.',
      maxlength: 'Значение не должно быть больше 20 символов.'
    },
    passField: {
      required: 'поле не может быть пустым.',
      minlength: 'Значение должно быть не менее 5 символов.',
      maxlength: 'Значение не должно быть больше 20 символов.'
    },
    emailField: {
      required: 'поле не может быть пустым.',
      pattern: 'Не корректно email адрес.'
    }
  };

  // «поле не может быть пустым», «не соответствует длинна», «неверный формат».
  // «поле не может быть пустым», «не соответствует длинна», «неверный формат».
  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  // работы с формой
  buildForm() {
    this.regForm = this.fb.group({
      logField: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(20)]
      ],
      passField: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(20)]
      ],
      emailField: [
        '',
        [Validators.required, Validators.pattern(this.maskEmail)]
      ]
    });
    this.regForm.valueChanges.subscribe(data => {
      this.onValueChange();
      if (this.regForm.touched || this.regForm.dirty) {
        this.editInProgress = true;
      }
    });
  }

  submitForm(): void {
    this.editInProgress = false;
    // const credentials = this.regForm.value;
    // if (this.regForm.valid) {
    //   this.regForm.reset();
    //   this.authService
    //     .login(credentials.logField, credentials.passField)
    //     .subscribe(
    //       () => {
    //         this.msgService.setMessage({
    //           type: 'success',
    //           body: `Добро пожаловать  ${
    //             credentials.logField
    //           }.  Вы успешно вошли в систему.`
    //         });
    //         setTimeout(() => {
    //           this.router.navigate(['/main']);
    //           this.editInProgress = false;
    //         }, 2000);
    //       },
    //       err => {}
    //     );
    // }
  }

  onValueChange() {
    for (let item in this.formErrors) {
      this.formErrors[item] = '';
      let control = this.regForm.get(item);

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[item];
        for (let key in control.errors) {
          this.formErrors[item] += message[key] + ' ';
        }
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
