import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories/category.interface';

@Injectable()
export class AppService {

  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>
  ) { }

  private readonly logger = new Logger(AppService.name);

  async createCategory(category: Category): Promise<Category> {
    try {
      const createdCategory = new this.categoryModel(category);
      return await createdCategory.save();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }

  async getCategoryById(_id: string): Promise<Category> {
    try {
      return await this.categoryModel.findOne({ _id }).exec()
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }
}
