import axios from 'axios';
import qs from 'qs';

//登录

export const requestLogin = params => {
  return axios.post(
    `${axios.server}/signIn.do`,
    qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  ).then(res => {
    return res;
  });
};

//菜单
export const getRoutersList = params=>{
  var paramsObj = params||{};

  paramsObj.ctoken = window.localStorage.getItem('ctoken')||'';
  return axios.get(`${axios.server}/springmvc/menu/loadMenu.do`,{
    params:paramsObj
  })

}
//验证码
export const verifyImage=`${axios.server}/verifyImage.do`;

//export  const requestLogin = params => {
//   return axios.post(`${axios.mock}/login`, params).then(res => res.data);
// };


// export const getRoutersList = params => {
//   return axios.get(`${axios.mock}/-/router/get`, {
//     params: params
//   });
// };

export const getUserList = params => {
  return axios.get(`${axios.mock}/-/user/list`, {
    params: params
  });
};

export const removeUser = params => {
  return axios.get(`${axios.mock}/-/user/remove`, {
    params: params
  });
};

export const editUser = params => {
  return axios.get(`${axios.mock}/-/user/edit`, {
    params: params
  });
};

export const addUser = params => {
  return axios.get(`${axios.mock}/-/user/add`, {
    params: params
  });
};

export const getUserListPage = params => {
  return axios.get(`${axios.mock}/-/user/listpage`, {
    params: params
  });
};

export const getMainList = params => {
  return axios.get(`${axios.mock}/-/getMainList`, {
    params: params
  });
};