import { Post } from '@core/models/post';
import { Image } from '@core/models/image';

/**
 * Model for type Story
 */
export type Story = {
  id: number;
  title: string;
  description: string;
  title_image: Image;
  slug: string;
  path: string;
  active: number;
  posts?: Post[];
};
