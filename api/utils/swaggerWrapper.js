// utils/swaggerWrapper.js

export function withSwagger(handler, swaggerCommentBlock) {
    return (req, res) => {
      eval(`/* ${swaggerCommentBlock} */`);
      return handler(req, res);
    };
  }
  