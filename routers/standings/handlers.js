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
      console.log("creating array");
      partsCont[p.round_id] = [p];
    } else {
      // Sort here
      // -- loop through current array
      let i = 0;
      while (i < partsCont[p.round_id].length) {
        // ---- If p.score is > scores[i] && <= scores[i + 1]
        // ---- Or if scores[i+1] does not exist
        if (!partsCont[p.round_id][i + 1]) {
          partsCont[p.round_id][i + 1] = p;
          break;
        } else if (p.score > partsCont[p.round_id][i].score) {
          i++;
        } else if (p.score <= partsCont[p.round_id][i].score) {
          i++;
        }
      }

      // ------ Insert p into index + 1 and move every index after p 1 spot to the right.
      // ** recursion?? **
    }
  });
  return partsCont;

  // sort each rounds participants by score from lowest to highest
  // -- loop through keys in container object and sort the values accordingly
  // *** combine these ***
  // Award points based on sorted position
  // -- loop through keys in container then loop through sorted array to set points
  // ---- If there are matching scores, we need to award == points to all matches

  // Once points are awarded accordingly we need to return the data so that each members participants are return all together seperate from the other members
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
