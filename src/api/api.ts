const urls = {
  searchByTitle: (title: string) =>
    `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&title=${title}&site=stackoverflow`,
  searchByText: (text: string) =>
    `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=${text}&site=stackoverflow`
};

// export const fetchQuestionByText = async (text: string) => {
//   return await fetch(urls.searchByText(text));
// };

export const fetchQuestionByTitle = async (title: string) => {
  try {
    const response = await fetch(urls.searchByTitle(title));
    return response.json();
  } catch (error) {
    throw error;
  }
};
