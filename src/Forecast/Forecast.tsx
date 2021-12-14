import { IMarker } from "../Models/IMarker";
import styles from "./Forecast.module.css";

interface IForecast {
  marker?: IMarker;
}

export const Forecast = ({}: IForecast) => {
  return (
    <div className={styles.forecastWrapper}>
      <h3>Forecast</h3>
      <p>Current consumption:</p>
      <p>Average consumption:</p>
    </div>
  );
};
