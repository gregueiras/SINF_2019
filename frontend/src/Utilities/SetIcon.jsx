import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faTimesCircle, faPauseCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';

function setIcon(value, iconOnly) {
  console.log(iconOnly);
  if (value.original.state === 'Completed') {
    return (
      <Row>
        {iconOnly ? null : (
          <Col md={4}>
            {' '}
            {value.original.state}
          </Col>
        ) }
        <Col><FontAwesomeIcon icon={faCheckCircle} /></Col>
      </Row>
    );
  }
  if (value.original.state === 'Failed') {
    return (
      <Row>
        {iconOnly ? null : (
          <Col md={4}>
            {' '}
            {value.original.state}
          </Col>
        ) }
        <Col><FontAwesomeIcon icon={faTimesCircle} /></Col>
      </Row>
    );
  }
  if (value.original.state === 'Pending') {
    return (
      <Row>
        {iconOnly ? null : (
          <Col md={4}>
            {' '}
            {value.original.state}
          </Col>
        ) }
        <Col><FontAwesomeIcon icon={faPauseCircle} /></Col>
      </Row>
    );
  }
  if (value.original.state === 'In progress') {
    return (
      <Row>
        {iconOnly ? null : (
          <Col md={4}>
            {' '}
            {value.original.state}
          </Col>
        ) }
        <Col><FontAwesomeIcon icon={faSpinner} /></Col>
      </Row>
    );
  }
  return (<div />);
}
export default setIcon;
