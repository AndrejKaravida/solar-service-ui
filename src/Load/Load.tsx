import styles from "./Load.module.css";

interface ILoadProps {
  city: string;
  currentProduction: number;
}

export const Load = ({ city, currentProduction }: ILoadProps) => {
  return (
    <div className={styles.loadWrapper}>
      <h4 className="mb-3">Current load:</h4>
      {city.length > 0 ? (
        <>
          <h5>Solar panel: {city}</h5>
          <h5>Current Load: {currentProduction} [W/m2]</h5>
        </>
      ) : (
        <h5>Choose solar panel from the map...</h5>
      )}
    </div>
  );
};
