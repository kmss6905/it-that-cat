export const saveImage = async (image: string) => {
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
  if (!apiKey || !uploadPreset) {
    throw new Error('Cloudinary key is not defined');
  }
  let formData = new FormData();
  formData.append('api_key', apiKey);
  formData.append('upload_preset', uploadPreset);
  formData.append(`file`, image);
  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );
  const data = await uploadRes.json();
  return data.url;
};
