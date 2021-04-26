import React from 'react';

export default function Cards(props) {
  return (
    <div>
      <p>
        Your Flight Departing from {props.profileData.depart} and Arriving at
        {props.profileData.arrive}
      </p>
      <p>Emitted {props.profileData['co2_impact']}kgs of Carbon</p>
      <p>Plant {props.profileData['tree_impact']} Trees</p>
      <p>Have {props.profileData['meat_impact']} Meatless Mondays</p>
      <p>Choose not to use {props.profileData['bags_impact']} Plastic Bags</p>
    </div>
  );
}

// {"depart":"SFO","arrive":"YYZ",
// "co2_impact":"429.91",
// "tree_impact":19.7027753,
// "meat_impact":28.60836095,
// "bags_impact":13009.6526794}
