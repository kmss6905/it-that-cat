const getSelectContent = async (id: number) => {
  let content;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/contents/${id}`,
  );
  content = await response.json();

  if (content.result !== 'SUCCESS') return;

  return content.data;
};

export default getSelectContent;
