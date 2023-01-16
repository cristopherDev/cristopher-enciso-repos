import { Injectable } from '@nestjs/common';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { UpdateTribeDto } from './dto/update-tribe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TribesService {
  constructor(private prisma: PrismaService) {}

  create(createTribeDto: CreateTribeDto) {
    return 'This action adds a new tribe';
  }

  findAll() {
    return `This action returns all tribes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tribe`;
  }

  async findRepositories(id: number) {
    const startDate = new Date(new Date().getFullYear(), 0, 1).toISOString();
    const endDate = new Date(new Date().getFullYear(), 11, 31).toISOString();

    const checkRepository = await this.prisma.tribe.findFirst({
      where: { id },
      select: {
        name: true,
      },
    });

    if (!checkRepository) return null;

    const repositories = await this.prisma.tribe.findMany({
      where: {
        id,
        repositories: {
          some: {
            state: 'E',
            create_time: {
              gte: startDate,
              lt: endDate,
            },
            metrics: {
              coverage: {
                gt: 75,
              },
            },
          },
        },
      },
      include: {
        repositories: {
          include: {
            metrics: true,
          },
        },
      },
    });
    const repositoriesData = JSON.stringify(repositories, (_key, value) =>
      typeof value === 'bigint' ? Number(value.toString()) : value,
    );
    return repositoriesData;
  }

  update(id: number, updateTribeDto: UpdateTribeDto) {
    return `This action updates a #${id} tribe`;
  }

  remove(id: number) {
    return `This action removes a #${id} tribe`;
  }
}
