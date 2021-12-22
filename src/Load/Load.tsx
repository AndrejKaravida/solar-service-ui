import styles from "./Load.module.css";

interface ILoadProps {
  city?: string;
}

export const Load = ({ city }: ILoadProps) => {
  return (
    <div className={styles.loadWrapper}>
      <h4 className="mb-3">Current load:</h4>
      {city ? (
        <>
          <h5>Solar panel: {city}</h5>
          <h5>Current Load: ??? [W/m2]</h5>
        </>
      ) : (
        <h5>Choose solar panel from the map...</h5>
      )}
    </div>
  );
};
