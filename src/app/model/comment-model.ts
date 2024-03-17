export interface CommentResponse {
    id: number,
    text: string,
    postId: number,
    username: string,
    duration: string
}

export interface CommentRequest {
    text: string,
    postId: number
}
