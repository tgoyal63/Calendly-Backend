import { google } from "googleapis";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import userService from "../services/user.service";

const GoogleOAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID!,
  process.env.CLIENT_SECRET!,
  process.env.REDIRECT_URI!
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: process.env.REDIRECT_URI!,
      passReqToCallback: true,
    },
    async (
      request: any,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (err: any, user: any) => void
    ) => {
      const data = {
        name: profile.displayName,
        username: profile.email.split("@")[0],
        email: profile.emails[0].value,
        googleId: profile.id,
        accessToken,
        refreshToken,
        workingHours: {
          start: 9,
          end: 20,
        },
        duration: 30,
      };
      await GoogleOAuth2Client.setCredentials({access_token: accessToken});
      try {
        const user = await userService.findOrCreateUser(data);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export { GoogleOAuth2Client, passport };
