import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { hello } from "~encore/clients";

interface Response {
  greeting: string;
}

const db = new SQLDatabase("foo", {
  migrations: "./migrations",
});

export const greeting = api(
  { method: "GET", path: "/greeting/:name", expose: true },
  async ({
    name
  }: {
    name: string;
  }): Promise<Response> => {
    const response = await hello.get();
    return { greeting: `${response.message} ${name}!` };
  },
);
