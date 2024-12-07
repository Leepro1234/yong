import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { sample } from 'rxjs'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Sample } from './sample/sample.entity'
import { SampleModule } from './sample/sample.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 전역으로 설정
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`, // 환경 변수 파일 경로
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER || 'admin',
      password: process.env.DATABASE_PASSWORD || 'Eodyddbstjs12!',
      database: process.env.DATABASE_NAME || 'development',
      entities: [Sample],
      synchronize: false,
      logging: true,
    }),
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
