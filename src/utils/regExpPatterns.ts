const regExpPatterns = {
  id: '',
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
};

export default regExpPatterns;
