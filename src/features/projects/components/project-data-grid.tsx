"use client";

import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
} from "@/components/reui/data-grid/data-grid";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTable } from "@tanstack/react-table";
import { type GetProjectsResult } from "../server/get-projects";
import { AddProject } from "./add-project";
import { projectColumns } from "./project-columns";

type Props = {
  data: GetProjectsResult;
};
export const ProjectDataGrid = ({ data }: Props) => {
  const table = useTable({
    features: dataGridFeatures,
    data,
    columns: projectColumns,
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <DataGrid
      table={table}
      recordCount={data.length}
      tableLayout={{ rowsPinnable: true }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardAction>
            <AddProject />
          </CardAction>
        </CardHeader>
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
};
