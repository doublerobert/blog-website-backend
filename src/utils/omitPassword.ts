import type { UserModel } from "../models/user.model.ts";

export default function omitPassword(user: UserModel) {
  const { password, ...safeUser } = user;
  return safeUser;
}
