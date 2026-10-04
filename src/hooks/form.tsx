import { Button } from "@/components/ui/button";
import { fieldContext, formContext, useFormContext } from "@/contexts/form";
import { createFormHook } from "@tanstack/react-form";
import { lazy, type ComponentProps } from "react";

const TextField = lazy(() => import("@/components/form/text-field"));
const TextareaField = lazy(() => import("@/components/form/textarea-field"));

function SubscribeButton(props: ComponentProps<typeof Button>) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" {...props} disabled={isSubmitting} />
      )}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: { TextField, TextareaField },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
