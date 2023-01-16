import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { parse, stringify } from 'flatted';

@Injectable()
export class TribesService {
  constructor(private prisma: PrismaService) {}

  async findRepositories(id: number) {
    const stateType: string = 'A';
    const setCoverage: number = 9;

    const statesTypes = {
      E: 'Habilitado',
      D: 'Desactivado',
      A: 'Archivado',
    };

    const checkRepository = await this.prisma.tribe.findFirst({
      where: { id },
      select: {
        id_organization: true,
        name: true,
      },
    });

    if (!checkRepository) return null;

    const result = await this.prisma.$queryRaw`
      select 
        repository.id,
        repository.name,
        tribe.name as tribe,
        organization.name as organization,
        metrics.coverage,
        metrics.code_smells as codeSmells,
        metrics.bugs,
        metrics.vulnerabilities,
        metrics.hotspot as hotspots,
        repository.state
      from tribe
      left join organization on organization.id = tribe.id_organization
      left join repository on repository.id_tribe = tribe.id
      left join metrics on metrics.id_repository = repository.id
      where tribe.id = ${id}
      and repository.state = ${stateType}
      and metrics.coverage >= ${setCoverage}
      and date_part('year', repository.create_time) = date_part('year', CURRENT_DATE)
    `;

    const convertResult: string = stringify(result, (_key, value) =>
      typeof value === 'bigint' ? Number(value.toString()) : value,
    );

    const parseResult = parse(convertResult);

    if (!parseResult.length) return {};

    parseResult.forEach((repository) => {
      repository.coverage = `${repository.coverage}%`;
      repository.state = statesTypes[repository.state];
    });

    return parseResult;
  }
}
