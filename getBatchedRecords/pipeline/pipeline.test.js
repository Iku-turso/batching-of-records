import pipeline from './pipeline';

describe('pipeline', () => {
  it('forwards first argument to second argument as function call and then works like flow', () => {
    const addOne = x => x + 1;

    const actual = pipeline(1, addOne, addOne);

    expect(actual).toBe(3);
  });
});
