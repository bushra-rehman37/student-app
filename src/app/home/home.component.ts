import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { NotificationService } from '../notification.service'
import { FormGroup, FormBuilder, Validators , FormControl} from '@angular/forms';
type selectedStudentType = {
  id?:any,
  sname?:any,
  fname?:any,
  age?:any,
  address?:any,
  email?:any,
  phone?:any,
  gender?:any,
  photo?:any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  id=''
  sname=''
  fname=''
  age=''
  address=''
  email=''
  phone=''
  gender=''
  photo=''

  constructor(private router: Router, private readonly sanitizer: DomSanitizer,  private notifyService: NotificationService, private formBuilder: FormBuilder) { }

  students=[
    { id: 'admin', sname: 'admin',fname:'admin@admin.com', age:'12',address: 'admin', email: 'admin@admin.com',phone:'+921234567', gender:'male',photo:'12345' },
  ]
  public get safeUrlPic(): SafeUrl { return this.sanitizer.bypassSecurityTrustResourceUrl(this.photo); }
 
  addstudent(){
    for(let i =0;i <this.students.length;i++){
      if(this.id==this.students[i].id){
        this.showError();
        //user id already exists
        console.log('user id already exists')
        return;
      }

     
    }
  this.students.push({
    id: this.id, sname: this.sname, fname: this.fname, age: this.age,
    address: this.address,
    email: this.email,
    phone: this.phone,
    gender:this.gender,
    photo: this.photo,

    
  })
  this.id=''
  this.sname=''
  this.fname=''
  this.age=''
  this.address=''
  this.email=''
  this.phone=''
  this.gender=''
  this.photo=''

  console.log(this.students)

  
  this.dataSubmitted();

  }
  display = "none";
  edit="none"
  selectedStudent:selectedStudentType={};
  openModal(index:number) {
    this.selectedStudent=this.students[index]
    this.display = "block";
  }
  RemoveItem(index: any){
    this.students.splice(index,1)
  }
  onCloseHandled() {
    this.display = "none";
    this.selectedStudent={}
  }
  openEditModal(index:number) {
    this.selectedStudent=this.students[index]
    console.log(this.selectedStudent)
    this.edit = "block";
  }
  // fileReader(e:any){
  //   if(e.target.files){
  //     var reader = new FileReader()
  //     reader.readAsDataURL(e.target.files[0])
  //     reader.onload=(event:any)=>{
  //       this.photo=event.target.result
  //     }
  //   }
  // }
  editStudent(id:any){
let updateItem = this.students.find((o, i) => {
  if (o.id === id) {
      this.students[i] = {
        id: this.selectedStudent.id, sname: this.selectedStudent.sname, fname: this.selectedStudent.fname, age: this.selectedStudent.age,
        address: this.selectedStudent.address,
        email: this.selectedStudent.email,
        phone: this.selectedStudent.phone,
        gender:this.selectedStudent.gender,
        photo:'aa'
      }
  }
});
this.edit = "none";
  }
  closeEditModal() {
    this.edit = "none";
    this.selectedStudent={}
  }


  removeUser(index: any){
    this.students.splice(index,1)
  }

  login(){
    this.router.navigateByUrl('login');
  }
  
  showToasterSuccess() {
    this.notifyService.showSuccess("Logged in successfully !!", " Student App ")
  }

  showToasterError() {
    this.notifyService.showError(" Try again ", "Student App")
  }

  showInfo() {
    this.notifyService.showInfo(" Name field required", "Student App")
  }

  dataSubmitted() {
    this.notifyService.showInfo("New student added", "Student App")
  }
  showError() {
    this.notifyService.showError("User ID already exists ", "Student App")
  }

  logout(){
    this.router.navigateByUrl('login');
  }

  form :any

  get f() {
    return this.form.controls;
  }


ngOnInit() {

		this.form = this.formBuilder.group({

      id:  [Validators.required, Validators.minLength(5)],
      sname:  [Validators.required, Validators.minLength(3)],
      email:  [Validators.required, Validators.email],
      phone:  [Validators.required, Validators.minLength(11)],
    
		});
	}

}