import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'

import { authPassport, setCookies } from './config/index.js'
import { args } from './global/index.js'
import { Apis } from './routes/index.js'
import Server from './server/server.js'

const app = express();
const router = express.Router();
dotenv.config()

// Auth
authPassport(app, passport, setCookies)

// Config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Config Public
app.use(express.static('public'))

// Routes
Apis.getClass(router).api(app)

//? Server ========================================

const server = new Server(app)

server[args.mode](args.port)