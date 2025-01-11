"use client";
import ReportCard from "@/components/report-card";
import useFetchInfectedReportQuery from "@/hooks/useFetchInfectedReportQuery";
import useFetchNonInfectedReportQuery from "@/hooks/useFetchNonInfectedReportQuery";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const ReportPage: React.FC = () => {
  const { data: infectedReport } = useFetchInfectedReportQuery();
  const { data: nonInfectedReport } = useFetchNonInfectedReportQuery();

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
          percentage={nonInfectedReport?.percentage || 0}
          value={nonInfectedReport?.value?.toString() || "0"}
          trend={nonInfectedReport?.trend}
          subtitle="Last 30 days"
          link="/notifications"
          report={nonInfectedReport?.report}
        />
        <ReportCard
          title="Number of Infected Survivors"
          percentage={infectedReport?.percentage || 0}
          value={infectedReport?.value?.toString() || "0"}
          trend={infectedReport?.trend}
          subtitle="Last 30 days"
          link="/notifications"
          report={infectedReport?.report}
        />
        <ReportCard title="Average Resource Allocation" value="Food" subtitle="10 days worth" link="/notifications" />
      </div>
    </div>
  );
};

export default ReportPage;
