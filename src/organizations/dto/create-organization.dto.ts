import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMinSize,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

type RepositoryStatusTypes = 'A' | 'I';
type RepositoryStatesTypes = 'E' | 'D' | 'A';

const RepositoryStatus: RepositoryStatusTypes[] = ['A', 'I'];
const RepositoryStates: RepositoryStatesTypes[] = ['E', 'D', 'A'];

class CreateMetricsDto {
  @ApiProperty()
  @IsNumber()
  coverage: number;

  @ApiProperty()
  @IsNumber()
  bugs: number;

  @ApiProperty()
  @IsNumber()
  vulnerabilities: number;

  @ApiProperty()
  @IsNumber()
  hotspot: number;

  @ApiProperty()
  @IsNumber()
  code_smells: number;
}

class CreateRepositoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(RepositoryStates, { message: () => 'state debe de ser E o D o A' })
  state: RepositoryStatesTypes;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(RepositoryStatus, { message: () => 'status debe de ser A o I' })
  status: RepositoryStatusTypes;

  @ApiProperty({ type: CreateMetricsDto })
  @IsObject()
  metrics: CreateMetricsDto;
}

class CreateTribeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty({isArray: true, type: CreateRepositoryDto})
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateRepositoryDto)
  repositories: CreateRepositoryDto[];
}

export class CreateOrganizationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty({isArray: true, type: CreateTribeDto})
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTribeDto)
  tribes: CreateTribeDto[];
}
