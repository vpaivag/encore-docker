import { authHandler } from "encore.dev/auth";
import { type Header, APIError, Gateway } from "encore.dev/api";

// The request information our auth handler is interested in is the `Authorization` header.
interface AuthParams {
  authorization: Header<"Authorization">;
}

// Our auth handler will make the `userID` available to endpoints.
interface AuthData {
  userID: string;
}

export const auth = authHandler<AuthParams, AuthData>(async (params) => {  
  if (params.authorization !== "admin") {
    throw APIError.unauthenticated("Invalid token");
  }
  return { userID: "my-user-id" };
});

export const gateway = new Gateway({
  authHandler: auth,
});