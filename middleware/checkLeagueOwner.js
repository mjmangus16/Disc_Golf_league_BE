const checkLeagueOwner = (owner_id, user_id) => {
  if (owner_id === user_id) {
    return true;
  } else {
    return false;
  }
};

module.exports = checkLeagueOwner;
