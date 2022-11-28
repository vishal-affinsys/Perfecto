// import APIController from '../API/APIControllers';
// import * as Actions from './Actions';

// export const fetchDataAction = url => dispatch => {
//   return new Promise((resolve, reject) => {
//     dispatch({
//       type: Actions.FETCH_USER,
//     });
//     APIController.getDataUsingPromise(url)
//       .then(response => {
//         dispatch({
//           type: Actions.FETCH_USER_SUCCESS,
//           payload: response.data,
//         });
//         resolve(response);
//       })
//       .catch(err => {
//         dispatch({
//           type: Actions.FETCH_USER_ERROR,
//         });
//         reject(err);
//       });
//   });
// };
