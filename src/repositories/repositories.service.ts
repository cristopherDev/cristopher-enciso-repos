import { Injectable } from '@nestjs/common';

export type Repositories = any;

@Injectable()
export class RepositoriesService {
  private readonly repositories: Repositories;

  constructor() {
    this.repositories = {
      repositories: [
        {
          id: 1,
          state: 604,
        },
        {
          id: 2,
          state: 605,
        },
        {
          id: 3,
          state: 606,
        },
      ],
    };
  }

  findAll() {
    return this.repositories;
  }
}
