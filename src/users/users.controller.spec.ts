import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  mockCreateUserPayload,
  mockCreateUserResponse,
} from 'test/mocks/unit/users.mock';
import { UserController } from './users.controller';
import { UserService } from './users.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = user.get<UserController>(UserController);
    userService = user.get<UserService>(UserService);
  });

  it('should return the created user with ID', () => {
    userService.createUser = jest
      .fn()
      .mockReturnValueOnce({ ...mockCreateUserResponse });
    expect(userController.createUser(mockCreateUserPayload)).toStrictEqual({
      ...mockCreateUserResponse,
    });
  });
});
