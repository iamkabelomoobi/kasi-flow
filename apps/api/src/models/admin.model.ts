/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model, Association } from 'sequelize';
import { sequelizeClient } from '../libs';
import { interfaces } from '@kasi-flow/shared';

/**
 * Admin database model representing system administrators
 * @class AdminModel
 * @extends {Model<interfaces.IAdmin>}
 * @implements {interfaces.IAdmin}
 */
class AdminModel extends Model<interfaces.IAdmin> implements interfaces.IAdmin {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static override associations: {
    user: Association<AdminModel, any>;
  };

  public static associate(models: any) {
    AdminModel.belongsTo(models.UserModel, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      hooks: true,
      constraints: true,
    });
  }
}

AdminModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize: sequelizeClient,
    modelName: 'Admin',
    tableName: 'Admins',
    timestamps: true,
    indexes: [
      {
        name: 'admin_user_id_idx',
        fields: ['userId'],
      },
      {
        name: 'admin_name_idx',
        fields: ['firstName', 'lastName'],
      },
    ],
  }
);

export { AdminModel };
