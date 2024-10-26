import { Model, Optional } from 'sequelize';

export interface IBaseModel {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class BaseModel<T extends IBaseModel, K extends Optional<T, 'id'>> extends Model<T, K> implements IBaseModel {
    public id!: number;
    public readonly createdAt?: Date | undefined;
    public readonly updatedAt?: Date | undefined;
}