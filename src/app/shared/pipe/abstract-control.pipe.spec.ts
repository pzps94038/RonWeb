import { AbstractControlPipe } from './abstract-control.pipe';

describe('AbstractContro', () => {
  it('create an instance', () => {
    const pipe = new AbstractControlPipe();
    expect(pipe).toBeTruthy();
  });
});
