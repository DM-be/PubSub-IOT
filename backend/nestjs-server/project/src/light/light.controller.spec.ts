import { Test, TestingModule } from '@nestjs/testing';
import { LightController } from './light.controller';

describe('Light Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LightController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LightController = module.get<LightController>(
      LightController,
    );
    expect(controller).toBeDefined();
  });
});
