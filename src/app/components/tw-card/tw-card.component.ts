import { User } from './../../store/twitter/twitter.model';
import { Component, OnInit, Input } from '@angular/core';
import { TwitterPosts } from '../../store/twitter/twitter.model';

@Component({
  selector: 'app-tw-card',
  templateUrl: './tw-card.component.html',
  styleUrls: ['./tw-card.component.css']
})
export class TwCardComponent implements OnInit {
  public hasUserMentions: boolean;
  public isRetweeted: boolean;
  @Input() tweet: TwitterPosts;
  public readonly twitterURL = 'https://twitter.com/';
  public retweetedUserURL: string;
  public twitterUserURL: string;
  public twitterUserImgURL: string;
  public twitterUserPostURL: string;
  constructor() { }

  ngOnInit() {
    this.hasUserMentions = this.tweet.entities.user_mentions != null && this.tweet.entities.user_mentions.length > 0;
    this.twitterUserURL = `${this.twitterURL}${this.tweet.user.screen_name}`;
    this.twitterUserImgURL = `${this.tweet.user.profile_image_url}`;
    this.twitterUserPostURL = `${this.twitterUserURL}/status/${this.tweet.id_str}`;
    this.isRetweeted = this.tweet.retweeted_status != null;
    if (this.isRetweeted) {
      this.retweetedUserURL = `${this.twitterURL}${this.tweet.retweeted_status.user.screen_name}`;
    }
  }

  getUserMentionURL(user: User) {
    return `${this.twitterURL}${user.screen_name}`;
  }

}
