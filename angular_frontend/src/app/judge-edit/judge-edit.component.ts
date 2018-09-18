import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { JudgeService } from "../shared/judge/judge.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-judge-edit',
  templateUrl: './judge-edit.component.html',
  styleUrls: ['./judge-edit.component.css']
})
export class JudgeEditComponent implements OnInit {
  judge: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private judgeService: JudgeService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.judgeService.get(id).subscribe((judge: any) => {
          if (judge) {
            this.judge = judge;
          } else {
            console.log(`Judge with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        })
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/judge-list']);
  }

  save(form: NgForm) {
    this.judgeService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.log(error));
  }

  remove(href) {
    this.judgeService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.log(error));
  }

}
