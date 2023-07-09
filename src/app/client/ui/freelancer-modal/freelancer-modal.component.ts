import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FreelancerService } from '../../data access/freelancer.service';
import { DigitOnlyDirective } from '../../util/numbers-only.directive';

@Component({
  selector: 'app-freelancer-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DigitOnlyDirective],
  templateUrl: './freelancer-modal.component.html',
  styleUrls: ['./freelancer-modal.component.scss'],
})
export class FreelancerModalComponent implements OnInit {
  inputData:
    | {
        id: string;
        name: string;
        username: string;
        email: string;
        phoneNum: string;
        hobby: string;
        title: string;
        skillSets: [{ title: string }];
      }
    | undefined;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNum: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    hobby: new FormControl('', [Validators.required]),
    skillSets: new FormArray([
      new FormGroup({
        title: new FormControl('', Validators.required),
      }),
    ]),
  });

  constructor(
    private dialogRef: MatDialogRef<FreelancerModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data:
      | {
          id: string;
          name: string;
          username: string;
          email: string;
          phoneNum: string;
          hobby: string;
          skillSets: [{ title: string }];
          title: string;
        }
      | undefined,
    private freelancerService: FreelancerService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    if (!!this.inputData) {
      this.removeSkillSet(0);
      this.populateForm(this.inputData);
    }
  }

  onSubmit() {
    console.log('woof', this.inputData);
    if (!this.inputData) {
      this.freelancerService
        .createFreelancer(this.userForm.value)
        .subscribe((res) => {
          this.onClose('complete');
        });
    } else {
      this.freelancerService
        .updateFreelancer(this.inputData.id, this.userForm.value)
        .subscribe((res) => {
          this.onClose('complete');
        });
    }
  }

  onClose(status: string = 'close') {
    this.dialogRef.close(status);
  }

  addSkillSet() {
    const input = <FormArray>this.userForm.controls['skillSets'];
    input.push(
      new FormGroup({
        title: new FormControl('', Validators.required),
      })
    );
  }

  removeSkillSet(index: number) {
    const input = <FormArray>this.userForm.controls['skillSets'];
    input.removeAt(index);
  }

  get skillSets() {
    return this.userForm.controls['skillSets'] as FormArray;
  }

  populateForm({
    id,
    name,
    username,
    email,
    phoneNum,
    hobby,
    skillSets,
  }: {
    id?: string;
    name: string;
    username: string;
    email: string;
    phoneNum: string;
    skillSets: any;
    hobby: string;
    title: string;
  }) {
    skillSets.map((skillSet: any) => {
      console.log(skillSet);
      const actorsForm = new FormGroup({
        title: new FormControl(skillSet.title),
        id: new FormControl(skillSet.id),
        status: new FormControl(''),
      });

      console.log('actf', actorsForm);
      console.log('b4 save', this.skillSets);
      this.skillSets.push(actorsForm);
      console.log('save', this.skillSets);
    });

    this.userForm.patchValue({
      name,
      username,
      email,
      phoneNum: phoneNum,
      hobby,
    });
    console.log(this.userForm.value);
  }
}
