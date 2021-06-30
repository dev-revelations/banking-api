import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    customerId: string;
}
