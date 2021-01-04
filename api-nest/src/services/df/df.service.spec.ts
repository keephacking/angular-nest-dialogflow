import { Test, TestingModule } from '@nestjs/testing';
import { DfService } from './df.service';

describe('DfService', () => {
  let service: DfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DfService],
    }).compile();

    service = module.get<DfService>(DfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
