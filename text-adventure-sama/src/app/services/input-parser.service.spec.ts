import { TestBed } from '@angular/core/testing';
import { InputParserService } from './input-parser.service';

describe('InputParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputParserService = TestBed.inject(InputParserService);
    expect(service).toBeTruthy();
  });
});
