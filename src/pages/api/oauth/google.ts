import axios from "axios";
import { CookieSerializeOptions, serialize } from "cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import cookieOptions from "../../../utils/cookieOptions";

const setCookie = (res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }
  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // https://stackoverflow.com/a/57485401
  const path = req.query.state as string;
  try {
    const code = req.query.code as string;
    const { id_token } = await getGoogleOAuthTokens(code);
    const googleUser = jwt.decode(id_token) as jwt.JwtPayload;
    const user = {
      name: googleUser.name,
      email: googleUser.email,
      picture: googleUser.picture,
    };
    setCookie(res, "googleUser", user, cookieOptions);
    return res.redirect(307, path);
  } catch (err: any) {
    console.log(err);
    return res.redirect(307, path);
  }
};

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

const getGoogleOAuthTokens = async (code: string) => {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };
  try {
    const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data);
    throw new Error(error.message);
  }
};

export default handler;
