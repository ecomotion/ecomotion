import React from 'react';

const MakeDifferenceContainer = (props) => {
  console.log(
    'in the makeDifferenceContainer',
    props.carbon,
    props.actions.trees
  );
  //create algorithm for each element
  //trees algorithm
  if (props.carbon !== 0) {
    props.actions.trees = Math.ceil(props.carbon / 48);
    console.log('these are my trees', props.actions.trees);
    props.actions.meat = Math.ceil(props.carbon / 33.06);
    props.actions.bags = Math.ceil(props.carbon / 0.0727);
  }

  //meat algorithm

  //bags algorithm

  return (
    <div className='make-diff-container'>
      <div>Make Diff Placeholder </div>
      {props.actions.trees > 1 ? (
        <div>
          <p> Plant {props.actions.trees} Trees </p>
          <p> {props.actions.meat} Meatless Mondays </p>
          <p> Don't Use {props.actions.bags} Plastic Bags </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MakeDifferenceContainer;
