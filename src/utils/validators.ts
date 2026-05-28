import type { SignUpBody } from "../controllers/auth.controller.ts";

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationData {
  username: string;
  email: string;
  password: string;
}

interface ValidationSuccess {
  success: true;
  data: ValidationData;
}
interface ValidationFailure {
  success: false;
  errors: ValidationError[];
}

type ValidatorResult = ValidationSuccess | ValidationFailure;

export default function validateUserCredencials(
  user: SignUpBody,
): ValidatorResult {
  let errors: ValidationError[] = [];
  const username = user.username?.trim();
  const email = user.email?.trim().toLocaleLowerCase();
  const password = user.password;

  if (!username) {
    errors.push({ field: "username", message: "Username is required" });
  } else if (username.length < 3) {
    errors.push({
      field: "username",
      message: "Username must be at least 3 characters long",
    });
  }

  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    errors.push({ field: "email", message: "Email not valid" });
  }

  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (password.length < 8) {
    errors.push({
      field: "password",
      message: "Password must be at least 8 characters long",
    });
  }

  if (errors.length > 0 || !username || !email || !password) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: { username, email, password },
  };
}
