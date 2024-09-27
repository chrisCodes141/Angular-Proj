import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {
  cardForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  cardList:any[]=[];
  enterCardArea=true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      card: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){return this.cardForm.controls;}

  addCard(){
    console.log("reached add card");
    if (this.cardForm.invalid) {
      console.log("reached IF in INValid add card");
      this.enterCardArea= true;
      return;
    }
    console.log("reached Passed IF add card");
    this.enterCardArea= false;
    this.cardList.push({
      card: this.f.card.value,
    })
    this.f.card.reset();
    this.f.card.markAsPristine();
  }

  deleteCard(index:number){
    this.cardList.splice(index,1);
    if(this.cardList.length==0){
      this.enterCardArea=true;
      this.f.card.reset();
      this.f.cardList.markAsPristine();
    }
  }

  toggleCard(){
    this.enterCardArea=true;
  }

  editCard(index:number){
    this.f.card.setValue(this.cardList[index].card);
    this.enterCardArea=true;
    this.deleteCard(index);
  }

  onSubmit() {
    console.log("reached onSubmit")
    this.submitted = true;

    if (this.cardForm.invalid) {
      return;
    }
    this.loading = true;
  }
}
