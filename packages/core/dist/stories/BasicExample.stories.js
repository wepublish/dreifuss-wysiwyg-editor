"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Small = exports.Large = exports.Secondary = exports.Primary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BasicExample_1 = require("./BasicExample");
exports.default = {
    title: 'Example/Editor',
    component: BasicExample_1.BasicExample,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
};
const Template = args => jsx_runtime_1.jsx(BasicExample_1.BasicExample, Object.assign({}, args), void 0);
exports.Primary = Template.bind({});
exports.Primary.args = {
    primary: true,
    label: 'Button'
};
exports.Secondary = Template.bind({});
exports.Secondary.args = {
    label: 'Button'
};
exports.Large = Template.bind({});
exports.Large.args = {
    size: 'large',
    label: 'Button'
};
exports.Small = Template.bind({});
exports.Small.args = {
    size: 'small',
    label: 'Button'
};
//# sourceMappingURL=BasicExample.stories.js.map