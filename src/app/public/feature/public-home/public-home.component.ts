import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Freelancers } from 'src/app/client/data access/freelancer.service';
import { PublicService } from '../../data access/public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss'],
})
export class PublicHomeComponent implements OnInit {
  freelancersList$ = new Observable<Freelancers[]>();
  error: Error | null = null;

  constructor(private publicService: PublicService, private route: Router) {}

  ngOnInit(): void {
    this.loadFreelancersList();
  }

  loadFreelancersList() {
    this.freelancersList$ = this.publicService.getFreelancersList().pipe(
      catchError((err) => {
        this.error = err;
        return throwError(() => err);
      })
    );
  }

  navigateToFreelancer(userId: string | undefined) {
    this.route.navigate([`freelancer/${userId}`]);
  }
}
