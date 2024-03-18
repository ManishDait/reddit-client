# Reddit-Clone Angular Frontend

This project is a frontend client for Reddit-Clone built with Angular, designed to resemble the popular social media platform Reddit.

## Setup

To set up the Reddit-Clone-Client, follow these steps:

1. **Clone the Repository**: 
    ```bash
    git clone https://github.com/ManishDait/reddit-clone-client.git
    ```

2. **Install Dependencies**:
    Navigate to the project directory and install the necessary dependencies using npm:
    ```bash
    cd reddit-clone-client
    npm install
    ```

3. **Configure API Keys**:
    Create a `environment.development.ts` and `environment.ts` file in the `src/environments` directory and copy the content of `enviroment.example.ts`.
    ```ts
    export const environment = {
    // <-- production: true --> for environment.ts && <-- productiion: false --> for environment.development.ts
    production: true,
      API_ENDPOINT: "http://localhost:8080/api",
      AUTH_PATH: "/auth",
      POSTS_PATH: "/post",
      SUBREDDIT_PATH: "/subreddit",
      COMMENT_PATH: "/comment",
      VOTE_PATH: "/vote",
      TINYMCE_API_KEY: "<your-api-key-here>" 
    };
    ```
    Add the [Tinymce](https://www.tiny.cloud/) api key in `TINYMCE_API_KEY`

5. **Run the Application**:
    Start the Angular development server by running:
    ```bash
    ng serve -o
    ```

6. **Access the Application**:
    Once the server is running, access the Reddit-Clone Angular Frontend in your web browser at `http://localhost:4200`.

