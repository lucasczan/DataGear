import * as S from "./styles";
interface IStatusProps {
	color: "red" | "green";
}

export const Status: React.FC<IStatusProps> = ({ color }) => {
	if (!color) return;
	return <span className={S.StatusBullet({ color })} />;
};
