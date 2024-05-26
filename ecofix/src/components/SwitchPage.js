import { useNavigate } from "react-router-dom";
export function SwitchPage(pageName){
  const navigate = useNavigate();
  return () => navigate(pageName);
}

