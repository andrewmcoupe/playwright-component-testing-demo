import { test, expect } from "@playwright/experimental-ct-react";
import { EditableText } from "./EditableText.tsx";

test("input should focus when clicking on the placeholder", async ({
  mount,
}) => {
  const component = await mount(
    <EditableText label={"Update your username"} placeholder={"John Doe"} />,
  );

  await expect(component).toContainText("John Doe");
  await expect(component).toContainText("Update your username");

  const placeholder = component.getByText("John Doe");
  await placeholder.click();

  await expect(component.getByLabel("editable input")).toBeFocused();
});

test("input should focus when pressing tab", async ({ mount }) => {
  const component = await mount(
    <EditableText label={"Update your username"} placeholder={"John Doe"} />,
  );

  await component.press("Tab");

  await expect(component.getByLabel("editable input")).toBeFocused();
});

test("input should focus when clicking the edit button", async ({ mount }) => {
  const component = await mount(
    <EditableText label={"Update your username"} placeholder={"John Doe"} />,
  );

  const editButton = component.getByRole("button", { name: "Edit" });
  await editButton.click();

  await expect(component.getByLabel("editable input")).toBeFocused();
});

test("Editing text and clicking save should update the inputs value", async ({
  mount,
}) => {
  const component = await mount(
    <EditableText label={"Update your username"} placeholder={"John Doe"} />,
  );

  const editButton = component.getByRole("button", { name: "Edit" });
  await editButton.click();

  await expect(component.getByLabel("editable input")).toBeFocused();

  await component.getByLabel("editable input").fill("Jane Doe");

  const saveButton = component.getByLabel("submit");
  await saveButton.click();

  await expect(component.getByLabel("editable input")).toHaveValue("Jane Doe");
});

test("Editing text and clicking cancel should preserve the original input value", async ({
  mount,
}) => {
  const component = await mount(
    <EditableText label={"Update your username"} placeholder={"John Doe"} />,
  );

  const editButton = component.getByRole("button", { name: "Edit" });
  await editButton.click();

  await expect(component.getByLabel("editable input")).toBeFocused();

  await component.getByLabel("editable input").fill("Jane Doe");

  const cancelButton = component.getByLabel("cancel");
  await cancelButton.click();

  await expect(component.getByLabel("editable input")).toHaveValue("");
});

test("Pressing the escape key should remove focus from the input and cancel any input changes", async ({
  mount,
}) => {
  const component = await mount(
    <EditableText label={"Update your username"} placeholder={"John Doe"} />,
  );

  const editButton = component.getByRole("button", { name: "Edit" });
  await editButton.click();

  await expect(component.getByLabel("editable input")).toBeFocused();

  await component.getByLabel("editable input").fill("Jane Doe");

  await component.getByLabel("editable input").press("Escape");

  await expect(component.getByLabel("editable input")).toHaveValue("");
  await expect(component.getByLabel("editable input")).not.toBeFocused();
});
