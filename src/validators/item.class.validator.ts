import {
  IsInt,
  Length,
  IsUrl,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from "class-validator";

import IItem from "../databases/postgresql/model/item.model";

export class CreateItemValidationSchema implements IItem {
  @Length(3, 50)
  @IsNotEmpty()
  name!: string;

  @Length(0, 300)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @Max(1000_000)
  price!: number;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsDate()
  @IsOptional()
  datePublished!: string;
}

export class UpdateItemValidationSchema {
  @Length(3, 50)
  @IsOptional()
  name!: string;

  @Length(0, 300)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @Max(1000_000)
  @IsOptional()
  price!: number;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsDate()
  @IsOptional()
  datePublished!: string;
}

export class GetItemIdValidationSchema {
  @IsInt()
  @Min(1)
  id!: number;
}
