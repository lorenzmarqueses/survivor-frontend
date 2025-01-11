"use client";
import ReportCard from "@/components/report-card";
import ReportResourceAllocationCard from "@/components/report-resource-allocation-card";
import useFetchAverageResourceAllocationReportQuery from "@/hooks/useFetchAverageResourceAllocationReportQuery";
import useFetchInfectedReportQuery from "@/hooks/useFetchInfectedReportQuery";
import useFetchNonInfectedReportQuery from "@/hooks/useFetchNonInfectedReportQuery";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const ReportPage: React.FC = () => {
  const [resource, setResource] = useState<string>("WATER");
  const { data: infectedReport } = useFetchInfectedReportQuery();
  const { data: nonInfectedReport } = useFetchNonInfectedReportQuery();
  const { data: averageResourceAllocationReportData } = useFetchAverageResourceAllocationReportQuery();

  const averageResourceAllocationReport = averageResourceAllocationReportData?.data;
  const selectedResource = averageResourceAllocationReport?.find((report) => report.resource === resource);

  const onUpdate = (resource: string) => {
    console.log(resource);

    setResource(resource);
  };

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
        <ReportResourceAllocationCard
          onUpdate={onUpdate}
          choices={averageResourceAllocationReport?.map((report) => report.resource) || []}
          title="Average Resource Allocation"
          value={selectedResource ? selectedResource.resource.toString() : "0"}
          subtitle={selectedResource ? `${selectedResource.daysWorth} days worth` : ""}
          link="/notifications"
          report={averageResourceAllocationReport}
        />
      </div>
    </div>
  );
};

export default ReportPage;
