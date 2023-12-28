import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Wallet {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  address: string;

  @Prop({
    default: false,
  })
  favorite: boolean;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
