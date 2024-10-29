/**
 * 서버에서 `presigned-url`을 받아 해당 `URL(AWS S3)`로 이미지를 업로드하고, 업로드된 이미지의 고유 키를 반환
 *
 * 문자열 URL 형태라면 이미 업로드된 이미지이므로 업로드 생략하고, 업로드된 이미지의 고유 키를 반환
 *
 * @param image - 업로드할 이미지. File 객체 또는 문자열 URL 형태
 * @returns 업로드된 이미지의 고유 키
 */
export const saveImageAWS = async (image: File | string) => {
  let key: string = '';
  if (typeof image === 'string') {
    key = new URL(image).pathname.split('/')[1].split('.')[0];
  } else {
    const getRes = await fetch(`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/api/presigned-url?size=1`, {
      method: 'GET',
    });
    const data = await getRes.json();
    const uploadUrl = data.data[0];
    await fetch(uploadUrl, {
      method: 'PUT',
      body: image,
    });
    key = new URL(uploadUrl).pathname.split('/')[1];
  }
  return key;
};
