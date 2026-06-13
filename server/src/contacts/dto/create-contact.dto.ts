import { IsNotEmpty, IsString, IsEmail, Matches } from 'class-validator';

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    // Validates Australian phone numbers, accepting both mobile and landline formats.
    // ^(\+?61|0)  -> must start with +61 or 61 (country code, + optional) OR a leading 0
    // [2-478]     -> next digit must be 2, 3, 4, 7, or 8 (valid AU area/mobile prefixes:
    //                04 mobile, 02/03/07/08 landline by state)
    // (\s?\d){8}  -> followed by exactly 8 digits, each allowing an optional space
    //                (accepts "0412345678" and "0412 345 678")
    // $           -> end of string, nothing else allowed after
    @Matches(/^(\+?61|0)[2-478](\s?\d){8}$/, {
        message: 'phone must be a valid Australian phone number',
    })
    phone: string;

    @IsNotEmpty()
    @IsString()
    note: string;
}