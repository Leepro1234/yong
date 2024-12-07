import { NestFactory } from '@nestjs/core'
import { configDotenv } from 'dotenv'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` })
async function bootstrap() {
  console.log(`.env.${process.env.NODE_ENV || 'dev'}`)
  console.log(process.env.DATABASE_HOST)
  console.log(process.env.DATABASE_USER)
  console.log(process.env.DATABASE_PASSWORD)
  console.log(process.env.DATABASE_NAME)
  const logger = new Logger('Bootstrap')

  const app = await NestFactory.create(AppModule)

  const dataSource = app.get(DataSource)

  // 데이터베이스 연결 처리
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize() // 데이터베이스 연결
      logger.log('Database connection initialized successfully')
    } else {
      logger.log('Database connection already initialized')
    }
  } catch (error) {
    logger.error('Failed to initialize database connection', error.stack)
    process.exit(1) // 연결 실패 시 프로세스 종료
  }

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
