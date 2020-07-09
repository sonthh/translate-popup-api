import { ApiProperty } from '@nestjs/swagger';
import {
  IsString, IsNotEmpty,
} from 'class-validator';


export class FindWordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly word: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly apiKey: string;
}