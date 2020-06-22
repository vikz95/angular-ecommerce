import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CheckoutFormService} from '../../services/checkout-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  totalPrice = 0.00;
  totalQuantity = 0;

  constructor(private formBuilder: FormBuilder,
              private checkoutFormService: CheckoutFormService) {
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
    // populate credit card years
    this.checkoutFormService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    );
  }

  onSubmit() {

  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onCreditCardYearChange() {
    const selectedYear: number = +this.checkoutFormGroup.get('creditCard').value.expirationYear;
    if (selectedYear !== new Date().getFullYear()) {
      this.checkoutFormService.getCreditCardMonths(1).subscribe(
        data => this.creditCardMonths = data
      );
    } else {
      const startMonth: number = new Date().getMonth() + 1;
      this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
        data => this.creditCardMonths = data
      );
    }
  }
}
