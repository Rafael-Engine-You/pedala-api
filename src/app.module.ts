import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  providers: [AppService],
  imports: [UsuarioModule],
})
export class AppModule {}
