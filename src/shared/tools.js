export const parseDate = (str) => {
  var mdy = str.split("-");
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
