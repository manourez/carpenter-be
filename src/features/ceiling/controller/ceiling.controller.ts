import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCeilingDto, UpdateCeilingDto } from '../dtos';
import { CeilingService } from '../service/ceiling.service';

@ApiTags('Ceilings')
@Controller('ceiling')
export class CeilingController {
  constructor(private ceilingService: CeilingService) {}

  @Post()
  createCeiling(@Body() requestBody: CreateCeilingDto) {
    return this.ceilingService.createCeiling(requestBody);
  }

  @Get()
  fetchCeilings() {
    return this.ceilingService.findAllCeiling();
  }

  @Get(':id')
  getCeiling(@Param('id') id: string) {
    return this.ceilingService.findOneCeiling(+id);
  }

  @Patch(':id')
  updateCeiling(
    @Param('id') id: string,
    @Body() requestBody: UpdateCeilingDto,
  ) {
    return this.ceilingService.updateCeiling(+id, requestBody);
  }

  @Delete(':id')
  deleteCeiling(@Param('id') id: string) {
    return this.ceilingService.deleteOneCeiling(+id);
  }
}
