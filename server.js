// import http,app,createDebug

import http from 'http'
import app from './app.js'
import createDebug from 'debug'

const debug = createDebug("assignment2:httpServer")

const httpServer = http.createServer(app)

const port = process.env.PORT || 3030
httpServer.listen(port, () => {
  debug(`HTTP server listening on port ${port}`)
})

debug('helloWorld')