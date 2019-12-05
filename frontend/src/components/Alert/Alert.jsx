import React from 'react';
import {
  Alert,
} from 'react-bootstrap';
import propTypes from 'prop-types';
import './Alert.css';

function getVariantMessage(variant) {
  switch (variant) {
    case 'danger':
      return 'Oh snap! You got an error!';
    case 'success':
      return 'Huge success!!';
    default:
      return 'Huge fail';
  }
}

function AlertDismissible({
  show, setShow, text, variant, alertId,
}) {
  if (show) {
    return (
      <Alert className="alert-dismissible" id={alertId} variant={variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{getVariantMessage(variant)}</Alert.Heading>
        <p>
          {text}
        </p>
      </Alert>
    );
  }
  return (<div />);
}
AlertDismissible.propTypes = {
  show: propTypes.bool.isRequired,
  setShow: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
  variant: propTypes.string.isRequired,
  alertId: propTypes.string,
};

export default AlertDismissible;
