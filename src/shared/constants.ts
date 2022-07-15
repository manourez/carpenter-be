import { CreatePerformanceDto } from '../features/ceiling-perf/dtos';
import { CreateCeilingDto } from '../features/ceiling/dtos';

export const INITIAL_CEILING: CreateCeilingDto[] = [
  {
    name: 'Moderna',
    imageUrl:
      'https://habitatpresto.wgcdn.net/devisprestofly/upload/article/faux-plafond-suspendu.png',
    reference: 'CX00256',
    price: 5000,
    height: 600,
    width: 500,
  },
  {
    name: 'Arithmetics',
    imageUrl:
      'https://www.blog-habitat-durable.com/wp-content/uploads/2022/03/Tout-savoir-sur-le-faux-plafond-suspendu.jpg',
    reference: 'CX00463',
    price: 7500,
    height: 350,
    width: 400,
  },
  {
    name: 'Esthetica',
    imageUrl:
      'https://www.maisonapart.com/images/auto/640-480-c/20140303_175632_02-panorama7.jpg',
    reference: 'CX00987',
    price: 1500,
    height: 800,
    width: 450,
  },
  {
    name: 'Basic',
    imageUrl:
      'https://www.travaux.com/images/cms/medium/d7a4f53c-2d88-4d53-bf08-a59379031624.jpg',
    reference: 'CX00147',
    price: 2300,
    height: 150,
    width: 400,
  },
  {
    name: 'Octar',
    imageUrl:
      'https://jardinage.lemonde.fr/images/dossiers/2018-09/faux-plafond-161905.jpg',
    reference: 'CX00328',
    price: 3100,
    height: 200,
    width: 250,
  },
];

export const INITIAL_PERFORMANCES: CreatePerformanceDto[] = [
  {
    name: 'Acoustique',
  },
  {
    name: 'Thermique',
  },
  {
    name: 'Résistance aux feux',
  },
  {
    name: 'Humidité',
  },
  {
    name: 'Reflexion à la lumière',
  },
];
