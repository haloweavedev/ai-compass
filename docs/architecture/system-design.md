# AI-Compass System Design

## System Architecture Overview

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Web["Web Application\n(Remix + React)"]
        Widget["Embeddable Form/Chatbot\n(iFrame Component)"]
    end

    subgraph "API Layer"
        API["API Gateway"]
        AIService["OpenAI Integration"]
    end

    subgraph "Authentication Layer"
        Clerk["Clerk Auth Service"]
        JWTVerify["JWT Verification"]
    end

    subgraph "Application Layer"
        ExpertAI["Expert Context Service\n(Lambda)"]
        FormEngine["Form Processing Engine\n(Lambda)"]
        Notifications["Email/Calendar Service\n(Lambda)"]
    end

    subgraph "Data Layer"
        DDB["DynamoDB"]
        S3["S3 Storage\n(Media & Backups)"]
    end

    Web --> API
    Widget --> API
    API --> Clerk
    API --> AIService
    API --> ExpertAI
    API --> FormEngine
    ExpertAI --> DDB
    FormEngine --> DDB
    AIService --> ExpertAI
    AIService --> FormEngine
    FormEngine --> Notifications
    Clerk --> JWTVerify
    JWTVerify --> API
```

## Component Breakdown

### 1. Authentication Flow (Clerk)

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend (Remix)
    participant C as Clerk
    participant BE as Backend (Lambda)
    participant DB as DynamoDB

    U->>FE: Access Application
    FE->>C: Initialize Clerk
    C->>FE: Return Auth State
    
    alt Not Authenticated
        FE->>C: Show Sign In/Up Modal
        U->>C: Authenticate
        C->>FE: Return Session Token
    end
    
    FE->>BE: API Request + Session Token
    BE->>C: Verify Token
    C->>BE: Token Valid
    BE->>DB: Process Request
    DB->>BE: Return Data
    BE->>FE: Return Response
```

### 2. Data Models

#### Experts Table
```typescript
interface Expert {
  pk: string;                 // expert#${userId}
  sk: string;                 // metadata
  clerkUserId: string;        // Clerk user identifier
  email: string;
  name: string;
  expertise: string[];
  aiPersona: {
    context: string;         // AI-generated expert context
    understandingScore: number;
    lastUpdated: number;
  };
  settings: {
    widgetTheme: object;
    branding: object;
    notifications: object;
  };
}
```

#### Submissions Table
```typescript
interface Submission {
  pk: string;                // submission#${id}
  sk: string;                // expert#${expertId}
  businessDetails: {
    name: string;
    email: string;
    requirements: string;
  };
  aiResponse: {
    analysis: string;
    actionPlan: string[];
    qualification: {
      score: number;
      factors: string[];
    };
  };
  status: 'new' | 'processed' | 'scheduled';
  timestamp: number;
}
```

### 3. Authentication & Security

#### Clerk Integration
- User management through Clerk dashboard
- JWT-based authentication
- Social login providers (Google, GitHub)
- Session management
- Role-based access control (RBAC)

#### Security Measures
```mermaid
graph LR
    A[API Request] --> B{Clerk JWT Verification}
    B -->|Valid| C[Protected Route]
    B -->|Invalid| D[401 Unauthorized]
    C --> E{Permission Check}
    E -->|Authorized| F[Process Request]
    E -->|Unauthorized| G[403 Forbidden]
```

## Infrastructure (SST + AWS)

### AWS Services Used
- CloudFront for CDN
- Lambda for serverless functions
- DynamoDB for database
- S3 for file storage
- SST for infrastructure management

### Deployment Flow

```mermaid
graph LR
    A[Code Push] --> B[GitHub Actions]
    B --> C{Environment?}
    C -->|Development| D[SST Dev]
    C -->|Production| E[SST Deploy]
    D --> F[Dev Environment]
    E --> G[Production Environment]
    G --> H[CloudFront]
```

## API Endpoints

### Expert Management
```
/api/v1/
  ├── auth/
  │   └── verify-session
  ├── experts/
  │   ├── profile
  │   ├── ai-persona
  │   └── leads
  ├── forms/
  │   ├── submit
  │   ├── action-plan
  │   └── schedule
  └── widgets/
      ├── config
      └── analytics
```

## Performance Optimization

### Caching Strategy
- CloudFront caching for static assets
- DynamoDB DAX for frequently accessed data
- Client-side caching of user session

### Monitoring
- CloudWatch for logs and metrics
- Clerk analytics for auth events
- Custom analytics for business metrics

## Development Workflow

### Local Development
1. Start Remix development server
2. Run SST in development mode
3. Connect to local DynamoDB
4. Use Clerk development keys

### Production Deployment
1. Code push to main branch
2. SST deployment
3. CloudFront invalidation
4. Environment variable updates

## Error Handling

### Client-Side
- Clerk authentication errors
- Form validation errors
- API response errors

### Server-Side
- Lambda error monitoring
- DynamoDB error handling
- Authentication failures

## Future Enhancements

### Phase 1
- [ ] Enhanced analytics dashboard
- [ ] Multi-language support
- [ ] Advanced form customization

### Phase 2
- [ ] AI model fine-tuning
- [ ] Real-time chat support
- [ ] Integration marketplace