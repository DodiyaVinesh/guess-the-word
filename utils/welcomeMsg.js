const msgs = [
  "User just joined the room - glhf!",
  "User just joined. Everyone, look busy!",
  "User just joined. Can I get a heal?",
  "User joined your party.",
  "User joined. You must construct additional pylons.",
  "Ermagherd. User is here.",
  "Welcome, User. Stay awhile and listen.",
  "Welcome, User. We were expecting you ( ͡° ͜ʖ ͡°)",
  "Welcome, User. We hope you brought pizza.",
  "Welcome User. Leave your weapons by the door.",
  "A wild User appeared.",
  "Swoooosh. User just landed.",
  "Brace yourselves. User just joined the room.",
  "User just joined. Hide your bananas.",
  "User just arrived. Seems OP - please nerf.",
  "User just slid into the room.",
  "A User has spawned in the room.",
  "Big User showed up!",
  "Where’s User? In the room!",
  "User hopped into the room. Kangaroo!!",
  "User just showed up. Hold my beer.",
  "Challenger approaching - User has appeared!",
  "It's a bird! It's a plane! Nevermind, it's just User.",
  "It's User! Praise the sun! [T]/",
  "Never gonna give User up. Never gonna let User down.",
  "Ha! User has joined! You activated my trap card!",
  "Cheers, love! User's here!",
  "Hey! Listen! User has joined!",
  "We've been expecting you User",
  "It's dangerous to go alone, take User!",
  "User has joined the room! It's super effective!",
  "Cheers, love! User is here!",
  "User is here, as the prophecy foretold.",
  "User has arrived. Party's over.",
  "Ready player User",
  "User is here to kick butt and chew bubblegum. And User is all out of gum.",
  "Hello. Is it User you're looking for?",
  "User has joined. Stay a while and listen!",
  "Roses are red, violets are blue, User joined this room with you",
];
module.exports = function (username) {
  let randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
  return randomMsg.replace(/User/g, username);
};
