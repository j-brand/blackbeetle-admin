import { Post } from '@model/post';
import { Image } from '@model/image';

export class Story {
  id: number;
  title: String;
  description: String;
  title_image: Image;
  slug: String;
  path: String;
  active: number;
  posts?: Post[];
}
