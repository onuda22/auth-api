/* eslint-disable no-undef */
const RegisteredUser = require('../RegisteredUser');

describe('a RegisterdUser entities', () => {
  it('should throw error when paylod did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // Action & Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      'REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create registeredUser object correctly', () => {
    // Arrange
    const payload = {
      id: 'user-123',
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.fullname).toEqual(payload.fullname);
  });
});
