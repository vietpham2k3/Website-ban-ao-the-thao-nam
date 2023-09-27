/* eslint-disable react/prop-types */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const DropdownComponent = ({ children }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select an option
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {children.map((childRoute) => (
          <Dropdown.Item
            as={Link}
            to={childRoute.route}
            key={childRoute.key}
          >
            {childRoute.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;