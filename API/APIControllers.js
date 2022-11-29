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
            // console.log(data);
            resolve(data);
          }),
        )
        .catch(error => {
          console.log(error);
          reject(`Something went wrong\n ${error}`);
        }),
    );
    // console.log(promise);
    return promise;
    // try {
    //   var data = await fetch(url, this.options);
    //   let response = await data.json();
    //   this.logger(response);
    //   return response;
    // } catch (err) {
    //   console.log(err);
    // }
  }

  static async getDataUsingPromise(url) {
    return new Promise((resolve, reject) => {
      this.getData(url)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static logger(message) {
    console.log('***************************************************');
    console.log(message);
    console.log('***************************************************');
  }
}

export default APIController;
