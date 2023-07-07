import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Freelancers } from 'src/app/client/data access/freelancer.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  constructor(private http: HttpClient) {}

  getFreelancersList() {
    return this.http
      .get<Freelancers[]>(environment.API_URL + 'freelancer/all')
      .pipe(
        catchError((err) => {
          throw new Error('Cannot load data');
        })
      );
  }

  getSpecificFreelancer(id: string | null) {
    return this.http
      .get<Freelancers>(environment.API_URL + `freelancer/${id}`)
      .pipe(
        catchError((err) => {
          throw new Error('Cannot load data');
        })
      );
  }
}
