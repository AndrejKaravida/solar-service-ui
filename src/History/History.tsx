import { Table } from "react-bootstrap";
import { IMeasurementHistory } from "../Models/IMeasurementHistory";
import styles from "./History.module.css";
interface IHistoryProps {
  productionHistory: IMeasurementHistory[];
}

export const History = ({ productionHistory }: IHistoryProps) => {
  const generateTableBody = () => {
    return productionHistory.map((history, index) => {
      return (
        <tr key={index}>
          <td>{new Date(history.date).toLocaleDateString("sr-RS")}</td>
          <td>{history.min.toFixed(3)}</td>
          <td>{history.max.toFixed(3)}</td>
          <td>{history.average.toFixed(3)}</td>
        </tr>
      );
    });
  };
  return (
    <div className="text-center">
      <h4 className="mb-3">Production history:</h4>
      {productionHistory.length > 0 ? (
        <>
          <h5>Solar panel: {productionHistory[0].city}</h5>
          <div className={styles["tableWrapper"]}>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Minimum load [W / m2]</th>
                  <th>Maximum load [W / m2]</th>
                  <th>Average load [W / m2]</th>
                </tr>
              </thead>
              <tbody>{generateTableBody()}</tbody>
            </Table>
          </div>
        </>
      ) : (
        <h5>Choose solar panel from the map...</h5>
      )}
    </div>
  );
};
