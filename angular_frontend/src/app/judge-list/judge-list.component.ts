import { Component, OnInit } from '@angular/core';
import { JudgeService } from '../shared/judge/judge.service';

@Component({
  selector: 'app-judge-list',
  templateUrl: './judge-list.component.html',
  styleUrls: ['./judge-list.component.css']
})
export class JudgeListComponent implements OnInit {
  judges: Array<any>;

  constructor(private judgeService: JudgeService) { }

  ngOnInit() {
    this.judgeService.getAll().subscribe(data => {
      this.judges = data;
    });
  }

}
