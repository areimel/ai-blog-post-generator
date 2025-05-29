import { BlogPostRequest, Tone, Style, Audience } from '../../types';
import { GoogleGenAI } from '@google/genai';

// Mock the Google GenAI module
jest.mock('@google/genai');

const MockedGoogleGenAI = GoogleGenAI as jest.MockedClass<typeof GoogleGenAI>;

describe('geminiService', () => {
  // Mock instance of GoogleGenAI
  let mockAi: jest.Mocked<InstanceType<typeof GoogleGenAI>>;
  let mockModels: any;

  // Sample blog post request for testing
  const mockRequest: BlogPostRequest = {
    topic: 'The Future of AI',
    persona: 'Tech enthusiast and futurist',
    tone: Tone.INSPIRATIONAL,
    style: Style.INFORMATIVE,
    length: 500,
    audience: Audience.GENERAL_PUBLIC,
  };

  // Store original environment variable
  const originalApiKey = process.env.API_KEY;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Create mock models object
    mockModels = {
      generateContent: jest.fn(),
    };

    // Create mock AI instance
    mockAi = {
      models: mockModels,
    } as any;

    // Mock the GoogleGenAI constructor to return our mock instance
    MockedGoogleGenAI.mockImplementation(() => mockAi);
  });

  afterEach(() => {
    // Restore original API key after each test
    process.env.API_KEY = originalApiKey;
  });

  describe('generateBlogPost', () => {
    it('should generate a blog post successfully with all parameters', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Mock successful response
      const mockResponse = {
        text: 'This is a generated blog post about the future of AI...',
      };
      mockModels.generateContent.mockResolvedValue(mockResponse);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');
      
      // Call the function
      const result = await generateBlogPost(mockRequest);

      // Verify the result
      expect(result).toBe('This is a generated blog post about the future of AI...');

      // Verify GoogleGenAI was instantiated with correct API key
      expect(MockedGoogleGenAI).toHaveBeenCalledWith({ apiKey: 'test-api-key' });

      // Verify generateContent was called with correct parameters
      expect(mockModels.generateContent).toHaveBeenCalledWith({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: expect.stringContaining('Topic: "The Future of AI"'),
        config: {
          systemInstruction: expect.stringContaining('You are an expert blog post writer'),
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        },
      });

      // Verify persona is included in system instruction
      expect(mockModels.generateContent).toHaveBeenCalledWith(
        expect.objectContaining({
          config: expect.objectContaining({
            systemInstruction: expect.stringContaining('Tech enthusiast and futurist'),
          }),
        })
      );
    });

    it('should generate a blog post successfully without persona', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Create request without persona
      const requestWithoutPersona = { ...mockRequest, persona: undefined };

      // Mock successful response
      const mockResponse = {
        text: 'This is a generated blog post...',
      };
      mockModels.generateContent.mockResolvedValue(mockResponse);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function
      const result = await generateBlogPost(requestWithoutPersona);

      // Verify the result
      expect(result).toBe('This is a generated blog post...');

      // Verify system instruction doesn't include persona text
      expect(mockModels.generateContent).toHaveBeenCalledWith(
        expect.objectContaining({
          config: expect.objectContaining({
            systemInstruction: expect.not.stringContaining('Embody the following persona'),
          }),
        })
      );
    });

    it('should handle empty persona string', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Create request with empty persona
      const requestWithEmptyPersona = { ...mockRequest, persona: '   ' };

      // Mock successful response
      const mockResponse = {
        text: 'This is a generated blog post...',
      };
      mockModels.generateContent.mockResolvedValue(mockResponse);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function
      await generateBlogPost(requestWithEmptyPersona);

      // Verify system instruction doesn't include persona text for empty/whitespace persona
      expect(mockModels.generateContent).toHaveBeenCalledWith(
        expect.objectContaining({
          config: expect.objectContaining({
            systemInstruction: expect.not.stringContaining('Embody the following persona'),
          }),
        })
      );
    });

    it('should throw error when API key is not set', async () => {
      // Remove API key
      delete process.env.API_KEY;

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Attempt to call the function
      await expect(generateBlogPost(mockRequest)).rejects.toThrow(
        'API Key for Gemini is not configured. Please set the API_KEY environment variable.'
      );

      // Verify generateContent was not called
      expect(mockModels.generateContent).not.toHaveBeenCalled();
    });

    it('should throw error when API key is invalid', async () => {
      // Set up API key
      process.env.API_KEY = 'invalid-api-key';

      // Mock API key error
      const apiKeyError = new Error('API key not valid');
      mockModels.generateContent.mockRejectedValue(apiKeyError);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function and expect error
      await expect(generateBlogPost(mockRequest)).rejects.toThrow(
        'The Gemini API key is invalid. Please check your configuration.'
      );
    });

    it('should throw error when quota is exceeded', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Mock quota error
      const quotaError = new Error('You have exceeded your quota');
      mockModels.generateContent.mockRejectedValue(quotaError);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function and expect error
      await expect(generateBlogPost(mockRequest)).rejects.toThrow(
        'You have exceeded your Gemini API quota. Please check your usage or upgrade your plan.'
      );
    });

    it('should throw error when response text is empty', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Mock empty response
      const mockResponse = {
        text: null,
      };
      mockModels.generateContent.mockResolvedValue(mockResponse);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function and expect error
      await expect(generateBlogPost(mockRequest)).rejects.toThrow(
        'Received an empty response from the AI. Please try again or adjust your prompt.'
      );
    });

    it('should handle generic errors', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Mock generic error
      const genericError = new Error('Network error');
      mockModels.generateContent.mockRejectedValue(genericError);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function and expect error
      await expect(generateBlogPost(mockRequest)).rejects.toThrow(
        'Failed to generate blog post. The AI service might be temporarily unavailable or the request could not be processed. Check console for more details.'
      );
    });

    it('should trim whitespace from response text', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Mock response with whitespace
      const mockResponse = {
        text: '  \n  This is a generated blog post...  \n  ',
      };
      mockModels.generateContent.mockResolvedValue(mockResponse);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function
      const result = await generateBlogPost(mockRequest);

      // Verify the result is trimmed
      expect(result).toBe('This is a generated blog post...');
    });

    it('should include all request parameters in the user prompt', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Mock successful response
      const mockResponse = {
        text: 'Generated content',
      };
      mockModels.generateContent.mockResolvedValue(mockResponse);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function
      await generateBlogPost(mockRequest);

      // Verify all parameters are included in the contents (user prompt)
      const callArgs = mockModels.generateContent.mock.calls[0][0];
      expect(callArgs.contents).toContain('Topic: "The Future of AI"');
      expect(callArgs.contents).toContain('Tone: "Inspirational"');
      expect(callArgs.contents).toContain('Style: "Informative"');
      expect(callArgs.contents).toContain('Target Audience: "General Public"');
      expect(callArgs.contents).toContain('Approximate Length: "500 words"');
    });

    it('should use correct model name and configuration', async () => {
      // Set up API key
      process.env.API_KEY = 'test-api-key';

      // Mock successful response
      const mockResponse = {
        text: 'Generated content',
      };
      mockModels.generateContent.mockResolvedValue(mockResponse);

      // Import the function dynamically to get fresh module
      const { generateBlogPost } = await import('../geminiService');

      // Call the function
      await generateBlogPost(mockRequest);

      // Verify model and configuration
      expect(mockModels.generateContent).toHaveBeenCalledWith({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: expect.any(String),
        config: {
          systemInstruction: expect.any(String),
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        },
      });
    });
  });
}); 