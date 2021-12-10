import { StatusCodes } from 'http-status-codes';

const error = (code, message) => ({
  isError: true,
  code,
  message,
});

module.exports = {
  errorToken: (message) => error(StatusCodes.BAD_REQUEST, message),
  errorSalesId: (message) => error(StatusCodes.BAD_REQUEST, message),
  errorLogin: (message) => error(StatusCodes.BAD_REQUEST, message)
};