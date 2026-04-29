import app from './src/app'
import { env } from './src/config/env'
import prisma from './src/prisma/client'

async function main() {
  await prisma.$connect()
  console.log('✅ Database connected')

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`)
    console.log(`   Environment: ${env.NODE_ENV}`)
  })
}

main().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
