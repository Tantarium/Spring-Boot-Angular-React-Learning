import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { JudgeService } from "../shared/judge/judge.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-judge-search',
  templateUrl: './judge-search.component.html',
  styleUrls: ['./judge-search.component.css']
})
export class JudgeSearchComponent implements OnInit {
  judges: any;
  searchTerm: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private judgeService: JudgeService) { }

  ngOnInit() { }

  search(form: NgForm) {
    let searchText;
    for (let key in form) {
      searchText = form[key]
    }
    this.judgeService.search(searchText).subscribe(result => {
      this.judges = result;
    })
  }

}
