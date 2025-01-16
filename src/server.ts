import { app } from '@/app'
import { env } from '@/utils/env'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then((address) => {
    console.log(`Server listening on ${address}`)
  })
