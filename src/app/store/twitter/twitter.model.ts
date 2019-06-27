import { Injectable } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { MemoizedSelector } from '@ngrx/store';
import { TwitterColumnsStorage } from '../../services/local-data/layout-data.config';

export enum TwitterUsers {
  MakeSchool = 'MakeSchool',
  NewsYCombinator = 'newsycombinator',
  YCombinator = 'ycombinator'
}

export interface User {
  id: string;
  name: string;
  screen_name: string;
  profile_image_url_https: string;
}

export interface BasicUser {
  id: string;
  name: string;
  screen_name: string;
}

export interface TwitterPosts {
  id: string;
  id_str: string;
  created_at: string;
  text: string;
  entities: {
    user_mentions: BasicUser[]
  };
  user: User;
  retweeted_status: {
    id: string;
    user: User;
  };
}

export interface TwitterUser {
  id: number;
  user: string;
  posts: TwitterPosts[];
}

export interface TwitterPostsByUser {
  MakeSchool: TwitterPosts[];
  newsycombinator: TwitterPosts[];
  ycombinator: TwitterPosts[];
}

export interface TwitterUserSelector {
  user: string;
  fn: MemoizedSelector<object, TwitterUser>;
}

@Injectable({providedIn: 'root'})
export class TwitterPostsModel {
  public readonly MAX_TWITTER_POSTS = 10;
  public readonly MIN_TWITTER_POSTS = 1;
  public readonly twitterUsers: string[] = [TwitterUsers.MakeSchool, TwitterUsers.NewsYCombinator, TwitterUsers.YCombinator];
  constructor() {}
  changeTwitterPostsQuantityByUser(users: TwitterUser[], posts: TwitterPosts[], user: string, value: number): TwitterUser[] {
    return users.map(tw => {
      if (tw.user === user) {
        return {...tw, posts: posts.slice(this.MAX_TWITTER_POSTS - value, this.MAX_TWITTER_POSTS)};
      }
      return tw;
    });
  }
  filterTwitterPostsByUser(twitterPosts: TwitterPosts[]): TwitterPostsByUser {
    const twitterUsers = {};
    this.twitterUsers.forEach(user => {
      if (!twitterUsers[user]) {
        twitterUsers[user] = twitterPosts.filter(post => post.user.screen_name === user);
      }
    });
    return twitterUsers as TwitterPostsByUser;
  }
  getClonedUsersData(users: TwitterUser[]): TwitterUser[] {
    return users.map(user => ({...user}));
  }
  getTwitterPostsByUser(user: string, entities: Dictionary<TwitterPosts>): TwitterPosts[] {
    const twitterPostKeys = Object.keys(entities);
    const userTwitterPostsIdxs = twitterPostKeys.filter((postIdx) => (entities[postIdx] as TwitterPosts).user.screen_name === user);
    return userTwitterPostsIdxs.map(postIdx => entities[postIdx]);
  }
  getTwitterPostsSortedByDefault(users: TwitterUser[], entities: Dictionary<TwitterPosts>): TwitterUser[] {
    return this.twitterUsers.map((user) => {
      const newUser = users.find(tw => tw.user === user);
      return {...newUser, posts: this.getTwitterPostsByUser(newUser.user, entities)};
    });
  }
  getTwitterUsersByTwitterPosts(filteredByUser: TwitterPostsByUser): TwitterUser[] {
    return Object.keys(filteredByUser).map((key, idx) => ({id: idx, user: key, posts: filteredByUser[key]}));
  }
  reorderTwitterPostsByLocalStorage(twitterColumns: TwitterColumnsStorage[], users: TwitterUser[]): TwitterUser[] {
    return twitterColumns.map((col, idx) => {
      const newUser = users.find(tw => tw.user === col.user);
      return {...newUser, posts: newUser.posts.slice(0, col.value)};
    });
  }
  switchTwitterPostsByUser(users: TwitterUser[], previousIndex: number, currentIndex: number): TwitterUser[] {
    return users.map(user => ({...user}))
      .map((user, idx, arr) => {
        if (arr[idx] === arr[previousIndex]) {
          return arr[currentIndex];
        } else if (arr[idx] === arr[currentIndex]) {
          return arr[previousIndex];
        }
        return arr[idx];
      });
  }
}
