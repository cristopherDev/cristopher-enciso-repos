import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';
import { formatObjectOrganization } from './helpers/format-object.helper';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organizationData = formatObjectOrganization(createOrganizationDto);

    const data = await this.prisma.organization.create({
      data: organizationData,
    });
    const newOrganizationData = JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
    return JSON.parse(newOrganizationData);
  }

  async findAll() {
    const data = await this.prisma.organization.findMany({
      include: {
        tribes: {
          include: {
            repositories: {
              include: {
                metrics: true,
              },
            },
          },
        },
      },
    });
    const organizationsData = JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? Number(value.toString()) : value,
    );
    return JSON.parse(organizationsData);
  }

  findOne(id: number) {
    return this.prisma.organization.findFirst({
      where: { id },
      select: {
        name: true,
        status: true,
      },
    });
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const data = await this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
    const updateData = JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? Number(value.toString()) : value,
    );
    return JSON.parse(updateData);
  }

  async remove(id: number) {
    await this.prisma.organization.delete({ where: { id } });
    return this.findAll();
  }
}
