const CREATED_ROOM = {
  type: "success",
  msg: "Successfully Created Room",
  code: "CREATED_ROOM",
};
const INVALID_ROOMID = {
  type: "error",
  msg: "Invalid Room Id",
  code: "INVALID_ROOMID",
};
const JOINED_ROOM = {
  type: "success",
  msg: "Successfully Joined Room",
  code: "JOINED_ROOM",
};

const SUCCESS = {
  type: "success",
  msg: "Success",
  code: "SUCCESS",
};

const RIGHT_ANSWER = {
  type: "success",
  msg: "Currect answer",
  code: "RIGHT_ANSWER",
};

const WRONG_ANSWER = {
  type: "error",
  msg: "Wrong Answer",
  code: "WRONG_ANSWER",
};

const ALREADY_ANSWERED = {
  type: "error",
  msg: "Already sent this answer",
  code: "ALREADY_ANSWERED",
};

module.exports = {
  CREATED_ROOM,
  INVALID_ROOMID,
  JOINED_ROOM,
  SUCCESS,
  RIGHT_ANSWER,
  WRONG_ANSWER,
  ALREADY_ANSWERED,
};
