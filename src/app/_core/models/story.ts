import { Post } from '@core/models/post';
import { Image } from '@core/models/image';

export interface Story {
  id: number;
  title: string;
  description: string;
  title_image: Image;
  slug: string;
  path: string;
  active: number;
  posts?: Post[];
}
