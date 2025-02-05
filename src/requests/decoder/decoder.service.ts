import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GeminiResponse } from '../interfaces/gemini.interface';
import { ChatgptResponse } from '../interfaces/chatgpt.interfac';

@Injectable()
export class DecoderService {
  decodeEngineResponse(dataResponse: GeminiResponse | ChatgptResponse) {
    const jsonRegex = /{[\s\S]*}/; // Regular expression to find a JSON block
    //(typeof dataResponse !== 'string' && 'candidates' in dataResponse
    if (
      'candidates' in dataResponse &&
      'modelVersion' in dataResponse &&
      dataResponse.modelVersion.includes('gemini')
    ) {
      //Gemini
      const textResponse = dataResponse.candidates[0].content.parts[0].text;
      const match = textResponse.match(jsonRegex);
      if (match) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(match[0]);
      } else {
        throw new Error('No JSON found in response text');
      }
    } else {
      throw new InternalServerErrorException('Not Engine supported');
    }
  }
}
