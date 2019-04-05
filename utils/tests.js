exports.sleep = function sleep(period) {
  return new Promise(resolve => setTimeout(resolve, period));
};
