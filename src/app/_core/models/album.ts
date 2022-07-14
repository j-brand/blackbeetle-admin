import { Image } from '@core/models/image';

/**
 * Model for type Album
 */
export type Album = {
  id: number;
  title: string;
  description: string;
  title_image: Image;
  title_image_text: String;
  start_date: Date;
  end_date: Date;
  slug: string;
  path: string;
  active: number;
  images?: Image[];
  image_upload?: Blob;
};
