import { IModelDictionary } from '../interfaces';
import { AdminModel } from './admin.model';
import { CandidateModel } from './candidate.model';
import { EmployerModel } from './employer.model';
import { UserModel } from './user.model';

const models: IModelDictionary = {
  AdminModel,
  CandidateModel,
  EmployerModel,
  UserModel,
};

const associateModels = () => {
  Object.values(models).forEach((model) => {
    if ('associate' in model && typeof model.associate === 'function') {
      model.associate(models);
    }
  });
};

export { models, associateModels };
