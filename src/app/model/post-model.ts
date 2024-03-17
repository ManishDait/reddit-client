export interface PostResponse {
    id: number,
    subredditName: string,    
    postName: string;
    description: string;
    url: string;
    username: string;
    voteCount: number;
    commentCount: number;
    duration: string;
    upVote: boolean;
    downVote: boolean;
}

export interface PostRequest {
    subredditName: string;
    postName: string;
    url: string;
    description: string;
}
