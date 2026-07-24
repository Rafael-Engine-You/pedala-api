import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { typeOrmConfig } from './config/typeorm.config';
import { EstacoesModule } from './modules/estacoes/estacoes.module';
import { BicicletasModule } from './modules/bicicletas/bicicletas.module';
import { AuthModule } from './modules/auth/auth.module';
import { MarcaModule } from './modules/marca/marca.module';
import { ModeloModule } from './modules/modelo/modelo.module';
import { ManutencaoModule } from './modules/manutencao/manutencao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsuarioModule,
    EstacoesModule,
    BicicletasModule,
    MarcaModule,
    ModeloModule,
    AuthModule,
    ManutencaoModule
  ],
  providers: [AppService]
})
export class AppModule {}
