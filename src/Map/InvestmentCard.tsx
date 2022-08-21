import { Card, Typography } from "@mui/material";
import { IInvestment } from "../Models/IInvestment";
import { useAuth } from "../Authentication/useAuth";

interface IProps {
  investment: IInvestment;
  onInvestmentSelected?: (investmentId: string) => void;
}

export const InvestmentCard = ({
  investment,
  onInvestmentSelected,
}: IProps) => {
  const { user } = useAuth();

  const getBackgroundColor = () => {
    return investment.user.userId === user?.userId ? "lightgreen" : "grey";
  };

  const onCardClick = () => {
    if (onInvestmentSelected && investment._id) {
      onInvestmentSelected(investment._id);
    }
  };

  return (
    <Card
      onClick={onCardClick}
      sx={{
        padding: "15px",
        mb: "10px",
        cursor: "pointer",
        backgroundColor: getBackgroundColor(),
      }}
    >
      <Typography>
        Owner:{" "}
        <b>
          {investment.user.firstName} {investment.user.lastName}
        </b>
      </Typography>
      <Typography>
        City: <b>{investment.city.name}</b>
      </Typography>
      <Typography>
        Power: <b>{investment.power} kW</b>
      </Typography>
      <Typography>
        Price:{" "}
        <b>
          {investment.cost} {" $"}
        </b>
      </Typography>
    </Card>
  );
};
