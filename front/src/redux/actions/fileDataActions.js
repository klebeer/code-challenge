import { getFilesData } from '../../api';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = data => ({ type: FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = error => ({ type: FETCH_DATA_FAILURE, payload: error });

export const fetchData = () => {
  return function(dispatch) {
    dispatch(fetchDataRequest());
    getFilesData()
      .then(response => {
        const flattenedData = response.data.flat();
        const sortedData = flattenedData.sort((a, b) => a.file.localeCompare(b.file));
        dispatch(fetchDataSuccess(sortedData));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};
