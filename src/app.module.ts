import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { EngineModule } from './engine/engine.module';
import { Engine } from './engine/entities/engine.entity';
import { QueriesModule } from './queries/queries.module';
import { Query } from './queries/entities/query.entity';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Engine, Query],
    }),
    UsersModule,
    EngineModule,
    QueriesModule,
    RequestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
