import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAlertStore } from "@/store/alertStore";

const AlertMessage: React.FC = () => {
  const { message, show, type, hideMessage } = useAlertStore((state) => state);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        hideMessage();
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer); // Clear timeout on unmount
    }
  }, [show, hideMessage]);

  if (!show) return null;

  return (
    <Alert
      className={`absolute right-2 top-20 mt-4 z-100 w-[300px] text-white rounded-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div>
        <AlertTitle>{type === "success" ? "Success!" : "Error!"}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
};

export default AlertMessage;
