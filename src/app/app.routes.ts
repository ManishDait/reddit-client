import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { CreateSubredditComponent } from './component/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { ListSubredditComponent } from './component/list-subreddit/list-subreddit.component';
import { ViewPostComponent } from './component/view-post/view-post.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path:"home", title:"Home", component:HomeComponent},
    {path:"sign-up", title:"SignUp", component: SignupComponent},
    {path:"login", title:"Login", component: LoginComponent},
    {path:"create-subreddit", title:"Create Subreddit", component: CreateSubredditComponent, canActivate: [AuthGuard]},
    {path:"list-subreddit", title:"List of Subreddit", component: ListSubredditComponent},
    {path:"create-post", title:"Create Post", component: CreatePostComponent, canActivate: [AuthGuard]},
    {path:"view-post", title:"Post", component: ViewPostComponent},
    {path:"profile", title:"Profile", component: ProfileComponent, canActivate: [AuthGuard]},
    {path:"**", redirectTo:"home"}
];
