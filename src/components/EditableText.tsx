import { Editable } from "@ark-ui/react";
import { ComponentProps } from "react";

type EditableTextProps = ComponentProps<typeof Editable> & {
  label: string;
};

export const EditableText = ({ label, ...rest }: EditableTextProps) => (
  <Editable.Root {...rest}>
    {(api) => (
      <>
        <Editable.Label>{label}</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          {api.isEditing ? (
            <>
              <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
              <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
            </>
          ) : (
            <Editable.EditTrigger>Edit</Editable.EditTrigger>
          )}
        </Editable.Control>
      </>
    )}
  </Editable.Root>
);
