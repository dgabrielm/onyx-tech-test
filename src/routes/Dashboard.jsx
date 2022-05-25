import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { PatchCheckFill, ExclamationTriangleFill, ExclamationOctagonFill } from 'react-bootstrap-icons';
// import PieChart from '../components/PieChart';
import AlertsService from '../services/AlertsService';

function Dashboard() {
  const [turbines, setTurbines] = useState([]);

  function listTurbinesStatus() {
    const obj = {};
    const listHead = [];
    const listTail = [];

    let i = 1;
    for (i; i <= 100; i += 1) {
      obj[`T${i}`] = { warnings: 0, criticals: 0 };
    }

    AlertsService.getAlerts((response) => {
      if (response.error !== null) {
        console.log(response.error);
        return;
      }

      response.data.forEach((alert) => {
        if (alert.level === 1) {
          obj[alert.turbine].warnings = alert.count;
        }
        if (alert.level === 2) {
          obj[alert.turbine].criticals = alert.count;
        }
      });

      Object.keys(obj).forEach((key) => {
        const turbine = {
          name: key,
          warnings: obj[key].warnings,
          criticals: obj[key].criticals,
        };

        if (turbine.warnings === 0 && turbine.criticals === 0) {
          listTail.push(turbine);
        } else {
          listHead.push(turbine);
        }
      });

      setTurbines(listHead.concat(listTail));
    });
  }

  useEffect(listTurbinesStatus, []);

  return (
    <div>
      <br />
      <h1>Dashboard</h1>
      {/* find replacement library or create custom component for data visualisation */}
      {/* <PieChart /> */}
      <hr />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Turbine</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            turbines.map((turbine) => (
              <tr key={turbine.name}>
                <td>{turbine.name}</td>
                <td>
                  {(turbine.warnings === 0 && turbine.criticals === 0)
                    ? (
                      <div>
                        {'ok '}
                        <PatchCheckFill color="green" title="Status OK" />
                      </div>
                    )
                    : (
                      <div>
                        {/* Warnings */}
                        {(turbine.warnings > 0) && (
                          <span>
                            {turbine.warnings}
                            {' '}
                            <ExclamationTriangleFill color="yellow" title={`Warning Alarms: ${turbine.warnings}`} />
                          </span>
                        )}

                        {/* Alarms */}
                        {(turbine.criticals > 0) && (
                          <span>
                            {' '}
                            {turbine.criticals}
                            {' '}
                            <ExclamationOctagonFill color="red" title={`Critical Alarms: ${turbine.criticals}`} />
                          </span>
                        )}
                      </div>
                    )}
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;
