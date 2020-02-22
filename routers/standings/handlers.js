module.exports = (type, participants) => {
  if (type.type == "singles_points") {
    return singles_points(participants);
  } else if (type.type == "doubles_points") {
    return doubles_points(participants);
  }
};

/*
  singles_points
    - We get all the participants from that league
    - We need to seperate participants into like rounds so that we can sort them.
      - Once sorted we can give participants the correct amount of points for where they placed.
        - 20 participants in a round = 1st gets 20 points ... last gets 1 point
    - We need to organize the participant data so that each member has all their rounds coupled together.
      - This is how we want the data to be organized when its returned
      - The returned data should be an array of arrays with each inner array being all the rounds played by a single member

*/

const singles_points = participants => {
  let roundsSet = new Set();
  let membersSet = new Set();
  participants.forEach(p => {
    roundsSet.add(p.round_id);
    membersSet.add(p.member_id);
  });
  let roundsArray = Array.from(roundsSet);
  let membersArray = Array.from(membersSet);
  let scoresContainer = [];
  let membersContainer = [];

  for (let i = 0; i < roundsArray.length; i++) {
    scoresContainer.push([]);
  }

  for (let i = 0; i < membersArray.length; i++) {
    membersContainer.push([]);
  }

  roundsArray.forEach((r, i) => {
    participants.forEach(p => {
      if (r === p.round_id) {
        p.score = p.score - Math.floor(Math.random() * 10);
        scoresContainer[i].push(p);
      }
    });
    scoresContainer[i].sort((a, b) => {
      return a.score - b.score;
    });
    let length = scoresContainer[i].length;
    scoresContainer[i].forEach((p, i) => {
      p.points = length - i;
    });
  });

  membersArray.forEach((m, i) => {
    scoresContainer.forEach(r => {
      r.forEach(s => {
        if (s.member_id === m) {
          membersContainer[i].push(s);
        }
      });
      membersContainer[i].sort((a, b) => {
        return a.round_id - b.round_id;
      });
    });
  });

  console.log(membersArray);
  return membersContainer;
};
