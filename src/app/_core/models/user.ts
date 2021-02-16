
/**
 * Model for type User
 */
export type User = {
  id: number;
  email: string;
  name: string;
  activ: number;
  email_verified_at: string;
  token?: string;
}
