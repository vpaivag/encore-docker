import { api } from "encore.dev/api";
import log from "encore.dev/log";

import { getAuthData } from "~encore/internal/auth/auth";

interface Params {
  name: string;
}

interface Response {
  message: string;
}

export const get = api(
  { method: "GET", path: "/hello" },
  async (): Promise<Response> => {
    return { message: "Hello" };
  },
);

export const admin = api<void, Response>(
  { method: "GET", path: "/admin", expose: true, auth: true },
  async (p) => {
    console.log(p);
    const authData = getAuthData()!;
    log.info(`User ${authData.userID} is accessing the admin endpoint`);
    return { message: "Hello, admin!" };
  },
);

