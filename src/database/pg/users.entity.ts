import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'users',
  timestamps: false,
  modelName: 'Users',
})
export class Users extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  mail: string;

  @Column({
    type: DataType.TEXT,
  })
  phone: string;

  @Column({
    type: DataType.TEXT,
  })
  shadow: string;

  @Column({
    type: DataType.BIGINT,
  })
  role_id: number;

  @Column({
    type: DataType.TEXT,
  })
  refresh_token: string;

  @Column({
    type: DataType.TEXT,
  })
  auth_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.TEXT,
    defaultValue: false,
  })
  extra: string;
}
