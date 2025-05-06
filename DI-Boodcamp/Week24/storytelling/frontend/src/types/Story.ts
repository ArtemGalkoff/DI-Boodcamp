export interface Story {
    id: string;
    title: string;
    content: string;
    author_id: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateStoryInput {
    title: string;
    content: string;
  }
  
  export interface UpdateStoryInput {
    title?: string;
    content?: string;
  }
  
  export interface Contributor {
    id: string;
    username: string;
  }