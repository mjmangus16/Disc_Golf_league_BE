module.exports = (type, participants) => {
  if (type.type == "singles_points") {
    return singles_points(participants);
  } else if (type.type == "doubles_points") {
    return doubles_points(participants);
  }
};

/*
  participants = [
    ...{
    participant_id: 76,
    member_id: 10,
    round_id: 4,
    league_id: 1,
    score: 55
  }
  ]
*/

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
  // filter participants into rounds
  // -- create a container object to hold rounds
  let partsCont = {};
  // -- { ...round_id: [...participants]}
  // -- loop through participants
  participants.forEach(p => {
    // ---- If object[participant_round_id] exists, pass participant into array. ELSE create that key, value pair and then pass participant into array.
    p.score = p.score - Math.floor(Math.random() * 10);
    if (!partsCont[p.round_id]) {
      partsCont[p.round_id] = [p];
    } else {
      // ---- Sorting algorithm -----
      let index = 0;

      // While we are not at the end of the array and the new score is greater than the score of the index in the array then all we need to do is increase the index by one to continue through the array.
      // This allows us to find the index that the new score belongs at.
      while (
        partsCont[p.round_id][index] &&
        p.score > partsCont[p.round_id][index].score
      ) {
        index++;
      }

      // Once the index is found, we add an empty object to the back of the array. This allows us to move items in the array before we add the new item.
      partsCont[p.round_id].push({});

      // We then start at the back of the array which is the empty object and "slurp" the object in front of it into that spot.
      // We loop through backwards until we get to the spot that the new score belongs at.
      for (let i = partsCont[p.round_id].length - 1; i > index; i--) {
        partsCont[p.round_id][i] = partsCont[p.round_id][i - 1];
      }
      // Add the new score at the selected index
      partsCont[p.round_id][index] = p;
    }
  });

  // --- SET POINTS EARNED ---
  // Need to award points to each participant based on where they placed for that round.
  // Best score is awared the length of the array.
  // Each place after that is 1 point less than the place before it with last place taking 1 point.

  const container = [];

  // Loop through each round
  for (let key in partsCont) {
    const length = partsCont[key].length;
    // Loop through participants from each round
    let index = 0;
    while (index < length - 1) {
      // check that the score doesn't match the next score
      if (partsCont[key][index].score !== partsCont[key][index + 1].score) {
        partsCont[key][index].points = length - index;
        container.push(partsCont[key][index]);
        index++;
      } else {
        // If there is a match, count how many matches there are
        let count = 0;
        const getCount = () => {
          if (
            partsCont[key][index + count] &&
            partsCont[key][index].score === partsCont[key][index + count].score
          ) {
            count++;
            getCount();
          }
        };
        getCount();
        // Get the number of points that should be given to each participant in part of the tie
        let points = length - index;
        let total = 0;
        for (let y = 0; y < count; y++) {
          total = total + points - y;
        }
        let adjusted = total / count;
        for (let y = 0; y < count; y++) {
          partsCont[key][index + y].points = adjusted;
          container.push(partsCont[key][index + y]);
        }
        // Increase the index by the count so that we skip over all the participants we just adjusted
        index = index + count;
      }
    }
  }

  // Once points are awarded accordingly we need to return the data so that each members participants are return all together seperate from the other members
  let finalArray = [];

  // Create an array inside finalArray at the index of each member_id
  // fill each index with the matching participants
  for (let i = 0; i < container.length; i++) {
    if (!finalArray[container[i].member_id]) {
      finalArray[container[i].member_id] = [container[i]];
    } else {
      finalArray[container[i].member_id].push(container[i]);
    }
  }

  // Remove all null values from the finalArray
  return finalArray.filter(e => e != null);
};

// const singles_points = participants => {
//   let roundsSet = new Set();
//   let membersSet = new Set();
//   participants.forEach(p => {
//     roundsSet.add(p.round_id);
//     membersSet.add(p.member_id);
//   });
//   let roundsArray = Array.from(roundsSet);
//   let membersArray = Array.from(membersSet);
//   let scoresContainer = [];
//   let membersContainer = [];

//   for (let i = 0; i < roundsArray.length; i++) {
//     scoresContainer.push([]);
//   }

//   for (let i = 0; i < membersArray.length; i++) {
//     membersContainer.push([]);
//   }

//   roundsArray.forEach((r, i) => {
//     participants.forEach(p => {
//       if (r === p.round_id) {
//         p.score = p.score - Math.floor(Math.random() * 10);
//         scoresContainer[i].push(p);
//       }
//     });
//     scoresContainer[i].sort((a, b) => {
//       return a.score - b.score;
//     });
//     let length = scoresContainer[i].length;
//     scoresContainer[i].forEach((p, i) => {
//       p.points = length - i;
//     });
//   });

//   membersArray.forEach((m, i) => {
//     scoresContainer.forEach(r => {
//       r.forEach(s => {
//         if (s.member_id === m) {
//           membersContainer[i].push(s);
//         }
//       });
//       membersContainer[i].sort((a, b) => {
//         return a.round_id - b.round_id;
//       });
//     });
//   });

//   console.log(membersArray);
//   return membersContainer;
// };