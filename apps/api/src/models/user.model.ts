/* eslint-disable @typescript-eslint/no-explicit-any */
import { Association, DataTypes, Model } from 'sequelize';
import { sequelizeClient } from '../libs';
import { interfaces, enums } from '@kasi-flow/shared';

/**
 * User database model representing system users
 * @class UserModel
 * @extends {Model<interfaces.IUser>}
 * @implements {interfaces.IUser}
 */
class UserModel extends Model<interfaces.IUser> implements interfaces.IUser {
  public id!: string;
  public avatarUrl!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public role!: enums.UserRole;
  public isVerified!: boolean;
  public isActive!: boolean;
  public isLocked!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static override associations: {
    admin: Association<UserModel, any>;
  };

  public static associate(models: any) {
    UserModel.hasOne(models.AdminModel, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'admin',
      onDelete: 'CASCADE',
    });
    UserModel.hasOne(models.CandidateModel, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'candidate',
      onDelete: 'CASCADE',
    });
    UserModel.hasOne(models.EmployerModel, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'employer',
      onDelete: 'CASCADE',
    });
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
    },
    avatarUrl: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(enums.UserRole)),
      allowNull: false,
      defaultValue: enums.UserRole.CANDIDATE,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeClient,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    indexes: [
      {
        name: 'user_role_idx',
        fields: ['role'],
      },
      {
        name: 'user_verification_idx',
        fields: ['isVerified'],
      },
      {
        name: 'user_status_idx',
        fields: ['isActive'],
      },
      {
        name: 'user_lock_idx',
        fields: ['isLocked'],
      },
      {
        name: 'user_status_composite_idx',
        fields: ['isVerified', 'isActive', 'isLocked'],
      },
      {
        name: 'user_created_at_idx',
        fields: ['createdAt'],
      },
    ],
  }
);

export { UserModel };
