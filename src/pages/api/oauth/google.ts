import axios from "axios";
import cookie from "cookie";
import { CookieSerializeOptions, serialize } from "cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import cookieOptions from "../../../utils/cookieOptions";

import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_OAUTH_REDIRECT_URL);

const scopes = ["https://www.googleapis.com/auth/calendar"];

const generateOAuthUrl = () => {
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });

  return url;
};

const setCookie = (res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }
  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    console.log("User info:", user);
    setCookie(res, "googleUser", user, cookieOptions);

    const name = "googleTokenCookie";
    const value = id_token;
    const options = {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    };
    const serializedCookie = cookie.serialize(name, value, options);
    res.setHeader("Set-Cookie", serializedCookie);

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
  } catch (err: any) {
    console.log(err);
    console.log(err.response.data);
    throw new Error(err.message);
  }
};

export default Handler;
