import { Image } from '@model/image';

export class Album {
    id: number;
    title: String;
    description: String;
    title_image: number;
    title_image_text: String;
    start_date: Date;
    end_date: Date;
    slug: String;
    active: number;
    images?: Image[];
}
