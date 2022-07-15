import { NotFoundException } from '@nestjs/common';
import { CeilingPerf } from '../features/ceiling-perf/entity/ceiling-perf.entity';
import { Ceiling } from '../features/ceiling/entity/ceiling.entity';

export const ceilingPerformances: CeilingPerf[] = [
  {
    id: 1,
    name: 'Robust',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Soft',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const ceilings: Ceiling[] = [
  {
    id: 1,
    name: 'Moderna',
    imageUrl:
      'https://habitatpresto.wgcdn.net/devisprestofly/upload/article/faux-plafond-suspendu.png',
    reference: 'CX00256',
    price: 5000,
    height: 600,
    width: 500,
    performces: ceilingPerformances,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Arithmetics',
    imageUrl:
      'https://www.blog-habitat-durable.com/wp-content/uploads/2022/03/Tout-savoir-sur-le-faux-plafond-suspendu.jpg',
    reference: 'CX00463',
    price: 7500,
    height: 350,
    width: 400,
    performces: [ceilingPerformances[0]],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    name: 'Esthetica',
    imageUrl:
      'https://www.maisonapart.com/images/auto/640-480-c/20140303_175632_02-panorama7.jpg',
    reference: 'CX00987',
    price: 1500,
    height: 800,
    width: 450,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export class CeilingPerfMock {
  async fetchOne(id: number): Promise<CeilingPerf> {
    const performance = ceilingPerformances.find(
      (performance) => performance.id === id,
    );

    if (!performance) {
      throw new NotFoundException(
        "Cette performance n'a pas pu être trouvée !",
      );
    }

    return Promise.resolve(performance);
  }
}
