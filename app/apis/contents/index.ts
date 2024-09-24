import { catFollowId, commentLikeId, commentProps } from '@/types/api';
import { ContentReportProps, RegisterCatObjProps, UpdateCatObjProps } from '@/types/content';
import fetchApi from '../fetchApi';

export const getContent = async (contentId: string | null) => {
  const url = `/contents/${contentId}`;
  return await fetchApi(url, 'GET');
};

export const postContent = async (data: RegisterCatObjProps) => {
  return await fetchApi<RegisterCatObjProps>(`/contents`, 'POST', data);
};

export const putContent = async (data: UpdateCatObjProps, contentId: string | null | undefined) => {
  const url = `/contents/${contentId}`;
  return await fetchApi<UpdateCatObjProps>(url, 'PUT', data);
};

export const deleteContent = async (contentId: string | null) => {
  const url = `/contents/${contentId}`;
  return await fetchApi(url, 'DELETE');
};

export const reportContent = async (data: ContentReportProps) => {
  const url = `/reports/content`;
  return await fetchApi(url, 'POST', data);
};

export const getComments = async (contentId: string | null) => {
  const url = `/contents/${contentId}/comments?sort=likes:desc&page=1&size=1000&created_at=desc`;
  return (await fetchApi(url, 'GET')).data;
};

export const getComment = async (contentId: string | null, commentId: string | null) => {
  const url = `/contents/${contentId}/comments/${commentId}`;
  return await fetchApi(url, 'GET');
};

export const postComment = async (contentId: string | null, data: commentProps) => {
  const url = `/contents/${contentId}/comments`;
  return await fetchApi<commentProps>(url, 'POST', data);
};

export const putComment = async (commentId: string | null, data: commentProps) => {
  const url = `/comments/${commentId}`;
  return await fetchApi<commentProps>(url, 'PUT', data);
};

export const deleteComment = async (commentId: string | null) => {
  const url = `/comments/${commentId}`;
  return await fetchApi(url, 'DELETE');
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
