export interface SubredditResponse {
    id: number,
    name:string,
    description: string,
    numberOfPost: number
}

export interface SubredditRequest {
    name: string,
    description: string
}
