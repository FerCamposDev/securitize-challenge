import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class WalletPostDto {
  @IsString()
  address: string;

  @IsBoolean()
  @IsOptional()
  favorite?: boolean;
}
