import { Logger } from '@nestjs/common';

export class MockLogger extends Logger {
  constructor(context) {
    super(context);

    this.error = jest.fn();
    this.warn = jest.fn();
    this.debug = jest.fn();
    this.verbose = jest.fn();
    this.log = jest.fn();
  }
}
