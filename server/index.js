const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const PORT = process.env.PORT || 3000
const app = express()
module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // auth and api routes
  //app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))


  // sends index.html
  app.use('*', (req, res) => {
    console.log('hello!!');
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // error handling endware
  app.use((err, req, res) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () => {
    console.log('####################')
    console.log(`Mixing it up on port http://localhost:${PORT}`)
    console.log('####################')
  })
}

async function bootApp() {
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}