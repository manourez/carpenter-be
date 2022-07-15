import { DeleteResult, UpdateResult } from 'typeorm';

export class RepositoryMock<T extends { id: number; [key: string]: any }> {
  private db: T[] = [];

  create(data: Partial<T>) {
    return { ...data, id: this.db.length + 1 } as T;
  }

  async save(entity: T) {
    this.db = [...this.db, entity];

    return Promise.resolve(entity);
  }

  async findOneBy(
    criteria: Partial<T> | { where: Partial<T> } | number | string,
  ) {
    return this.db.find((entity) =>
      Object.keys(criteria).every((key) => entity[key] === criteria[key]),
    );
  }

  async findOne(
    criteria: Partial<T> | { where: Partial<T> } | number | string,
  ) {
    if (typeof criteria === 'number' || typeof criteria === 'string') {
      return this.db.find((entity) => entity.id === +criteria);
    } else if (criteria.where) {
      return this.db.find((entity) =>
        Object.keys(criteria.where).every(
          (key) => entity[key] === criteria.where[key],
        ),
      );
    } else {
      return this.db.find((entity) =>
        Object.keys(criteria).every((key) => entity[key] === criteria[key]),
      );
    }
  }

  async find() {
    return this.db;
  }

  async findAndCount(options) {
    const criteria = options.where;
    if (!criteria || (criteria && Object.keys(criteria).length === 0)) {
      return [this.db, this.db.length];
    }

    let value: any;
    const field = Object.keys(criteria)[0];

    if (criteria[field].name) {
      value = criteria[field].name._value;
      const opts = { [field]: value };
      const result = this.db.filter((entity) =>
        Object.keys(opts).every((key) => entity[key].name !== value),
      );

      return [result, result.length];
    } else if (isNaN(criteria[field]._value)) {
      value = criteria[field]._value?.replaceAll('%', '');
    } else {
      value = criteria[field]._value;
    }
    const opts = { [field]: value };
    const result = this.db.filter((entity) =>
      Object.keys(opts).every((key) => entity[key] === opts[key]),
    );

    return [result, result.length];
  }

  async update(id: string, body: Partial<T>) {
    const entity = this.db.find((entity) => entity.id === +id);
    const result = new UpdateResult();
    result.generatedMaps = [];
    result.raw = [];

    if (entity) result.affected = 1;
    else {
      result.affected = 0;
      return result;
    }

    const updatedEntity = { ...entity, ...body } as T;
    this.db = this.db.map((d) => (d.id === +id ? updatedEntity : d));
    return result;
  }

  async delete(id: string | number[]) {
    const dbLength = this.db.length;
    if (Array.isArray(id))
      this.db = this.db.filter((entity) => !id.includes(entity.id));
    else this.db = this.db.filter((entity) => entity.id !== +id);

    const result = new DeleteResult();
    result.raw = [];
    if (dbLength === this.db.length) result.affected = 0;
    else result.affected = dbLength - this.db.length;

    return result;
  }

  async softDelete(id: number) {
    const dbLength = this.db.length;
    this.db = this.db.filter((entity) => entity.id !== id);
    const result = new UpdateResult();
    result.affected = dbLength === this.db.length ? 0 : 1;
    return result;
  }

  async remove(entity: T) {
    return entity;
  }

  clear() {
    this.db = [];
  }
}
