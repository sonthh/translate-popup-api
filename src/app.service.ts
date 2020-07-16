import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FindWordService } from './app.interface';
import { apiKeys } from './constants/apiKey';
import configuration from './config/configuration';
import * as cheerio from 'cheerio';
import { getBase64Image } from './helpers/get';

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
      if (err.response) {
        const { data, status } = err.response;
        err = {
          code: status,
          message: data,
        }
      }
      return Promise.reject(err);
    }
  }

  async webCrawler(): Promise<any> {
    const url = 'https://gaigoidanang.com/huong-mai-face-xinh-body-nuot-na-diem-10-cho-service-va-thai-do-phuc-vu/';
    try {
      const { data } = await axios.get(url);

      const $ = cheerio.load(data);
      $('.entry-content img').each(async (index, elem) => {
        const src = elem.attribs['data-lazy-src'];

        const xxx = await getBase64Image(src);
        console.log(xxx);
        console.log('=============');
        
        

      });


      return null;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
