import { Test, TestingModule } from '@nestjs/testing';
import { DfRequestsController } from './df-requests.controller';

describe('DfRequestsController', () => {
  let controller: DfRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DfRequestsController],
    }).compile();

    controller = module.get<DfRequestsController>(DfRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
