module.exports = (type, participants) => {
  if (type.type == "singles_points") {
    return singles_points(participants);
  } else if (type.type == "doubles_points") {
    return doubles_points(participants);
  }
};

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
