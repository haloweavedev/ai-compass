# Initial Setup Guide

## Prerequisites
- Node.js ≥ 20.0.0
- AWS CLI configured
- AWS IAM user with appropriate permissions
- Git repository

## Step 1: Local Development Setup

1. **Create new Remix project:**
   ```bash
   npx create-remix@latest ai-compass
   cd ai-compass
   ```
2. **Initialize SST:**
   ```bash
   npx sst@latest init
   ```
3. **Install dependencies:**
   ```bash
   npm install @clerk/remix
   ```

## Step 2: AWS Configuration

1. **Install AWS CLI**
2. **Create IAM User:**
   - Go to AWS Console → IAM
   - Create a new user with programmatic access
   - Attach the `AdministratorAccess` policy (for development purposes)
3. **Configure AWS CLI:**
   ```bash
   aws configure
   # Enter your AWS Access Key ID
   # Enter your AWS Secret Access Key
   # Region: us-east-1
   # Output format: json
   ```

## Step 3: SST Configuration

1. **Create `sst.config.ts`:**
   ```typescript
   export default $config({
     app(input) {
       return {
         name: "ai-compass",
         region: "us-east-1",
         home: "aws",
       };
     },
     async run() {
       const web = new sst.aws.Remix("web", {
         environment: {
           CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
           CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
         },
       });
       return {
         websiteUrl: web.url,
       };
     },
   });
   ```

## Step 4: Development Workflow

1. **Local development:**
   ```bash
   npm run dev    # Terminal 1
   npx sst dev    # Terminal 2
   ```
2. **Deployment:**
   ```bash
   git add .
   git commit -m "feat: initial commit"
   git push origin main
   npx sst deploy
   ```
3. **After deployment:**
   - Get the CloudFront URL from SST output.
   - Add the URL to Clerk allowed URLs.
   - Test the authentication flow.

## Step 5: Git Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feat/auth-setup
   ```
2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: implement clerk auth"
   ```
3. **Push and deploy:**
   ```bash
   git push origin feat/auth-setup
   npx sst deploy
   ```

## Common Issues

### Application Error on CloudFront:
- Check Clerk environment variables.
- Verify URL in the Clerk dashboard.
- Check SST logs:
  ```bash
  npx sst logs
  ```

### Local development issues:
- Clear `.sst` cache:
  ```bash
  rm -rf .sst
  ```
- Restart SST dev server.