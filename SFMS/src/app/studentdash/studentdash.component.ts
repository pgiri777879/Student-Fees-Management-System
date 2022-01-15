import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { studentdashModel } from '../studentdata/studentdash.model';
import { ApiService } from '../studentdata/api.service';

@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {
formValue !:FormGroup;
studentModelObj: studentdashModel= new studentdashModel();
studentAll:any;
showAdd !:boolean;
showUpdate !:boolean;

  constructor(private formbuilder : FormBuilder, public api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      mobile:[''],
      fees:['']

    })
    this.getAllstudent();
  }

  clickAddStudent(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postStudentDetails(){
  this.studentModelObj.firstname=this.formValue.value.firstname;
  this.studentModelObj.lastname=this.formValue.value.lastname;
  this.studentModelObj.email=this.formValue.value.email;
  this.studentModelObj.mobile=this.formValue.value.mobile;
  this.studentModelObj.fees=this.formValue.value.fees;

  this.api.postStudent(this.studentModelObj).subscribe(res=>{
    console.log(res);
    alert("student record succesfully");
    this.formValue.reset();
  },
  err=>{
    alert("something went wrong");
  })
 }

getAllstudent(){
  this.api.getStudent(this.studentModelObj).subscribe(res=>{
    this.studentAll=res;
  })
}

deleteStudents(data1:any){
  this.api.deletetStudent(data1.id).subscribe(res=>{
    alert("Record Deleted succesfully");
    this.getAllstudent();
  })
}

onEdit(data:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.studentModelObj.id=data.id;
  this.formValue.controls['firstname'].setValue(data.firstname);
  this.formValue.controls['lastname'].setValue(data.lastname);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['fees'].setValue(data.fees);
}

updateStudentDetails(){
  this.studentModelObj.firstname=this.formValue.value.firstname; 
  this.studentModelObj.lastname=this.formValue.value.lastname;
  this.studentModelObj.email=this.formValue.value.email;
  this.studentModelObj.mobile=this.formValue.value.mobile;
  this.studentModelObj.fees=this.formValue.value.fees;

  this.api.updateStudent(this.studentModelObj,this.studentModelObj.id).subscribe(res=>{
    alert("Record updated succesfully");
    this.formValue.reset();
    this.getAllstudent();
  })
}

}
