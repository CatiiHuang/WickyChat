import { request } from '@/util/request.js';

export const userLoginAPI = (payLoad) =>
  request({
    url: '/api/web/login',
    method: 'POST',
    data: payLoad,
  });

export const getUserInfoAPI = (payLoad) =>
  request({
    url: '/api/web/userInfo',
    method: 'POST',
    data: payLoad,
  });

export const getModelListAPI = () =>
  request({
    url: '/api/v1/models',
    method: 'GET',
  });

export const getTextChatListAPI = (payLoad) =>
  request({
    url: '/api/web/getChatList',
    method: 'GET',
    params: payLoad,
  });

export const getChatDetailAPI = (payLoad) =>
  request({
    url: '/api/web/getChatDetail',
    method: 'GET',
    params: payLoad,
  });
