import { TestBed } from '@angular/core/testing';
import { ClassificationTrainer } from './classification-trainer.service';
import { InputParserService } from './input-parser.service';

describe('InputParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputParserService = TestBed.inject(InputParserService);
    expect(service).toBeTruthy();
  });

  // test the training
  it('should initialize successfully', (done) => {
    const service: InputParserService = TestBed.inject(InputParserService);
    service.initialize(new ClassificationTrainer()).then(result => {
      expect(result).toBeTrue();
      done();
    });
  });

});
