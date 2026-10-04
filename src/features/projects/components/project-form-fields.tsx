"use client";

import { formOptions, revalidateLogic } from "@tanstack/react-form";

import { FieldGroup } from "@/components/ui/field";
import { withForm } from "@/hooks/form";
import { projectSchema } from "../validators/project";

export const projectFormOpts = formOptions({
  defaultValues: {
    name: "",
  },
  validationLogic: revalidateLogic(),
  validators: {
    onDynamic: projectSchema,
  },
});

export const ProjectFields = withForm({
  ...projectFormOpts,
  render: ({ form }) => {
    return (
      <FieldGroup>
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Name" />}
        />
      </FieldGroup>
    );
  },
});
