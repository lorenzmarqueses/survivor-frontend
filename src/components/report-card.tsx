import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;
interface ReportCardProps extends CardProps {
  title: string;
  trend?: "UP" | "DOWN";
  percentage?: number;
  value: string;
  subtitle: string;
  link: string;
  report?: any;
}

const ReportCard: React.FC<ReportCardProps> = ({ className, ...props }) => {
  const downloadReport = () => {
    // Download report logic
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(props.report));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "report.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md">
          <h1 className="text-3xl font-bold">{props.value}</h1>
          {!props.percentage ? null : props.trend === "UP" ? (
            <span className="bg-green-100 text-green-500 rounded-xl py-1 px-2 text-sm">+{props.percentage}%</span>
          ) : (
            <span className="bg-red-100 text-red-500 rounded-xl py-1 px-2 text-sm">-{props.percentage}%</span>
          )}
        </div>
        <span className="text-xs">{props.subtitle}</span>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 text-xs cursor-pointer" onClick={downloadReport}>
        Download Report
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
