/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { Redirect } from "react-router-dom";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./procType.css";

function ViewProcess() {
  const [data, setData] = useState([]);

  const [stepNr, setStepNr] = useState(1);
  const [companyAOptions, setCompanyAOptions] = useState([]);
  const [companyBOptions, setCompanyBOptions] = useState([]);
  const [actionCompanyOptions, setActionCompanyOptions] = useState([]);
  const [triggerCompanyOptions, setTriggerCompanyOptions] = useState([]);

  useEffect(() => {
    async function getCompanyOptions() {
      let i = 0;
      let response = await axios.get(`http://0.0.0.0:3335/company`);
      const { data } = response;

      const options = data.map(({ name }) => {
        i++;
        return { value: i + "", name };
      });

      setCompanyAOptions(options);
      setCompanyBOptions(options);
      setTriggerCompanyOptions(options.slice(0, 2));
      setActionCompanyOptions(options.slice(0, 2));
    }

    getCompanyOptions();
  }, [
    setCompanyAOptions,
    setCompanyBOptions,
    setTriggerCompanyOptions,
    setActionCompanyOptions
  ]);

  const [triggerOptions, setTriggerOptions] = useState([]);

  useEffect(() => {
    async function getTriggers() {
      let i = 0;
      let response = await axios.get(`http://0.0.0.0:3335/trigger`);
      const { data } = response;

      const options = data.map(({ description }) => {
        i++;
        return { value: i + "", name: description };
      });

      setTriggerOptions(options);
    }

    getTriggers();
  }, [setTriggerOptions]);

  const [actionOptions, setActionOptions] = useState([]);

  const changeActionsByTrigger = (triggers, index) => {
    const newTriggers = triggers.slice();
    const ind = index - 1;
    const trigger = newTriggers[ind];
    console.log(index);
    console.log(newTriggers);
    console.log(trigger);

    const { name } = trigger;
    console.log(name);

    axios.get(`http://localhost:3335/trigger/getId/${name}`).then(response => {
      console.log(response);
      const { data } = response;

      axios
        .get(`http://localhost:3335/action/getByTriggerId/${data}`)
        .then(response => {
          const { data } = response;
          let newActionOptions = [];
          let i = 0;
          data.forEach(element => {
            newActionOptions.push({
              value: ++i + "",
              name: element.description
            });
          });
          console.log(newActionOptions);
          setActionOptions(newActionOptions);
        });
    });
  };

  useEffect(() => {
    async function getActions() {
      axios
        .get(`http://localhost:3335/action/getByTriggerId/1`)
        .then(response => {
          const { data } = response;
          let newActionOptions = [];
          let i = 0;
          data.forEach(element => {
            newActionOptions.push({
              value: ++i + "",
              name: element.description
            });
          });
          setActionOptions(newActionOptions);
        });
    }

    getActions();
  }, [setActionOptions]);

  const [trigger, setTrigger] = useState("1");
  const [triggerCompany, setTriggerCompany] = useState("1");
  const [action, setAction] = useState("1");
  const [actionCompany, setActionCompany] = useState("2");
  const [companyA, setCompanyA] = useState("1");
  const [companyB, setCompanyB] = useState("2");

  const [processName, setProcessName] = useState("");

  const [validProcName, setValidProcName] = useState(true);

  const [companyAType] = useState("Company B");

  const [companyBType] = useState("Company A");

  const [redirect, setRedirect] = useState(false);

  function setCompanyOptions(cA, cB) {
    const ca = companyAOptions.find(element => element.value === cA);
    const cb = companyBOptions.find(element => element.value === cB);
    setTriggerCompanyOptions([ca, cb]);
    setTriggerCompany(cA);
    setActionCompanyOptions([cb, ca]);
    setActionCompany(cB);
  }

  function getFlow() {
    if (triggerCompany === companyA) {
      if (actionCompany === companyB) return "A->B";
      if (actionCompany === companyA) return "A";
    }
    if (triggerCompany === companyB) {
      if (actionCompany === companyA) return "B->A";
      if (actionCompany === companyB) return "B";
    }
    return "";
  }

  const submitForm = formData => {
    let { steps, user, type, descriptionA, descriptionB } = formData;

    if (!type.match(/[A-Za-z]+/g)) {
      setValidProcName(false);
      return;
    }
    setValidProcName(true);

    axios.get(`http://localhost:3335/proc-type/${type}`).then(response => {
      const { data: exists } = response;

      if (exists.length !== 0) {
        setValidProcName(false);
        return;
      }

      setValidProcName(true);

      axios
        .post("http://localhost:3335/proc-type", {
          user,
          type,
          descriptionA,
          descriptionB
        })
        .then(response => {
          const { data: proc_type_id } = response;
          steps.forEach(({ action, flow, step, trigger }) => {
            axios
              .get(`http://localhost:3335/trigger/getId/${trigger}`)
              .then(response => {
                const { data: trigger_id } = response;

                axios
                  .get(`http://localhost:3335/action/getId/${action}`)
                  .then(response => {
                    const { data: action_id } = response;
                    axios
                      .post("http://localhost:3335/step", {
                        action_id,
                        flow,
                        step,
                        trigger_id,
                        proc_type_id,
                        descriptionA,
                        descriptionB
                      })
                      .then(response => {});
                  });
              });
          });
        });
    });
  };

  if (redirect) return <Redirect to="/new-process" />;

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">Process Name</Form.Label>
            <Form.Control
              style={validProcName ? {} : { borderColor: "red" }}
              placeholder="required"
              onChange={e => setProcessName(e.target.value)}
              //TODO isValid/isInvalid depending handleProcessNameChange/validProcName
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <Form.Group>
            <Form.Label className="gray-label">Company A</Form.Label>
            <select
              className="selector company-selector pos-lt"
              name="companyA"
              onChange={e => {
                setCompanyA(e.target.value);
                setCompanyOptions(e.target.value, companyB);
              }}
              value={companyA}
            >
              {companyAOptions &&
                companyAOptions
                  .filter(e => e.value !== companyB)
                  .map((e, key) => {
                    return (
                      <option key={key} value={e.value}>
                        {e.name}
                      </option>
                    );
                  })}
            </select>
          </Form.Group>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Form.Group>
            <Form.Label className="gray-label">Company B</Form.Label>
            <select
              className="selector company-selector pos-rt"
              name="companyB"
              onChange={e => {
                setCompanyB(e.target.value);
                setCompanyOptions(companyA, e.target.value);
              }}
              value={companyB}
            >
              {companyBOptions
                .filter(e => e.value !== companyA)
                .map((e, key) => {
                  return (
                    <option key={key} value={e.value}>
                      {e.name}
                    </option>
                  );
                })}
            </select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">Trigger</Form.Label>
            <select
              className="selector company-selector"
              name="trigger"
              onChange={e => {
                setTrigger(e.target.value);
                changeActionsByTrigger(triggerOptions, e.target.value);
              }}
              value={trigger}
            >
              {triggerOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">Trigger Company</Form.Label>
            <select
              className="selector company-selector"
              name="triggerCompany"
              onChange={e => setTriggerCompany(e.target.value)}
              value={triggerCompany}
            >
              {triggerCompanyOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">Action</Form.Label>
            <select
              className="selector company-selector"
              name="action"
              onChange={e => setAction(e.target.value)}
              value={action}
            >
              {actionOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">Action Company</Form.Label>
            <select
              className="selector company-selector"
              name="actionCompany"
              onChange={e => setActionCompany(e.target.value)}
              value={actionCompany}
            >
              {actionCompanyOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-center" sm={1} xs={1}>
          <Button
            className="blue-button pos-rt w-75 plusButton"
            onClick={() => {
              const newStep = {
                step: stepNr,
                trigger: triggerOptions.find(
                  element => element.value === trigger
                ).name,
                action: actionOptions.find(element => element.value === action)
                  .name,
                flow: getFlow()
              };
              setStepNr(stepNr + 1);
              setData([...data, newStep]);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="iconPlus" />
          </Button>
        </Col>
      </Row>
      <div className="reactTable">
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Step#",
              accessor: "step"
            },
            {
              Header: "Trigger",
              accessor: "trigger"
            },
            {
              Header: "Action",
              accessor: "action"
            },
            {
              Header: "Flow",
              accessor: "flow"
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
      <div className="pos-rt mb-5">
        <Button
          type="cancel"
          className="gray-button border-0 rel-text-blue mr-5"
          size="sm"
          onClick={e => {
            e.preventDefault();
            setRedirect(true);
          }}
        >
          <FontAwesomeIcon icon={faTimes} className="iconCheck mt-2" />
          Cancel
        </Button>
        <Button
          onClick={() => {
            const formData = {
              steps: data,
              user: 1,
              type: processName,
              descriptionA: companyAType,
              descriptionB: companyBType
            };
            submitForm(formData);
            setTimeout(() => setRedirect(true), 500);
          }}
          type="submit"
          size="sm"
          className="blue-button"
        >
          <FontAwesomeIcon icon={faCheck} className="iconCheck mt-2" />
          Confirm
        </Button>
      </div>
    </Container>
  );
}

export default ViewProcess;
