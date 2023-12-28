import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';

@Module({
  imports: [
    WalletsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const mongoConfig = config.get('mongo');

        return {
          uri: mongoConfig.uri,
        };
      },
    }),
  ],
})
export class AppModule {}
