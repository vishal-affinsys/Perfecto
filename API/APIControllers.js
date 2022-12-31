const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

class AuthenticationBuilder {
  constructor(token = null) {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };
  }
}

class BodyBuilder extends AuthenticationBuilder {
  constructor(body = null, token = null) {
    super(token);
    this.options = {
      headers: this.headers,
      body: body !== null ? JSON.stringify(body) : null,
    };
  }
}

class MethodBuilder extends BodyBuilder {
  constructor(body = null, token = null, method) {
    super(body, token);
    this.options = {...this.options, method: method};
  }
}

class BuildOptions extends MethodBuilder {
  constructor(body = null, token = null, method) {
    super(body, token, method);
    this.options = this.options;
  }
}

class RequestBuilder extends BuildOptions {
  constructor({url, method, token = null, body = null}) {
    super(body, token, method);
    this.request = {
      url: url,
      options: this.options,
    };
  }
  async sendRequest() {
    const promise = await new Promise(async (resolve, reject) => {
      return fetch(this.request.url, this.options)
        .then(res =>
          res
            .json()
            .then(data => resolve({res, data, message: 'success'}))
            .catch(e => {
              resolve({res, data: null, message: `failed: ${e}`});
            }),
        )
        .catch(e => {
          resolve({res: {status: null}, data: null, message: `failed: ${e}`});
        });
    });
    return new ResponseBuilder({
      request: this.request,
      response: {
        body: promise.res,
        data: promise.data,
      },
      status: {
        error: promise.res.status !== 200,
        message: promise.message,
        code: promise.res.status,
      },
    });
  }
  showRequest() {
    console.log('\n\n---------------------REQUEST----------------------------');
    console.log(JSON.stringify(this.request, null, 2));
    console.log('---------------------REQUEST-END------------------------\n\n');
  }
}

class ResponseBuilder {
  constructor({request, response, status}) {
    this.request = {
      url: request.url,
      options: request.options,
    };
    this.response = {body: response.body, data: response.data};
    this.status = {
      error: status.error,
      message: status.message,
      code: status.code,
    };
  }
  showResponse() {
    console.log('\n\n---------------------RESPONSE--------------------------');
    console.log(JSON.stringify(this.response, null, 2));
    console.log('---------------------RESPONSE-END----------------------\n\n');
  }
}

export {RequestBuilder, ResponseBuilder};

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

export const BaseAPIHandler = {
  request: async function (url) {
    const res = new RequestBuilder({
      method: Method.GET,
      url: url,
      token: '563492ad6f91700001000001cb72da354d3247fabf6d0d7b8b2e9bf7',
    });
    const data = await res.sendRequest();
    console.log(data.status);
    return data.response.data ?? data.status;
  },
  getData: async function (url) {
    const promise = await BaseAPIHandler.request(url);
    return promise;
  },
  logger: function (message) {
    console.log('------------------Logger--------------------');
    console.log(message);
    console.log('------------------Logger-end--------------------');
  },
};
