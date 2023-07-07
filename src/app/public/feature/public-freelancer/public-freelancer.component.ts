import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../../data access/public.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Freelancers } from 'src/app/client/data access/freelancer.service';

@Component({
  selector: 'app-public-freelancer',
  templateUrl: './public-freelancer.component.html',
  styleUrls: ['./public-freelancer.component.scss'],
})
export class PublicFreelancerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private publicService: PublicService
  ) {}

  freelancer$ = new Observable<Freelancers>();

  ngOnInit(): void {
    this.loadFreelancer(this.route.snapshot.paramMap.get('id'));
  }

  loadFreelancer(id: string | null) {
    this.freelancer$ = this.publicService.getSpecificFreelancer(id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
