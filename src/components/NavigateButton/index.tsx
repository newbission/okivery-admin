import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type NavigateButtonProps = {
  children: ReactNode;
  onButtonClick?: () => void | null;
  to?: string;
  goBack?: boolean;
};

const index = ({
  children,
  to = '',
  onButtonClick,
  goBack=false,
}: NavigateButtonProps) => {
  const navigate = useNavigate();
  const onNavigateHandler = () => {
    if (goBack) {
      navigate(-1);
    }
    navigate(to);
  };
  return (
    <button onClick={to || goBack ? onNavigateHandler : onButtonClick}>{children}</button>
  );
};

export default index;
