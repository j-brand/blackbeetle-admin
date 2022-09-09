/**
 * Model for type Comment
 */
export type Comment = {
    id: number;
    post_id: number;
    name: string;
    content: string;
    created_at: Date;
};
