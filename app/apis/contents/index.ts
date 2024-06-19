import { catFollowId, commentLikeId, commentProps } from '@/types/api';
import { RegisterCatObjProps, UpdateCatObjProps } from '@/types/content';
import fetchApi from '../fetchApi';

export const getContent = async (contentId: string | null) => {
  const url = `/contents/${contentId}`;
  return (await fetchApi(url, 'GET')).data;
};

export const postContent = async (data: RegisterCatObjProps) => {
  return await fetchApi<RegisterCatObjProps>(`/contents`, 'POST', data);
};

export const putContent = async (
  data: UpdateCatObjProps,
  contentId: string | undefined,
) => {
  const url = `/contents/${contentId}`;
  return await fetchApi<UpdateCatObjProps>(url, 'PUT', data);
};

export const deleteContent = async (contentId: string | null) => {
  const url = `/contents/${contentId}`;
  return await fetchApi(url, 'DELETE');
};

export const getComments = async (contentId: string | null) => {
  const url = `/contents/${contentId}/comments?sort=likes:desc&page=1&size=1000&created_at=desc`;
  return (await fetchApi(url, 'GET')).data;
};

export const postComment = async (
  contentId: string | null,
  data: commentProps,
) => {
  const url = `/contents/${contentId}/comments`;
  return await fetchApi<commentProps>(url, 'POST', data);
};

export const postFollow = async (data: catFollowId) => {
  return await fetchApi<catFollowId>(`/contents/follow`, 'POST', data);
};

export const deleteFollow = async (data: catFollowId) => {
  return await fetchApi<catFollowId>(`/contents/follow`, 'DELETE', data);
};

export const postLike = async (data: commentLikeId, contentId: string) => {
  const url = `/contents/${contentId}/comments/likes`;
  return await fetchApi<commentLikeId>(url, 'POST', data);
};

export const deleteLike = async (data: commentLikeId, contentId: string) => {
  const url = `/contents/${contentId}/comments/likes`;
  return await fetchApi<commentLikeId>(url, 'DELETE', data);
};
