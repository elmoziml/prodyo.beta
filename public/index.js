const next = require('next')
const http = require('http')

const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res)
  })

  server.listen(3000, () => {
    console.log('✅ Next.js app running on http://localhost:3000')
  })
})