import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JudgeService {
  public API = '//localhost:8080';
  public JUDGE_API = this.API + '/judges';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.JUDGE_API);
  }

  get(id: string) {
    return this.http.get(this.JUDGE_API + '/' + id);
  }

  save(judge: any): Observable<any> {
    let result: Observable<Object>;
    if (judge.id !== undefined) {
      result = this.http.put(this.JUDGE_API + '/' + judge.id, judge);
    } else {
      result = this.http.post(this.JUDGE_API, judge);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(this.JUDGE_API + '/' + href);
  }

  search(searchTerm: string) {
    return this.http.get(this.JUDGE_API + '/search?searchTerm=' + searchTerm);
  }

}
