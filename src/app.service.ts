import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FindWordService } from './app.interface';
import { apiKeys } from './constants/apiKey';

const app_id = '9283dca3';
const app_key = '2252c24e1a5aeb9b623401a67539f7e0';
const fields = ['definitions', 'pronunciations', 'examples'] + '';
const strictMatch = 'false';

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

      const { data } = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`, {
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
