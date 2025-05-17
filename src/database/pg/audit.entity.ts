import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'audit',
  timestamps: false,
  modelName: 'Audit',
})
export class Audit extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  id: number;

  @Column({
    type: DataType.BIGINT,
  })
  catalog_id: number;

  @Column({
    type: DataType.BIGINT,
  })
  user_id: number;

  @Column({
    type: DataType.TIME,
  })
  timestamp: number | string;

  @Column({
    type: DataType.STRING,
  })
  action: string;

  @Column({
    type: DataType.TEXT,
  })
  result: string;

  @Column({
    type: DataType.TEXT,
  })
  comment: string;
}
