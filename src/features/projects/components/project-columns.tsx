"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataGridFeatures } from "@/components/reui/data-grid/data-grid";
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header";
import type { GetProjectsResult } from "../server/get-projects";
import { DeleteProjectButton } from "./delete-project-button";
import { EditProject } from "./edit-project";

const columnHelper = createColumnHelper<
  DataGridFeatures,
  GetProjectsResult[number]
>();

export const projectColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Name" />
    ),
  }),
  columnHelper.accessor("organization.name", {
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Organization" />
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Created At" />
    ),
    cell({ row }) {
      return row.original.createdAt.toLocaleString();
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-1">
          <EditProject project={row.original} />
          <DeleteProjectButton project={row.original} />
        </div>
      );
    },
  }),
]);
