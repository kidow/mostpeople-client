const express = require('express')
const app = express()
const nuxt = require('./middleware/nuxt')

app.all('/health', (_, res) => res.sendStatus(200))

nuxt(app)
