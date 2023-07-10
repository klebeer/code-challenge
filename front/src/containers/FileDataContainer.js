import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions/fileDataActions';
import FileDataGrid from '../components/FileDataGrid';

function FileDataContainer() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const error = useSelector(state => state.error);

  const fetchDataWithFilter = useCallback((filter) => {
    dispatch(fetchData(filter));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return <FileDataGrid data={data} onFilter={fetchDataWithFilter} />;
}

export default FileDataContainer;
