"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type CardProps = React.ComponentProps<typeof Card>;
interface ReportResourceAllocationCardProps extends CardProps {
  choices: string[];
  title: string;
  value: string;
  subtitle: string;
  link: string;
  onUpdate: (value: string) => void;
  report?: any;
}

const ReportResourceAllocationCard: React.FC<ReportResourceAllocationCardProps> = ({
  className,
  choices,
  title,
  value,
  subtitle,
  link,
  onUpdate,
  report,
  ...rest
}) => {
  const downloadReport = () => {
    // Download report logic
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${title.toLowerCase().replace(" ", "-")}-report.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <Card className={cn("w-[380px]", className)} {...rest}>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          {title}
          <Select onValueChange={onUpdate} value={value}>
            <SelectTrigger className=" m-0 h-[30px] w-[80px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {choices.map((choice) => (
                <SelectItem key={choice} value={choice}>
                  {choice}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md">
          <h1 className="text-3xl font-bold">{value}</h1>
        </div>
        <span className="text-xs">{subtitle}</span>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 text-xs cursor-pointer" onClick={downloadReport}>
        Download Report
      </CardFooter>
    </Card>
  );
};

export default ReportResourceAllocationCard;
