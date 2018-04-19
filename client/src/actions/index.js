import axios from 'axios';
import { GET_USER } from './types';

//action creator
export const getUser = () => {
  return function(dispatch) {
    axios.get('/api/user').then(res => dispatch({
      type: GET_USER, payload: res
    }));
  }  
};