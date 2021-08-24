/* tslint:disable */
export interface AuthMthUsernamePasswordEntity {
  /**
   * Unique id
   */
  id: string;
  /**
   * account id
   */
  accounts_id: string;
  created_at: string;
  username: string;
  password: string;
  password_type: PasswordType;
}

export const enum PasswordType {
  bcrypt = 'bcrypt'
}

