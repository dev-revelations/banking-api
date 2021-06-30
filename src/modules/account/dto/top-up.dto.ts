import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class TopUpDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    accountId: string;

    @IsNumber(
        {
            allowNaN: false,
            allowInfinity: false,
            maxDecimalPlaces: 2
        }
    )
    @IsNotEmpty()
    amount: number;

    @IsString()
    @MaxLength(100)
    transferKey?: string;
}