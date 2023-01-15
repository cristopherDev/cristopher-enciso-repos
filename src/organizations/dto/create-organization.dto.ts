class CreateMetricsDto {
  coverage: number;
  bugs: number;
  vulnerabilities: number;
  hotspot: number;
  code_smells: number;
}

class CreateRepositoryDto {
  name: string;
  state: string;
  status: string;
  metrics: CreateMetricsDto;
}


class CreateTribeDto {
  name: string;
  status: number;
  repositories: [CreateRepositoryDto];
}

export class CreateOrganizationDto {
  name: string;
  status: number;
  tribes: [CreateTribeDto];
}
