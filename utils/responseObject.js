const resSuccessObject = ({ message = "", results = {} }) => ({
  success: true,
  message,
  results,
});

export default resSuccessObject;
