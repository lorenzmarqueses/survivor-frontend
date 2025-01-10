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
  percentage: string;
  value: string;
  subtitle: string;
  link: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ className, ...props }) => {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md">
          <h1 className="text-3xl font-bold">{props.value}</h1>
          {props.percentage === "" ? null : (
            <span className="bg-green-100 text-green-500 rounded-xl py-1 px-2 text-sm">{props.percentage}</span>
          )}
        </div>
        <span className="text-xs">{props.subtitle}</span>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 text-xs">Download Report</CardFooter>
    </Card>
  );
};

export default ReportCard;
