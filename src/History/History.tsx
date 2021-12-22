interface IHistoryProps {
  city?: string;
}

export const History = ({ city }: IHistoryProps) => {
  return (
    <div className="text-center">
      <h4 className="mb-3">Production history:</h4>
      {city ? (
        <>
          <h5>Solar panel: {city}</h5>
        </>
      ) : (
        <h5>Choose solar panel from the map...</h5>
      )}
    </div>
  );
};
