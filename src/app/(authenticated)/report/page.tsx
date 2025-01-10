import ReportCard from "@/components/report-card";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const ReportPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Reports</h1>
      <div className="inline-flex items-center gap-2">
        <p>
          Your camp has grown
          <span className="text-green-500 font-semibold"> +10% </span>
          this month
        </p>
        <FaInfoCircle color="#5F5F61" />
      </div>
      <div className="flex flex-row gap-10 mt-12">
        <ReportCard
          title="Number of Healthy Survivors"
          percentage="+10%"
          value="1205"
          subtitle="Last 30 days"
          link="/notifications"
        />
        <ReportCard
          title="Number of Infected Survivors"
          percentage="+5%"
          value="1205"
          subtitle="Last 30 days"
          link="/notifications"
        />
        <ReportCard
          title="Average Resource Allocation"
          percentage=""
          value="Food"
          subtitle="10 days worth"
          link="/notifications"
        />
      </div>
    </div>
  );
};

export default ReportPage;
