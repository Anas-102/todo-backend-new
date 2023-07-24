import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/users/auth/auth.module';
import { RefreshToken } from './users/entities/refresh_token.entity';
import { TodoModule } from './todos/todo.module';
import { Todo } from './todos/entities/todo.entity';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '051001@Hashmani',
      database: 'test',
      entities: [User, RefreshToken, Todo],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
