import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FindWordService } from './app.interface';
import { apiKeys } from './constants/apiKey';
import configuration from './config/configuration';

@Injectable()
export class AppService {

  async getWord({ query }: FindWordService): Promise<any> {
    try {
      const { word, apiKey } = query;

      if (!apiKeys.includes(apiKey)) {
        return Promise.reject({
          code: 400,
          message: 'API key is incorrect'
        });
      }

      // OXFORD OPTIONS
      const config = configuration();
      const app_id = config.oxford.appId;
      const app_key = config.oxford.apiKey;
      const fields = ['definitions', 'pronunciations', 'examples'] + '';
      const strictMatch = 'false';

      const { data } = await axios.get(`${config.oxford.apiUrl}/entries/en-us/${word}`, {
        params: {
          fields, strictMatch,
        },
        headers: {
          app_id, app_key,
        },
      });

      return data;
    } catch (err) {
      Promise.reject(err);
    }
  }
}
