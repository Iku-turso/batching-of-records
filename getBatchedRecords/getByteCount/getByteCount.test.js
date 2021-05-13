import getByteCount from './getByteCount';

// See details: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string
describe('getByteCount', () => {
  it('when called with a basic string, returns amount of bytes', () => {
    const amountOfBytes = getByteCount('some normal string');

    expect(amountOfBytes).toBe(18);
  });

  it('when called with a string containing emoji, returns amount of bytes', () => {
    const amountOfBytes = getByteCount('👍');

    expect(amountOfBytes).toBe(4);
  });

  it('when called with a string containing a multi-byte character, returns amount of bytes', () => {
    const amountOfBytes = getByteCount(String.fromCharCode(55555));

    expect(amountOfBytes).toBe(3);
  });

  it('when called with a string containing a character in the surrogate pair range, returns amount of bytes', () => {
    const amountOfBytes = getByteCount(String.fromCharCode(55555, 57000));

    expect(amountOfBytes).toBe(4);
  });
});
