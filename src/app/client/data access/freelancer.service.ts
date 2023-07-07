import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Freelancers {
  id?: string;
  username: string;
  name: string;
  email: string;
  hobby: string;
  phoneNum: string;
  skillSets: skillSet[];
}

interface skillSet {
  id?: string;
  title: string;
  userId?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
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

  createFreelancer(form: any) {
    const reqBody: Freelancers = {
      name: form.name,
      username: form.username,
      phoneNum: form.phoneNum.toString(),
      hobby: form.hobby,
      email: form.email,
      skillSets: form.skillSets,
    };
    return this.http.post<Freelancers[]>(
      environment.API_URL + 'freelancer',
      reqBody
    );
  }

  updateFreelancer(userId: string, form: any) {
    const reqBody: Freelancers = {
      name: form.name,
      username: form.username,
      phoneNum: form.phoneNum.toString(),
      hobby: form.hobby,
      email: form.email,
      skillSets: form.skillSets,
    };

    return this.http.patch<Freelancers[]>(
      environment.API_URL + `freelancer/${userId}`,
      reqBody
    );
  }

  removeFreelancer(userId: string | undefined) {
    return this.http.delete(environment.API_URL + `freelancer/${userId}`);
  }
}
