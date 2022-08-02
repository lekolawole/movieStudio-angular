import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-details-card',
  templateUrl: './movie-details-card.component.html',
  styleUrls: ['./movie-details-card.component.scss']
})
export class MovieDetailsCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
