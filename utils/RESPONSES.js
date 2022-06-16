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
  type: "Success",
  msg: "Success",
  code: "SUCCESS",
};

module.exports = {
  INVALID_ROOMID,
  JOINED_ROOM,
  SUCCESS,
};
