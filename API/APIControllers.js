import {createLogs} from '../helpers/Quality';

export const Endpoints = {
  paginatedData: page =>
    `https://api.pexels.com/v1/curated?page=${page}&per_page=40`,
  search: (page, query) =>
    `https://api.pexels.com/v1/search/?page=${page}&per_page=40&query=${query}`,
  popularVideo: page =>
    `https://api.pexels.com/v1/videos/popular/?page=${page}&per_page=40`,
  mockAPI: 'https://mocki.io/v1/5b4c29e0-775d-4a94-b5bb-dd98fc617961',
  searchVideo: (page, query) =>
    `https://api.pexels.com/videos/search?query=${query}&per_page=40&page=${page}`,
  mockAPIimages: 'https://mocki.io/v1/ba33d6ed-8c3a-4c4b-b448-01610807d392',
};

class APIController {
  static options = {
    method: 'GET',
    headers: {
      Authorization: '563492ad6f91700001000001cb72da354d3247fabf6d0d7b8b2e9bf7',
    },
  };

  static async getData(url) {
    const promise = await new Promise((resolve, reject) =>
      fetch(url, this.options)
        .then(res =>
          res.json().then(data => {
            this.logger(
              'options: ' +
                JSON.stringify(this.options, null, 2) +
                '\n\n' +
                'URL: ' +
                url +
                '\n\n' +
                'data: ' +
                JSON.stringify(data, null, 2),
            );
            resolve(data);
          }),
        )
        .catch(error => {
          this.logger(error);
          reject(`Something went wrong\n ${error}`);
        }),
    );
    return promise;
  }

  static async getToken(url) {
    const options = {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        Referer: 'https://kryptview.com/',
        'content-type': 'application/json',
        Origin: 'https://kryptview.com',
        Connection: 'keep-alive',
        Cookie:
          '__cf_bm=bGQEBrOZhgciPrKewSNqh0tv3ZESYS6T5fXYzCXEcrc-1670047674-0-Ac+kWpmLHc32iJlH95lDtwPlYpCQGLuohl5r9tH6zOPLU7XqHRE8I6lMN9LrZ8mS/WwlZZYB3m4KvvquJbJgoF8zYlX5NCcj2xNT+PW/bGQ6rnHZvezq7eKVpI1e1Q76IkmiHlEYYqX4f3LSjId0X/k=',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        TE: 'trailers',
      },
      body: JSON.stringify({
        operationName: 'GetAllTokensDetails',
        variables: {
          page: 1,
          pageSize: 20,
          filter: 'avg-rating-desc',
        },
        query:
          'query GetAllTokensDetails($page: Int!, $pageSize: Int!, $filter: String) {\n  getAllTokensDetails(page: $page, pageSize: $pageSize, filter: $filter) {\n    success\n    message\n    count\n    tokens {\n      identity {\n        id\n        name\n        symbol\n        reference\n        coinGeckoImage\n        validatedResearchCount\n        currentTokenRating {\n          rating {\n            name\n            type\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      market {\n        image\n        price\n        h24\n        d7\n        marketCap\n        volume\n        circulatingSupply\n        sparkline\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
      }),
    };

    const promise = await new Promise((resolve, reject) =>
      fetch('https://api.kryptview.com/v1/graphql', options)
        .then(res =>
          res.json().then(data => {
            console.log(data);
            resolve(data);
          }),
        )
        .catch(error => {
          reject(`Something went wrong\n ${error}`);
        }),
    );
    return promise;
  }

  static async getDataUsingPromise(url) {
    return new Promise((resolve, reject) => {
      this.getData(url)
        .then(response => {
          resolve(response);
          this.logger(url + 'called\n' + JSON.stringify(response));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static logger(message) {
    createLogs(message);
  }
}

export default APIController;
