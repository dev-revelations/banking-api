import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class TransferDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    fromAccountId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    toAccountId: string;

    @IsNumber(
        {
            allowNaN: false,
            allowInfinity: false,
            maxDecimalPlaces: 2
        }
    )
    @IsNotEmpty()
    amount: number;
}