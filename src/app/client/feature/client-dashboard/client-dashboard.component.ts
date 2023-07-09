import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FreelancerModalComponent } from '../../ui/freelancer-modal/freelancer-modal.component';
import {
  FreelancerService,
  Freelancers,
} from '../../data access/freelancer.service';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../../data access/auth.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements OnInit {
  constructor(
    private dialogRef: MatDialog,
    private freelancerService: FreelancerService,
    private authService: AuthService
  ) {}

  users = [
    {
      id: 1,
      username: 'nazri ghazi',
      email: 'nazrighazi01@gmail.com',
      phoneNum: '0167554535',
      hobby: 'mancing',
      skillSets: [{ skill: 'angular' }, { skill: 'nodejs' }],
    },
    {
      id: 2,
      username: 'nazri ghazi 2',
      email: 'nazrighazi02@gmail.com',
      phoneNum: '0192954535',
      hobby: 'main game',
      skillSets: [{ skill: 'react' }, { skill: 'javascript' }],
    },
    {
      id: 3,
      username: 'nazri ghazi 3',
      email: 'nazrighazi03@gmail.com',
      phoneNum: '0137627738',
      hobby: 'tidur',
      skillSets: [{ skill: 'vuejs' }],
    },
  ];

  FreelancersList$!: Observable<Freelancers[]>;
  error: Error | null = null;
  woof: any = '';

  ngOnInit(): void {
    this.getFreelancersList();
  }

  getFreelancersList() {
    console.log('masuk');
    this.FreelancersList$ = this.freelancerService.getFreelancersList().pipe(
      map((item) => {
        console.log(item);
        return item;
      }),
      tap({
        error(err: any) {
          // this.woof = err;
        },
      }),
      catchError((err) => {
        return of([]);
      })
    );
  }

  createUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    let dialog = this.dialogRef.open(FreelancerModalComponent, dialogConfig);
    dialog.afterClosed().subscribe((res: string) => {
      if (res.toLowerCase() == 'complete') {
        this.getFreelancersList();
      }
    });
  }

  editUser(user: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { ...user, title: 'Edit Freelancer' };
    let dialog = this.dialogRef.open(FreelancerModalComponent, dialogConfig);
    dialog.afterClosed().subscribe((res: string) => {
      if (res.toLowerCase() == 'complete') {
        this.getFreelancersList();
      }
    });
  }

  removeUser(userId: string | undefined) {
    if (confirm('Are you sure you want to delete the user?')) {
      // this.users = this.users.filter((item) => item.id !== userId);
      this.freelancerService.removeFreelancer(userId).subscribe((res) => {
        this.getFreelancersList();
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
