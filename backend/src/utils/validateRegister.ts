import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }
  if (options.username.length < 5) {
    return [
      {
        field: "username",
        message: "Username must be 5 characters or longer",
      },
    ];
  }

  if (options.password.length < 5) {
    return [
      {
        field: "password",
        message: "Password must be 5 characters or longer",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "@ is not a valid character",
      },
    ];
  }
  return null;
};
