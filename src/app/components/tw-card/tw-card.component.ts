import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tw-card',
  templateUrl: './tw-card.component.html',
  styleUrls: ['./tw-card.component.css']
})
export class TwCardComponent implements OnInit {
  @Input() tweet;
  public readonly twitterURL = 'http://twitter.com/';
  public twitterUserURL: string;
  public twitterUserPostURL: string;
  constructor() { }

  ngOnInit() {
    this.twitterUserURL = `${this.twitterURL}${this.tweet.user.screen_name}`;
    this.twitterUserPostURL = `${this.twitterUserURL}/status/${this.tweet.id_str}`;
  }

}
