interface IHistoryProps {
  city?: string;
}

export const History = ({ city }: IHistoryProps) => {
  return (
    <div className="text-center">
      <h3 className="mb-3">Production history:</h3>
      {city ? (
        <>
          <h4>Solar panel: {city}</h4>
        </>
      ) : (
        <h4>Choose solar panel from the map...</h4>
      )}
    </div>
  );
};
