import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } from "../const.js";
import { Users } from "../db/DBManager.js";


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_REDIRECT_URL,
}, (accessToken, refreshToken, profile, done) => {
    // This is the callback that will be called once we get response from google server.
    // This callback will receive accessToken, refreshToken, User profile according to scope and a verifyCallback
    
    // create user object using the profile received.
    // add the user info in your DB

    // console.log(`profile from Google:`);
    // console.log(profile);
    const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        profile_photo: profile.photos[0].value,
    }
    Users[user.id] = user;
    return done(null, user);

}));

// implement serialize and deserialize methods for session management.
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, Users[id])); 


export default passport;