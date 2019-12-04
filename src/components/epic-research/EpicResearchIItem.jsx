import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup,
  FormControl,
  ToggleButton,
  ButtonGroup,
} from 'react-bootstrap';

import EpicResearchCosts from './EpicResearchCosts';
import GoldenEgg from '../../assets/Golden_egg64.png';

const goldenEggImg = (
  <img src={GoldenEgg} alt="Golden Eggs" height={16} width={16} />
);

function EpicResearchItem(props) {
  const { researchName, level, handleChange } = props;
  const item = EpicResearchCosts[researchName];

  const name = item.title;
  const { desc } = item;
  const maxLevel = item.costs.length;

  const purchased = item.costs.slice(0, level);

  const add = (a, b) => a + b;
  const spent = purchased.reduce(add, 0);
  const totalCost = item.costs.reduce(add, 0);
  const remainingCost = totalCost - spent;
  const next = (level === maxLevel ? '-' : item.costs[level]);

  const bonusVal = item.bonusVal * level;
  let bonus = (bonusVal === 0 ? '-' : (bonusVal < 0 ? '' : '+') + bonusVal + item.bonusUnit);

  let levelInput;

  // const handleCheck = (event) => {
  //   console.log(event.target)
  // }

  if (maxLevel === 1) {
    levelInput = (
      <ButtonGroup toggle>
        <ToggleButton variant="secondary" name={researchName} type="checkbox" checked={level === 1} onChange={handleChange}>
          {level ? 'Purchased' : 'Available'}
        </ToggleButton>
      </ButtonGroup>
      // <input name={researchName} type="checkbox" checked={level} onChange={handleChange} />
    );
    bonus = (level === 1 ? '✓' : '-');
  } else {
    levelInput = (
      <InputGroup>
        <FormControl name={researchName} value={level || ''} onChange={handleChange} placeholder={0} />
        <InputGroup.Append>
          <InputGroup.Text>{`/${maxLevel}`}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  const style = {
    verticalAlign: 'middle',
  };

  return (
    <tr key={researchName}>
      <td style={style}>{name}</td>
      <td style={style}>{desc}</td>
      <td style={style} align="center">{bonus}</td>
      <td style={style} align="center">{levelInput}</td>
      <td style={style} align="center">
        {(next === '-' ? '' : goldenEggImg)}
        {next.toLocaleString()}
      </td>
      <td style={style} align="center">
        {goldenEggImg}
        {remainingCost.toLocaleString()}
      </td>
      <td style={style} align="center">
        {goldenEggImg}
        {totalCost.toLocaleString()}
      </td>
    </tr>
  );
}

EpicResearchItem.propTypes = {
  researchName: PropTypes.string.isRequired,
  level: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};

EpicResearchItem.defaultProps = {
  level: 0,
};

export default EpicResearchItem;
