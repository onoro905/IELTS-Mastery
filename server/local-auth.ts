import type { Express, Request, Response } from "express";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import * as db from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";

export function registerLocalAuthRoutes(app: Express) {
  // A backdoor for local development to bypass OAuth
  app.get("/api/auth/dev-login", async (req: Request, res: Response) => {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ error: "Not allowed in production" });
    }

    const devUser = {
      openId: "dev-user-123",
      name: "Local Developer",
      email: "dev@example.com",
      loginMethod: "local",
    };

    try {
      await db.upsertUser({
        ...devUser,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(devUser.openId, {
        name: devUser.name,
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/dashboard");
    } catch (error) {
      console.error("[LocalAuth] Dev login failed", error);
      res.status(500).json({ error: "Local auth failed" });
    }
  });
}
