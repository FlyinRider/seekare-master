const useRecaptcha = () => {
  const validate = () => {
    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute('6LeW5TYaAAAAAPrwCUGpEdAtx46LxpSD-_4YQiXL', {
            action: 'submit',
          })
          .then(function (token) {
            resolve(token);
          });
      });
    });
  };

  return { validate };
};

export default useRecaptcha;
