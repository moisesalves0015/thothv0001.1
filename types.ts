
export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  images: string[]; // Updated for collage
  itemCount?: string;
  tags?: string[];
}

export interface SidebarConfig {
  title: string;
  maxPosts?: number;
}

// Added missing types for Lab components
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  groundingUrls?: { uri: string; title: string }[];
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface GeneratedVideo {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface Transcription {
  role: 'user' | 'assistant';
  text: string;
}
