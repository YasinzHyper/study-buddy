import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    expect(cn('foo', undefined, 'bar')).toBe('foo bar');
    expect(cn('foo', 'foo', 'bar')).toBe('foo foo bar'); // no deduplication
  });
}); 