import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletPostDto } from 'src/dto/wallet.post.dto';
import { WalletPutDto } from 'src/dto/wallet.put.dto';
import { Wallet } from 'src/schemas/wallet.schema';

@Injectable()
export class WalletsService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  async findAll() {
    return this.walletModel.find();
  }

  async findById(id: string) {
    return this.walletModel.findById(id);
  }

  async create(wallet: WalletPostDto) {
    const newWallet = new this.walletModel(wallet);
    return newWallet.save();
  }

  async update(id: string, wallet: WalletPutDto) {
    return this.walletModel.findByIdAndUpdate(id, wallet, { new: true });
  }

  async toggleFavorite(id: string) {
    const wallet = await this.walletModel.findById(id);
    wallet.favorite = !wallet.favorite;

    return this.walletModel.findByIdAndUpdate(id, wallet, { new: true });
  }

  async delete(id: string) {
    return this.walletModel.findByIdAndDelete(id);
  }
}
