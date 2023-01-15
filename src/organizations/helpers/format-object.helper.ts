export function formatObjectOrganization(createOrganizationDto) {
  const { name, status, tribes } = createOrganizationDto;

  const formatTribes = tribes.map((tribe) => {
    const { name, status, repositories } = tribe;
    let tribeData = {
      name,
      status,
      repositories: {
        create: [],
      },
    };

    let formatRepositories = repositories.map((respository) => {
      const { name, state, status } = respository;

      return {
        name,
        state,
        status,
        metrics: {
          create: {
            ...respository.metrics,
          },
        },
      };
    });

    tribeData.repositories.create = formatRepositories;
    return tribeData;
  });

  let organizationData = {
    name,
    status,
    tribes: {
      create: [],
    },
  };

  organizationData.tribes.create = formatTribes;

  return organizationData;
}
