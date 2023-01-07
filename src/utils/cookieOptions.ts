import { CookieSerializeOptions } from "cookie";

const cookieOptions: CookieSerializeOptions = {
  maxAge: 10,
  httpOnly: false,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: true,
};

export default cookieOptions;
