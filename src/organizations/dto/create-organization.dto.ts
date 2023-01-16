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

type RepositoryStatusTypes = 'A' | 'I';
type RepositoryStatesTypes = 'E' | 'D' | 'A';

const RepositoryStatus: RepositoryStatusTypes[] = ['A', 'I'];
const RepositoryStates: RepositoryStatesTypes[] = ['E', 'D', 'A'];

class CreateMetricsDto {
  @IsNumber()
  coverage: number;

  @IsNumber()
  bugs: number;

  @IsNumber()
  vulnerabilities: number;

  @IsNumber()
  hotspot: number;

  @IsNumber()
  code_smells: number;
}

class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(RepositoryStates, { message: () => 'state debe de ser E o D o A' })
  state: RepositoryStatesTypes;

  @IsString()
  @IsNotEmpty()
  @IsEnum(RepositoryStatus, { message: () => 'status debe de ser A o I' })
  status: RepositoryStatusTypes;

  @IsObject()
  metrics: CreateMetricsDto;
}

class CreateTribeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  status: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateRepositoryDto)
  repositories: CreateRepositoryDto[];
}

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  status: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTribeDto)
  tribes: CreateTribeDto[];
}
