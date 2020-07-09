import { InternalServerErrorException, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ControllerError } from 'src/app.interface';

export const checkControllerErrors = ({ code, message }: ControllerError): void => {

  if (code === 403) {
    throw new ForbiddenException();
  }

  if (code === 404) {
    throw new NotFoundException(message);
  }

  if (code === 400) {
    throw new BadRequestException(message);
  }

  throw new InternalServerErrorException({
    error: `${message}`,
  });

};
