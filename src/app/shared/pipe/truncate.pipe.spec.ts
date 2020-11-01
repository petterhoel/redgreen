import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const truncate: TruncatePipe = new TruncatePipe();

  it('should shorten string correctly', () => {
    const expected = 1
    const actual = truncate.transform('foo', expected);
    expect(actual.length).toBe(expected);
  });

  it('should not modify when string is shorter than given length', () => {
    const original = 'foobar';
    const actual = truncate.transform(original, 42);
    expect(actual.length).toBe(original.length);
    expect(actual).toEqual(original);
  });

  it('should handle an object', () => {
    // @ts-ignore
    const result = truncate.transform({bar: 'foo'});
    expect(result).toBe('');
  })

  it('create an instance', () => {
    expect(truncate).toBeTruthy();
  });

  it('should hanndle null', () => {
    // @ts-ignore
    const result = truncate.transform(null);
    expect(result).toBe('');
  });

  it('should handle undefined', () => {
    // @ts-ignore
    const result = truncate.transform(undefined);
    expect(result).toBe('');
  })

  it('should handle an object', () => {
    // @ts-ignore
    const result = truncate.transform({bar: 'foo'});
    expect(result).toBe('');
  })
});
