import { Comment } from '@core/models/comment';
import { Image } from '@core/models/image';
export interface Post {
  id: number;
  user_id: number;
  title: string;
  position: number;
  type: string;
  content: string;
  date: string;
  active: number;
  comments: Comment;
  images?: Image[];
}
