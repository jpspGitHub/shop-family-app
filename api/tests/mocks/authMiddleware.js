
import {jest} from '@jest/globals';

function mockAuthMiddleware() {
  jest.mock('../middleware/authMiddleware', () => {
    return (req, res, next) => {
      req.user = { id: '64b29cfa9d2e4b8d5c1b1e91' };
      next();
    };
  });
}

export default {
  mockAuthMiddleware,
};
