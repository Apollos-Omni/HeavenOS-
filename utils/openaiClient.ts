import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Secure your key with env variables
});

const openai = new OpenAIApi(configuration);

export default openai;
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Secure your key with env variables
});

const openai = new OpenAIApi(configuration);

export default openai;
