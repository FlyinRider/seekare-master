export const getTextFromHtml = (htmlString) => {
  // remove &nbsp;
  const tempStr = htmlString.replace(/&nbsp;/g, "").trim();
  return tempStr.replace(/<[^>]+>/g, "");
};

export const trimmedText = (string = "", length) => {
  if(string.length>length)
    return string.substr(0, length) + " ...";
  else  return string;
};

export const validateSearchQuery = (query) => {
  const validReg = new RegExp(`[^A-Za-z0-9$\\s]`, "i");
  if (validReg.test(query)) {
    return true;
  }
  return false;
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
