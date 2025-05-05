// MOCK for Google Token verification
const verifyGoogleTokenMock = async (token) => {
    if (token === 'valid-google-token') {
      return {
        email: 'mockuser@example.com',
        name: 'Mock User',
        picture: 'https://example.com/avatar.png',
        sub: 'google-uid-123'
      };
    } else {
      const error = new Error('Invalid Google token');
      error.name = 'InvalidTokenError';
      throw error;
    }
  };

  module.exports = {
    verifyGoogleTokenMock
  }