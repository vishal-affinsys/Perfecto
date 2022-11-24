export const Endpoints = {
  paginatedData: page =>
    `https://api.pexels.com/v1/curated?page=${page}&per_page=40`,
};

class APIController {
  static options = {
    method: 'GET',
    headers: {
      Authorization: '563492ad6f91700001000001cb72da354d3247fabf6d0d7b8b2e9bf7',
    },
  };

  static async getData(url) {
    try {
      var data = await fetch(url, this.options);
      let response = await data.json();
      // this.logger(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static logger(message) {
    console.log('***************************************************');
    console.log(message);
    console.log('***************************************************');
  }
}

export default APIController;
