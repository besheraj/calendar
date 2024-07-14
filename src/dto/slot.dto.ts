import { IsEmail, IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';

export class SlotDto {
  @IsNotEmpty()
  start: string;

  @IsNotEmpty()
  date: string;
}
