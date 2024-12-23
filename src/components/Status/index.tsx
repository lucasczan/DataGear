import * as S from "./styles";
interface IStatusProps {
	color: "red" | "green";
}

export const Status: React.FC<IStatusProps> = ({ color }) => {
	return <span className={S.StatusBullet({ color })} />;
};
