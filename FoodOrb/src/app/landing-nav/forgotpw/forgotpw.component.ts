import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AuthenticationService, AlertService } from 'src/app/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {return this.forgotPasswordForm.controls;}

  onSubmit(){
    this.submitted = true;

    if (this.forgotPasswordForm.invalid){return;}

    this.loading=true;
    this.authenticationService.validateEmail(this.f.email.value)
    .pipe(first())
    .subscribe(
      data => {
        this.alertService.success('Email valid, a password reset link has been sent to your email');
        this.loading=false;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
