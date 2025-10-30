import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'pages',
  timestamps: false,
  modelName: 'Pages',
})
export class Pages extends Model {
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
  route: string;

  @Column({
    type: DataType.TEXT,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  visible: boolean;

  @Column({
    type: DataType.BIGINT,
  })
  parent_id: number;

  @Column({
    type: DataType.TEXT,
    defaultValue: false,
  })
  meta: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  auth_required: boolean;
}
