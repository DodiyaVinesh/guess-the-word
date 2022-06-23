const dictionary = require("../dictionary/words_dictionary.json");
const smallWords = Object.keys(dictionary).filter(
  (word) => word.length < 5 && word.length > 2
);
const bigWords = Object.keys(dictionary).filter(
  (word) => word.length < 9 && word.length > 4
);
const smallWordsLen = smallWords.length;
const bigWordsLen = bigWords.length;

function checkValidWord(wordRegex, word) {
  // first check length and visible charactors are the same
  if (wordRegex.length != word.length) return false;
  for (let i = 0; i < word.length; i++) {
    if (wordRegex[i] == "_") continue;
    if (wordRegex[i] != word[i]) return false;
  }

  // now check to dictionary ,it is valid or not
  if (!dictionary[word]) return false;
  return true;
}

function getWordRegex() {
  let word;
  if (Math.random() > 0.85) {
    word = bigWords[Math.floor(Math.random() * bigWordsLen)];
  } else {
    word = smallWords[Math.floor(Math.random() * smallWordsLen)];
  }

  let wordRegex = "";
  for (let i = 0; i < word.length; i++) {
    if (Math.random() > 0.75) {
      wordRegex += "_";
    } else {
      wordRegex += word[i];
    }
  }
  if (!wordRegex.includes("_")) {
    wordRegex = "_" + wordRegex.substring(1);
  }
  return wordRegex;
}

module.exports = { checkValidWord, getWordRegex };
