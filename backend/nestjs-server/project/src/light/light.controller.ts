import { Controller, Get } from '@nestjs/common';

@Controller('light')
export class LightController {
  @Get()
  getStatus() {}
}
