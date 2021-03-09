import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DbService} from '../services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  exampleForm: FormGroup; 

  constructor(
    public db: DbService, 
    private fb: FormBuilder,
    private router: Router
  ) { }

   validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'cell': [
      { type: 'required', message: 'Cellphone number is required.' },
      { type: 'pattern', message: 'Enter a valid phone number'}
    ],
    'message': [
      { type: 'required', message: 'Message is required.' },
    ]
  };

  ngOnInit(): void {
     this.createForm(); 
  }
 
 createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      cell: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      message: ['', Validators.required ]
    });
  }

  resetFields() {
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      cell: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      message: new FormControl('', Validators.required)
    });
  }

   
onSubmit(value:any) {
  this.db.createQuery(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
