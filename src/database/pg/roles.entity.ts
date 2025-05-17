import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'roles',
  timestamps: false,
  modelName: 'Roles',
})
export class Roles extends Model {
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
  structure: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  audit_access: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  bid_access: boolean;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  users_access: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  roles_access: boolean;
}
