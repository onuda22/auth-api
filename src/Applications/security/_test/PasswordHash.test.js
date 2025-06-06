/* eslint-disable no-undef */
const PasswordHash = require('../PasswordHash');

describe('PasswordHash Interface', () => {
  it('should throw when invoke abstract behavior', async () => {
    // Arrange
    const passwordHash = new PasswordHash();

    // Action & Assert
    await expect(passwordHash.hash('dummy_password')).rejects.toThrowError(
      'PASSWORD_HASH.METHOD_NOT_IMPLEMENTED'
    );
  });
});
