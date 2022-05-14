import React from "react";
import { MemoryRouter } from "react-router";

import AppBar from "./AppBar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "NoriginMedia/AppBar",
  component: AppBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // Sets the layout parameter component wide.
  argTypes: {
    simple: { control: { type: "boolean" } },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <AppBar {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  simple: false,
};

