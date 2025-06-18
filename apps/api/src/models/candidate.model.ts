/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model, Association } from 'sequelize';
import { sequelizeClient } from '../libs';
import { interfaces } from '@kasi-flow/shared';

/**
 * Candidate database model representing job candidates
 * @class CandidateModel
 * @extends {Model<interfaces.ICandidate>}
 * @implements {interfaces.ICandidate}
 */
class CandidateModel
  extends Model<interfaces.ICandidate>
  implements interfaces.ICandidate
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public title?: string;
  public skills?: string[];
  public isEmployed?: boolean;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static override associations: {
    user: Association<CandidateModel, any>;
  };

  public static associate(models: any) {
    CandidateModel.belongsTo(models.UserModel, {
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

CandidateModel.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    isEmployed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    modelName: 'Candidate',
    tableName: 'Candidates',
    timestamps: true,
    indexes: [
      {
        name: 'candidate_user_id_idx',
        fields: ['userId'],
      },
      {
        name: 'candidate_name_idx',
        fields: ['firstName', 'lastName'],
      },
      {
        name: 'candidate_title_idx',
        fields: ['title'],
      },
      {
        name: 'candidate_employment_idx',
        fields: ['isEmployed'],
      },
      {
        name: 'candidate_skills_gin_idx',
        fields: ['skills'],
        using: 'GIN',
      },
    ],
  }
);

export { CandidateModel };
