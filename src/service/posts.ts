export const getPaginatePosts = async () => {
  const posts = await fetch('http://localhost:3000/posts');

  console.log(posts);

  return [];
};
