/* eslint-disable no-undef */
const AddUserUserCase = require('../AddUserUseCase');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');

describe('AddUserUseCase ', () => {
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };

    const mockRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });

    /** Creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    /** Mocking needed function */
    mockUserRepository.verifyAvailableUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest
      .fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUserRepository.addUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredUser));

    /** Creating Use Case instance */
    const getUserUseCase = new AddUserUserCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Action
    const registerUser = await getUserUseCase.execute(useCasePayload);

    // Assert
    expect(registerUser).toStrictEqual(
      new RegisteredUser({
        id: 'user-123',
        username: useCasePayload.username,
        fullname: useCasePayload.fullname,
      })
    );
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(
      useCasePayload.username
    );
    expect(mockUserRepository.addUser).toBeCalledWith(
      new RegisterUser({
        username: useCasePayload.username,
        password: 'encrypted_password',
        fullname: useCasePayload.fullname,
      })
    );
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
  });
});
