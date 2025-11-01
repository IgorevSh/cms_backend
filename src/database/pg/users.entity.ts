import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import {Roles} from './roles.entity'
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
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.BIGINT,
  })
  role_id: number;
  @BelongsTo(() => Roles)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  twoFactorCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  twoFactorExpiresAt: string;

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
