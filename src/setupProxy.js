const proxy = require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    proxy('/api/upload',{
      target:"http://localhost:3001/",
      changeOrigin:true
    })
  ),
  app.use(
    proxy('/api/delete',{
      target:"http://localhost:3001/",
      changeOrigin:true
    })
  ),
  app.use(
    proxy('/back/**',{
      target:"http://localhost:3001/",
      changeOrigin:true
    })
  ),
  app.use(
    proxy('/province/**',{
      target:'http://cpnp.nmpa.gov.cn/',
      changeOrigin:true
    })
  )
}
