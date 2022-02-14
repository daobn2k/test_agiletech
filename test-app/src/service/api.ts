import axios from 'axios';
import { API_END_POINT } from './contants';

export interface User {
  id?: any;
  name:string;
  email: string;
  position: string;
}

export interface IPagition{
    limit:number,
    page:number,
}
const getListUser = (data: IPagition) => {
  return axios.get(`${API_END_POINT}/users`, { params:data });
};
const addUser = (data: User) => {
  return axios.post(`${API_END_POINT}/users`, { data });
};

const editUser = (data: User) => {
  return axios.put(`${API_END_POINT}/users/${data?.id}`,{data})
};

const deleteUser = (data:User) =>{
  return axios.delete(`${API_END_POINT}/users/${data.id}`)

}
export { getListUser ,addUser , editUser , deleteUser};
