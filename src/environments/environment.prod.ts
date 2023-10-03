import { env } from "process";

export const environment = {
    production: true,
    BASE_URL : process.env['NG_APP_ENV']

  };
  