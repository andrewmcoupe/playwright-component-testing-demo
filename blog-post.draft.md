# Testing components with Playwright Component Testing - Part 1

The goal of this post is to show how easy it is to get started with Playwright Component Testing in the context of a Vitest TypeScript React project.
I'll be using [Ark UI](https://ark-ui.com/) to test a slightly complex UI component. In general, you shouldn't need to test third party components, but I'm doing it for the sake of this example.


I'm using `pnpm` as my package manager, but you can use an alternative if you prefer.

## 1️⃣ Create a new Vitest React project

This will scaffold out a new project with the React TypeScript template.

```bash
pnpm create vite my-app --template react-ts
```

## 2️⃣ Initialise the Playwright Component Testing setup

This will scaffold out the Playwright Component Testing setup and append some scripts in your `package.json`.

```bash
pnpm create playwright --ct
```

You'll be asked a few questions so select the options which are relevant to you.

A `playwright-ct.config.ts` file will be created in the root of the project. This is where you can configure the Playwright Component Testing setup.

A `playwright` directory will also be created in the root of the project with the following structure:

```
playwright
    ├── index.html # The HTML file which will be used to render the component.
    └── index.tsx # Used for anything your component needs at runtime.

```

## 3️⃣ Add Ark UI

This will add Ark UI to the project, allowing us to use the components in our tests.

```bash
pnpm add @ark-ui/react
```

## 4️⃣ Create a component we can test

Create a new component in `src/components/EditableText.tsx`:

```tsx
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
```

## 5️⃣ Create a test file for the component

Create a new test file in `src/components/EditableText.test.tsx`:

```tsx
import { test, expect } from "@playwright/experimental-ct-react";
import { EditableText } from "./EditableText.tsx";

test("input should focus when clicking on the placeholder", async ({
  mount,
}) => {
    /*
    * The mount function is provided by Playwright Component Testing.
    * It will mount the component and return a reference to the component.
    * */
  const component = await mount(
    <EditableText label={"Update your username"} placeholder={"John Doe"} />,
  );

  await expect(component).toContainText("John Doe");
  await expect(component).toContainText("Update your username");

  const placeholder = component.getByText("John Doe");
  await placeholder.click();

  await expect(component.getByLabel("editable input")).toBeFocused();
});
```

## 6️⃣ Rename the generated `package.json` scripts to something more intuitive

```json
  "test:components": "playwright test -c playwright-ct.config.ts",
  "test:components:ui": "pnpm test-ct --ui"
```

## 7️⃣ Run the tests

🤕 Headless mode:

```bash
pnpm test:components
```

🖥️ In browser:

```bash
pnpm test:components:ui # To run the tests within a browser UI,
```


