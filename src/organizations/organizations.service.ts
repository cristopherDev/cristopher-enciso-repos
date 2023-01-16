import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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
    return newOrganizationData;
  }

  async findAll() {
    const data = await this.prisma.organization.findMany();
    const organizationsData = JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
    return organizationsData;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const data = await this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
    const updateData = JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
    return updateData;
  }

  async remove(id: number) {
    const result = await this.prisma.organization.delete({ where: { id } });
    const deleteResult = JSON.stringify(result, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
    return deleteResult;
  }
}
