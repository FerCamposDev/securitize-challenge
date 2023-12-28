import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletPostDto } from 'src/dto/wallet.post.dto';
import { WalletPutDto } from 'src/dto/wallet.put.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private walletService: WalletsService) {}

  @Get()
  async getAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const wallet = await this.walletService.findById(id);
      if (!wallet) throw new NotFoundException('Wallet not found');
      return wallet;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() body: WalletPostDto) {
    try {
      return await this.walletService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Wallet already exists');
      }
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: WalletPutDto) {
    try {
      return await this.walletService.update(id, body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Wallet already exists');
      }
      throw error;
    }
  }

  @Patch(':id')
  async toggleFavorite(@Param('id') id: string) {
    try {
      const wallet = await this.walletService.toggleFavorite(id);
      if (!wallet) throw new NotFoundException('Wallet not found');
      return wallet;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const wallet = await this.walletService.delete(id);
      if (!wallet) throw new NotFoundException('Wallet not found');
      return wallet;
    } catch (error) {
      throw error;
    }
  }
}
