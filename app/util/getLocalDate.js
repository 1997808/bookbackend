function LocalDate() {
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  var localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return localISOTime;
}

module.exports = {
  LocalDate,
};
