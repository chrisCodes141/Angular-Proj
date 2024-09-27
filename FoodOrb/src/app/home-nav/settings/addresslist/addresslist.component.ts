import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, AlertService } from 'src/app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css']
})
export class AddresslistComponent implements OnInit {
  addressForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  addressList:any[]=[];
  enterAddressArea=true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get f(){return this.addressForm.controls;}

  addAddress(){
    if (this.addressForm.invalid) {
      this.enterAddressArea = true;
      return;
    }
    this.enterAddressArea = false;
    this.addressList.push({
      name: this.f.name.value, address: this.f.address.value
    })
    this.f.name.reset();
    this.f.name.markAsPristine();
    this.f.address.reset();
    this.f.address.markAsPristine();
  }

  deleteAddress(index:number){
    this.addressList.splice(index,1);
    if(this.addressList.length==0){
      this.enterAddressArea=true;
      this.f.name.reset();
      this.f.name.markAsPristine();
      this.f.address.reset();
      this.f.address.markAsPristine();
    }
  }

  toggleAddress(){
    this.enterAddressArea=true;
  }

  editAddress(index:number){
    this.f.name.setValue(this.addressList[index].name);
    this.f.address.setValue(this.addressList[index].address);
    this.enterAddressArea=true;
    this.deleteAddress(index);
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.addressForm.invalid) {
      return;
    }

    this.loading = true;
  }
}
