const passport = require('passport');
const jwt = require('passport-jwt');
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const bcrypt = require('bcrypt');
const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
const { user } = require('./users');
passport.use(user.userModel.createStrategy());
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
}
passport.use(new JWTStrategy(jwtOptions,
    async (jwt_payload, done) => {
        if (!jwt_payload.email || !emailRegex.test(jwt_payload.email))
            return done(null, false, {error: "Invalid email"});
        else if (!jwt_payload.password)
            return done(null, false, {error: "Password required"});
        await user.userModel.findOne({email: jwt_payload.email}).then(async (user)=>{
            if (!user || Object.keys(user).length < 1) {
                return done(null, false, {error: "User Not Found"});
            }
            if (!await bcrypt.compare(jwt_payload.password, user.password)) {
                return done(null, false, {error: "Incorrect email or password"});
            }
            const accessToken = require('jsonwebtoken').sign({id: user._id,}, process.env.SECRET,{expiresIn: "1d"});
            return done(null, accessToken);
        }).catch((err) => {return done(null, false, {error: err.message})});
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(user, done) {
    user.userModel.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;