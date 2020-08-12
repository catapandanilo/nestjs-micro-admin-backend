import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload, MessagePattern } from '@nestjs/microservices';
import { Category } from '../src/interfaces/categories/category.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  logger = new Logger(AppController.name);

  @EventPattern('create-category')
  async createCategory(@Payload() category: Category) {
    this.logger.log(`EventPattern > create-category: ${JSON.stringify(category)}`);
    this.appService.createCategory(category);
  }

  @MessagePattern('get-categories')
  async getCategories(@Payload() _id: string) {
    this.logger.log('MessagePattern > ' + (_id ? `get-category id: ${_id}` : `get-categories`));
    if (_id) {
      return await this.appService.getCategoryById(_id);
    } else {
      return await this.appService.getAllCategories();
    }
  }
}
