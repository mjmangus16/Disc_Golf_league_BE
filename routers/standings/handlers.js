module.exports = (type, participants) => {
  if (type.type == "points") {
    return points(participants);
  }
};

const points = participants => {
  let roundsSet = new Set();
  participants.forEach(p => roundsSet.add(p.round_id));
  let roundsArray = Array.from(roundsSet);
  let container = [];

  for (let i = 0; i < Array.from(roundsSet).length; i++) {
    container.push([]);
  }

  roundsArray.forEach((r, i) => {
    participants.forEach(p => {
      if (r === p.round_id) {
        p.score = p.score - Math.floor(Math.random() * 10);
        container[i].push(p);
      }
    });
    container[i].sort((a, b) => {
      return a.score - b.score;
    });
  });

  console.log(container);
  return container;
};
