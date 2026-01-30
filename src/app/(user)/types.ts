export interface User {
  name: string;
  username?: string;
  email: string;
  image: string;
}

export interface SignIn {
  userId: User["email"] | User["username"];
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

export interface SignUp extends User {
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

export interface Loading {
  createBtnLaoding: boolean;
  githubBtnLoading: boolean;
  googleBtnLoading: boolean;
}
