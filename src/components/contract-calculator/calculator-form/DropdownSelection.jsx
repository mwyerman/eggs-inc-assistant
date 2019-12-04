import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

import { getLargeNumberUnits } from '../../util';

const DropdownSelection = (props) => {
  const {
    name,
    num,
    selected,
    handleSelection,
  } = props;
  const units = getLargeNumberUnits(num);

  const options = units.map((unit, index) => (
    <Dropdown.Item
      active={selected === index}
      key={unit.value}
      onClick={() => handleSelection(name, index)}
    >
      {unit.name}
    </Dropdown.Item>
  ));

  return (
    <DropdownButton
      as={InputGroup.Append}
      title={units[selected].shortName}
    >
      {options}
    </DropdownButton>
  );
};

DropdownSelection.propTypes = {
  name: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default DropdownSelection;
