import styles from "./Load.module.css";

interface ILoadProps {
  city?: string;
}

export const Load = ({ city }: ILoadProps) => {
  return (
    <div className={styles.loadWrapper}>
      <h3 className="mb-3">Current load:</h3>
      {city ? (
        <>
          <h4>Solar panel: {city}</h4>
          <h4>Current Load: ??? [W/m2]</h4>
        </>
      ) : (
        <h4>Choose solar panel from the map...</h4>
      )}
    </div>
  );
};
