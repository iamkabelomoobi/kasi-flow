Here's a complete folder structure for your TypeScript GraphQL job board application with explanations for each component:

```
job-board-api/
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts            # App entry point
│   ├── app.ts              # Express/Apollo server setup
│   ├── config/
│   │   ├── db.ts          # Database connection
│   │   ├── server.ts      # Apollo config
│   │   └── constants.ts   # App constants
│   ├── types/             # TypeScript type definitions
│   │   ├── context.ts     # GraphQL context type
│   │   ├── job.ts         # Job-related types
│   │   ├── user.ts        # User types
│   │   └── index.ts       # Aggregated types
│   ├── schemas/
│   │   ├── job.graphql    # Job type definitions
│   │   ├── user.graphql   # User type definitions
│   │   ├── company.graphql
│   │   └── index.ts       # Schema stitching
│   ├── models/            # MongoDB models
│   │   ├── Job.ts
│   │   ├── User.ts
│   │   ├── Company.ts
│   │   └── index.ts       # Model exports
│   ├── resolvers/         # GraphQL resolvers
│   │   ├── job/
│   │   │   ├── queries.ts
│   │   │   ├── mutations.ts
│   │   │   └── index.ts   # Job resolver aggregation
│   │   ├── user/
│   │   ├── company/
│   │   └── index.ts       # Combined resolvers
│   ├── services/          # Business logic
│   │   ├── job.service.ts
│   │   ├── user.service.ts
│   │   └── company.service.ts
│   ├── middleware/        # Express middleware
│   │   ├── auth.ts       # Authentication
│   │   └── error.ts      # Error handling
│   ├── utils/            # Utility functions
│   │   ├── auth.ts       # Auth utilities
│   │   ├── validators.ts # Validation helpers
│   │   └── logger.ts     # Logging
│   └── tests/            # Test files
│       ├── unit/
│       └── integration/
├── .dockerignore
├── Dockerfile             # For containerization
└── docker-compose.yml     # For local development
```

### Key File Implementations:

1. **Database Connection (src/config/db.ts)**
```typescript
import mongoose from 'mongoose';
import { MONGO_URI } from './constants';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
```

2. **GraphQL Context (src/types/context.ts)**
```typescript
import { User } from '../models/User';

export interface Context {
  user: User | null;
  token: string | null;
}
```

3. **Job Service (src/services/job.service.ts)**
```typescript
import { Job } from '../models/Job';
import { JobInput } from '../types/job';

export class JobService {
  static async createJob(input: JobInput) {
    return Job.create(input);
  }

  static async getJobs(limit: number, offset: number) {
    return Job.find().skip(offset).limit(limit).populate('company');
  }

  static async searchJobs(keyword: string) {
    return Job.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    });
  }
}
```

4. **Auth Middleware (src/middleware/auth.ts)**
```typescript
import { Context } from '../types/context';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const authMiddleware = async ({ req }): Promise<Context> => {
  const token = req.headers.authorization || '';
  try {
    if (!token) return { user: null, token: null };
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.userId);
    
    return { user, token };
  } catch (error) {
    throw new GraphQLError('Invalid or expired token', {
      extensions: { code: 'UNAUTHENTICATED' }
    });
  }
};
```

5. **Main App File (src/app.ts)**
```typescript
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { connectDB } from './config/db';
import { authMiddleware } from './middleware/auth';

export async function createApp() {
  await connectDB();
  
  const app = express();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    csrfPrevention: true,
    cache: 'bounded'
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  return app;
}
```

### Recommended NPM Scripts (package.json)
```json
{
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "serve": "node dist/index.js",
    "test": "jest",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write .",
    "generate-types": "graphql-codegen --config codegen.yml"
  }
}
```

### Additional Recommended Files:

1. **codegen.yml** (GraphQL Code Generator)
```yaml
overwrite: true
schema: "src/schemas/**/*.graphql"
documents: null
generates:
  src/types/generated.ts:
    plugins:
      - "typescript"
      - "typescript-resolvers"
    config:
      contextType: "../types/context#Context"
      mappers:
        Job: "../models/Job#IJob"
        User: "../models/User#IUser"
```

2. **.env.example**
```env
MONGO_URI=mongodb://localhost:27017/jobboard
JWT_SECRET=your_jwt_secret_here
PORT=4000
NODE_ENV=development
```

This structure provides:
- Clear separation of concerns
- Type safety throughout the application
- Modular design for scalability
- Proper environment configuration
- Ready for both development and production
- Testability with dedicated test directories
- Containerization support

Would you like me to elaborate on any specific part or provide implementation details for any other component?