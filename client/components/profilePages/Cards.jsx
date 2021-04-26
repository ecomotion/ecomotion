import React from 'react';

// props.info.depart
// props.info.arrive
// props.info.co2
// props.info.trees
// props.info.meat
// props.info.bags
export default function Cards(props) {
  return (
    <div>
      <p>
        Your Flight Departing from {props.profileData.depart} and Arriving at{' '}
        {props.profileData.arrive}
      </p>
      <p>Emitted {props.profileData.co2}kgs of Carbon</p>
      <p>Plant {props.profileData.trees} Trees</p>
      <p>Have {props.profileData.meat} Meatless Mondays</p>
      <p>Choose not to use {props.profileData.bags} Plastic Bags</p>
    </div>
  );
}

// {"depart":"SFO","arrive":"YYZ",
// "co2_impact":"429.91",
// "tree_impact":19.7027753,
// "meat_impact":28.60836095,
// "bags_impact":13009.6526794}
