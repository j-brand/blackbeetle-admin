import { Comment } from '@model/comment';
import { Image } from '@model/image';
export class Post {
  id: Number;
  user_id: Number;
  title: String;
  position: Number;
  type: String;
  content: String;
  date: String;
  active: number;
  comments: Comment;
  images?: Image[];
}
