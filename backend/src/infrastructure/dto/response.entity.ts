import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './response.status';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: ResponseStatus;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(status: ResponseStatus, message: string, data: T) {
    this._statusCode = status;
    this._message = message;
    this._data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, '', '');
  }

  static OK_WITH(message: string): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, message, '');
  }

  static OK_WITH_DATA<T>(message: string, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, message, data);
  }

  static CREATED(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.CREATED, '', '');
  }

  static CREATED_WITH(message: string): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.CREATED, message, '');
  }

  static CREATED_WITH_DATA<T>(message: string, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.CREATED, message, data);
  }

  static ACCEPTED_WITH(message: string): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.ACCEPTED, message, '');
  }

  static NO_CONTENT_WITH(message: string): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.NO_CONTENT, message, '');
  }

  static NOT_FOUND(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.NOT_FOUND, '', '');
  }

  static UNAUTHORIZED(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.UN_AUTHORIZED,
      'Unauthorized',
      'Unauthorized',
    );
  }

  static NOT_FOUND_WITH(message: string): ResponseEntity<string> {
    return new ResponseEntity(ResponseStatus.NOT_FOUND, message, '');
  }

  static BAD_REQUEST(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.BAD_REQUEST, '', '');
  }

  static BAD_REQUEST_WITH(message: string): ResponseEntity<string> {
    return new ResponseEntity(ResponseStatus.BAD_REQUEST, message, '');
  }

  static FORBIDDEN(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.FORBIDDEN, '', '');
  }

  static FORBIDDEN_WITH(message: string): ResponseEntity<string> {
    return new ResponseEntity(ResponseStatus.FORBIDDEN, message, '');
  }

  static UNPROCESSABLE_WITH(data: string): ResponseEntity<string> {
    return new ResponseEntity(
      ResponseStatus.UNPROCESSABLE,
      'Unprocessable Entity',
      data,
    );
  }

  static TOO_MANY_REQUESTS_WITH(data: string): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.TOO_MANY_REQUESTS,
      'Too Many Requests',
      data,
    );
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.SERVER_ERROR,
      '서버 에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }

  @ApiProperty({
    title: '응답 코드',
    example: '200 | 201 | 500',
  })
  @Expose()
  get statusCode(): ResponseStatus {
    return this._statusCode;
  }

  @ApiProperty({
    title: '응답 메시지',
    example: `'' | 서버 에러가 발생했습니다. | 입력 값`,
  })
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty({
    title: '응답 데이터',
    example: `'' | {}`,
  })
  @Expose()
  get data(): T {
    return this._data;
  }
}
