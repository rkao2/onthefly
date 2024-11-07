import express from 'express'
import cors from 'cors'
import tripRoutes from './routes/trips.js'
import ActivityRoutes from './routes/activities.js'
import DestinationRoutes from './routes/destinations.js'
import TripDestinationRoutes from './routes/trips-destinations.js'
import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'
import authRoutes from './routes/auth.js'
import userTripRoutes from './routes/user-trips.js'


const app = express()
app.use(session({
    secret: 'codepath',
    resave: false,
    saveUninitialized: true
}))

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(GitHub)
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.use('/auth', authRoutes)

app.use('/users-trips', userTripRoutes)


app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

app.use('/trips', tripRoutes)
app.use('/activities', ActivityRoutes)
app.use('/destinations', DestinationRoutes)
app.use('/trips-destinations', TripDestinationRoutes)
app.use('/auth', authRoutes)
app.use('/users-trips', userTripRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})