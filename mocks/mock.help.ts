export const createMockRepository = <T>(entity: any, suffix: string = '') => {
  let obj: any = {
    save: () => jest.fn(),
    find: () => jest.fn(),
    findOne: () => jest.fn(),
    update: () => jest.fn(),
    delete: () => jest.fn(),
  };
  obj[`find${suffix}s`] = jest.fn();
  obj[`findOne${suffix}`] = jest.fn();
  obj[`create${suffix}`] = jest.fn();
  obj[`update${suffix}`] = jest.fn();
  obj[`delete${suffix}`] = jest.fn();
  return { ...obj };
};

export const createMockService = <T>(entity: any) => {
  return {
    [`findAll`]: jest.fn().mockResolvedValue({ error: null, data: [] }),
    [`findOne`]: jest.fn(),
    [`create`]: jest.fn(),
    [`update`]: jest.fn(),
    [`remove`]: jest.fn(),
  };
};

export const dataSourceMock = {
  getEntityManagerToken: jest.fn(),
  getEntityManagerEngine: jest.fn(),
  queryRunner: jest.fn(),
  createEntityManager: jest.fn().mockReturnValue({
    getRepository: jest.fn().mockImplementation((entity) => {
      return {
        save: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
    }),
  }),
};
