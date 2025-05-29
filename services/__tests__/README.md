# Testing for geminiService

This directory contains comprehensive unit tests for the `geminiService.ts` file.

## Test Coverage

The test suite provides excellent coverage:
- **97.05% statement coverage**
- **91.66% branch coverage** 
- **100% function coverage**
- **96.96% line coverage**

## Running Tests

Use the following npm/pnpm scripts:

```bash
# Run all tests
pnpm test

# Run tests in watch mode (re-runs on file changes)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

## Test Scenarios Covered

The `geminiService.test.ts` file includes tests for:

### ✅ Success Cases
- Generate blog post with all parameters including persona
- Generate blog post without persona
- Handle empty/whitespace persona strings
- Trim whitespace from API responses
- Verify all request parameters are included in prompts
- Verify correct model name and configuration

### ✅ Error Cases
- Missing API key (environment variable not set)
- Invalid API key (API key not valid error)
- Quota exceeded (quota error from API)
- Empty response from AI service
- Generic network/service errors

### ✅ API Integration
- Verify Google GenAI instance creation with correct API key
- Verify generateContent called with proper parameters
- Verify system instruction includes persona when provided
- Verify system instruction excludes persona when not provided/empty

## Test Architecture

- **Mocking Strategy**: Uses Jest to mock the `@google/genai` library
- **Environment Variables**: Tests manipulate `process.env.API_KEY` to test different scenarios
- **Dynamic Imports**: Uses dynamic imports to ensure fresh module state for each test
- **Isolated Tests**: Each test is isolated and doesn't affect others

## Mock Strategy

The tests mock:
1. `GoogleGenAI` constructor to return a mock instance
2. `ai.models.generateContent()` method to simulate API responses
3. Environment variables to test different API key scenarios

This allows testing all code paths without making actual API calls to Google's Gemini service.

## Debugging Tests

If tests fail:
1. Check that all required dependencies are installed (`pnpm install`)
2. Verify Jest configuration in `jest.config.js`
3. Look at console output for specific error messages
4. Use `pnpm test:watch` for easier debugging during development

## Adding New Tests

When adding new functionality to `geminiService.ts`:
1. Add corresponding test cases in `geminiService.test.ts`
2. Follow the existing pattern of setup/mock/execute/verify
3. Test both success and error scenarios
4. Run coverage to ensure new code is tested 