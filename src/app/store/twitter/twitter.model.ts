import { TwitterPosts } from './twitter.model';
import { Injectable } from '@angular/core';
import { Dictionary } from '@ngrx/entity';

export enum TwitterUsers {
  MakeSchool = 'MakeSchool',
  NewsYCombinator = 'newsycombinator',
  YCombinator = 'ycombinator'
}

export interface TwitterPosts {
  id: string;
  id_str: string;
  created_at: string;
  text: string;
  user: {
    name: string;
    screen_name: string;
  };
  retweeted_status: {
    id: string;
  };
}

@Injectable({providedIn: 'root'})
export class TwitterPostsModel {
  public readonly twitterUsers: string[] = [TwitterUsers.MakeSchool, TwitterUsers.NewsYCombinator, TwitterUsers.YCombinator];
  constructor() {}
  filterTwitterPostsByUser(twitterPosts: TwitterPosts[]):
    {MakeSchool: TwitterPosts[], newsycombinator: TwitterPosts[], ycombinator: TwitterPosts[]} {
    const twitterUsers = {};
    this.twitterUsers.forEach(user => {
      if (!twitterUsers[user]) {
        twitterUsers[user] = twitterPosts.filter(post => post.user.screen_name === user);
      }
    });
    return twitterUsers as {MakeSchool: TwitterPosts[], newsycombinator: TwitterPosts[], ycombinator: TwitterPosts[]};
  }
  getClonedUsersData(users: Array<{id: number, user: string, posts: TwitterPosts[]}>) {
    return users.map(user => ({...user}));
  }
  getTwitterPostsByUser(user: string, entities: Dictionary<TwitterPosts>) {
    const twitterPostKeys = Object.keys(entities);
    const userTwitterPostsIdxs = twitterPostKeys.filter((postIdx) => (entities[postIdx] as TwitterPosts).user.screen_name === user);
    return userTwitterPostsIdxs.map(postIdx => entities[postIdx]);
  }
}
