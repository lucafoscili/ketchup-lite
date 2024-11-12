<!-- markdownlint-disable MD033 -->
# Ketchup Lite

<div align="center">

   ![Components](https://img.shields.io/badge/dynamic/json?logo=stencil&logoColor=black&labelColor=white&color=black&label=Components&query=components&url=https://raw.githubusercontent.com/lucafoscili/ketchup-lite/main/count.json) ![npm Package](https://img.shields.io/npm/v/ketchup-lite.svg?logo=npm&logoColor=black&labelColor=white&color=black)

</div>

<div align="center">

   ![Ketchup Lite Logo](https://github.com/lucafoscili/ketchup-lite/blob/375581f13119ec393256ac4162212936ecf29d3d/docs/images/Logo.png 'Ketchup Lite logo')

</div>

<div align="center">

![GitHub top language](https://img.shields.io/github/languages/top/lucafoscili/ketchup-lite?logo=typescript&logoColor=black&labelColor=white&color=black) ![GitHub last commit](https://img.shields.io/github/last-commit/lucafoscili/ketchup-lite?logo=github&logoColor=black&labelColor=white&color=black) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/lucafoscili/ketchup-lite/cypress-tests.yaml?logo=cypress&logoColor=black&labelColor=white&color=black)

</div>

Ketchup Lite is a lightweight and versatile Web Components library designed to enhance your web development experience. It is a fork stemming from the original [Ketchup project](https://github.com/smeup/ketchup), aiming to provide a streamlined and efficient set of tools for developers.

Built with modern standards and best practices in mind, Ketchup Lite offers a collection of reusable components that can seamlessly integrate into any web project, regardless of the framework or vanilla JavaScript setup.

<div style="display:flex; justify-content: center">

[![Next.js-deployed showcase](https://img.shields.io/badge/showcase-black?style=for-the-badge&logo=next.js&logoColor=black&label=Next.js&labelColor=white&color=black&link=https%3A%2F%2Fwww.lucafoscili.com%2Fketchup-lite&link=https%3A%2F%2Fwww.lucafoscili.com%2Fketchup-lite)](https://www.lucafoscili.com/ketchup-lite)

</div>

## Table of Contents

- [Ketchup Lite](#ketchup-lite)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Main differences from Ketchup](#main-differences-from-ketchup)
  - [Documentation](#documentation)
  - [Contributing](#contributing)
  - [License](#license)
  - [Credits](#credits)

## Features

- **Customizable**: Easily tailor the appearance and behavior of components to match your project's design system.
- **Accessible**: Designed with accessibility in mind, ensuring that your applications are usable by everyone.
- **Efficient**: Lightweight components that won't slow down your application.
- **Cross-Browser Compatible**: Works across all major browsers without additional polyfills.
- **Framework Agnostic**: Use with React, Vue, Angular, or just plain JavaScript.
  
<div align="right">

[(Back to Top)](#ketchup-lite)

</div>

## Getting Started

### Installation

To add Ketchup Lite to your project, you can install it via yarn:

```sh
yarn install ketchup-lite
```

### Usage

After installing, you can import and use Ketchup Lite components in your project. Here's a quick example of how to use the `<kul-button>` component:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Ketchup Lite Example</title>
        <script
            type="module"
            src="./path/to/ketchup-lite/dist/index.js"
        ></script>
    </head>
    <body>
        <kul-button kul-label="Click me!" />
    </body>
</html>
```

Make sure to replace `./path/to/ketchup-lite/dist/index.js` with the correct path to the `index.js` file in your `node_modules/ketchup-lite` directory.

<div align="right">

[(Back to Top)](#ketchup-lite)

</div>

## Main differences from Ketchup

Ketchup Lite, while sharing a common heritage with the original Ketchup project, has been tailored to cater to specific needs and preferences. Here are some key differences that set Ketchup Lite apart:

- **Lighter**: Ketchup Lite is designed to be significantly lighter, making it an ideal choice for personal websites or smaller projects where performance and load times are critical.

- **Oriented Towards Personal Websites/Projects**: With a focus on simplicity and ease of use, Ketchup Lite is more suited for individual developers or small teams working on personal projects. It offers a streamlined set of features that are easy to implement and maintain.

- **Glassmorphism Look**: Ketchup Lite incorporates a glassmorphism aesthetic throughout its components. This gives a modern, transparent, and sleek appearance to the UI elements, enhancing the visual appeal of personal projects.

- **Absence of the KupObj Concept**: Unlike the original Ketchup, Ketchup Lite does not include the KupObj concept.
- **Absence of FComponents**: Given the library's limited scope, converting its basic components to functional components is unnecessary. If you plan to add thousands of nested web components, it is recommended to stick to the original project.

- **Event Management**: Each component emits a single generic event that encapsulates various actions. Here is an example of how to listen for a button's click event:

```javascript
const myButton = document.querySelector('kul-button');
myButton.addEventListener('kul-button-event', (e) => {
    if (e.detail.eventType === 'click') {
        console.log('Click!');
    }
});
```

<div align="right">

[(Back to Top)](#ketchup-lite)

</div>

## Documentation

For detailed information about each component, including available properties, events, and methods, please refer to the [showcase](https://www.lucafoscili.com/ketchup-lite).

<div align="right">

[(Back to Top)](#ketchup-lite)

</div>

## Contributing

I'm working on this project primarily for fun and for my portfolio website during my free time, but P.R. from other users that find this library useful are welcome!

<div align="right">

[(Back to Top)](#ketchup-lite)

</div>

## License

Ketchup Lite is open-source software licensed under the MIT license. See the LICENSE file for more details.

<div align="right">

[(Back to Top)](#ketchup-lite)

</div>

## Credits

Special thanks to the following libraries and frameworks that make this project possible:

- [Lerna](https://github.com/lerna/lerna) for managing the monorepo structure.
- [Stencil](https://stenciljs.com/) for building fast web apps using Web Components.
- [Echarts](https://echarts.apache.org/) for providing data visualization components.
- [Ketchup](https://github.com/smeup/ketchup) for the original project from which Ketchup Lite is derived.

<div align="right">

[(Back to Top)](#ketchup-lite)

</div>
