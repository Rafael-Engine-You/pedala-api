import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { typeOrmConfig } from './config/typeorm.config';
import { EstacoesModule } from './estacoes/estacoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsuarioModule,
    EstacoesModule
  ],
  providers: [AppService]
})
export class AppModule {}
