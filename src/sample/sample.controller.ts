import { Controller, Get, Query } from '@nestjs/common'
import { SampleService } from './sample.service'

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('getAll')
  async getAll(): Promise<any> {
    console.log('hi')
    return await this.sampleService.getAll()
  }

  @Get('incrementForUpdate')
  async incrementForUpdate(@Query('id') id: number): Promise<any> {
    console.log('hi')
    return await this.sampleService.incrementMyIdForUpdate(id)
  }

  @Get('incrementMyId')
  async incrementMyId(@Query('id') id: number): Promise<any> {
    return await this.sampleService.incrementMyId(id)
  }
}
