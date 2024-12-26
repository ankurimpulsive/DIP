import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todos } from './todo.model';
import { TodoModule } from './todo/todo.module';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'todoapp',
      models: [Todos],
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    TodoModule,
    AuthModule,
    UsersModule,
    // ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
