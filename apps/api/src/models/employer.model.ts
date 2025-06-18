/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model, Association } from 'sequelize';
import { UserModel } from './user.model';
import { sequelizeClient } from '../libs';
import { IModelDictionary } from '../interfaces';
import { interfaces } from '@kasi-flow/shared';

/**
 * Employer database model representing companies/organizations
 * @class EmployerModel
 * @extends {Model<interfaces.IEmployer>}
 * @implements {interfaces.IEmployer}
 */
class EmployerModel
  extends Model<interfaces.IEmployer>
  implements interfaces.IEmployer
{
  public id!: string;
  public name!: string;
  public industry!: string;
  public websiteUrl?: string;
  public location?: string;
  public description?: string;
  public size?: number;
  public foundedIn?: number;
  public isVerified?: boolean;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly user?: UserModel;

  public static override associations: {
    user: Association<EmployerModel, any>;
  };

  public static associate(models: IModelDictionary) {
    EmployerModel.belongsTo(models.UserModel, {
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

EmployerModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    websiteUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2, 100],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 2000],
      },
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
    foundedIn: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1800,
        max: new Date().getFullYear(),
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: 'Employer',
    tableName: 'Employers',
    timestamps: true,
    indexes: [
      {
        name: 'employer_user_id_idx',
        fields: ['userId'],
      },
      {
        name: 'employer_industry_idx',
        fields: ['industry'],
      },
      {
        name: 'employer_location_idx',
        fields: ['location'],
      },
      {
        name: 'employer_verified_idx',
        fields: ['isVerified'],
      },
      {
        name: 'employer_founded_idx',
        fields: ['foundedIn'],
      },
      {
        name: 'employer_size_idx',
        fields: ['size'],
      },
    ],
  }
);

export { EmployerModel };
