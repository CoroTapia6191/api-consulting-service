import { Test, TestingModule } from '@nestjs/testing';
import { DecoderService } from './decoder.service';

describe('DecoderService', () => {
  let service: DecoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecoderService],
    }).compile();

    service = module.get<DecoderService>(DecoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
