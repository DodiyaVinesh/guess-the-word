module.exports = function () {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  return (
    chars[Math.floor(Math.random() * 26)] +
    chars[Math.floor(Math.random() * 26)] +
    chars[Math.floor(Math.random() * 26)] +
    "-" +
    chars[Math.floor(Math.random() * 26)] +
    chars[Math.floor(Math.random() * 26)] +
    chars[Math.floor(Math.random() * 26)] +
    "-" +
    chars[Math.floor(Math.random() * 26)] +
    chars[Math.floor(Math.random() * 26)] +
    chars[Math.floor(Math.random() * 26)]
  );
};
