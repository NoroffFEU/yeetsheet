
# YeetSheet Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Running the Project](#running-the-project)
5. [Features](#features)
6. [Configuration](#configuration)
7. [How to Contribute](#how-to-contribute)
8. [Development Setup](#development-setup)

## Project Overview

### Project Name
**YeetSheet**

**Description**: A lightweight spreadsheet web application that can be used in any browser to manage tabular data with JavaScript syntax. Designed for ease of use and portability, meaning it can be used either online or offline. YeetSheet is perfect for developers, educators, students, and businesses.

### Project Links
- [GitHub (main)](https://github.com/NoroffFEU/yeetsheet)
- [GitHub (workflow)](https://github.com/NoroffFEU/yeetsheet/tree/workflow)
- [README.md](https://github.com/NoroffFEU/yeetsheet/blob/main/README.md)
- [Netlify](https://yeetsheet.netlify.app/)
- [Figma Designs (Zip File)](https://github.com/user-attachments/files/15737642/Prototype.files.zip)

### Purpose
This project's purpose is to create a lightweight browser-based web application for managing tabular data using JavaScript syntax instead of the proprietary language other traditional spreadsheet applications use.

#### Some problems this project aims to solve are:
1. **Complex Syntax and Legacy Issues**:
    - **Legacy Constraints**: The syntax of many existing spreadsheet applications, although powerful, has accumulated numerous legacy constraints over the decades since their inception.
    - **Steep Learning Curve**: Functions and syntax in many traditional spreadsheets are often not intuitive, posing a significant challenge for new users to master.

2. **Portability and Accessibility**:
    - **Device Independence**: Unlike traditional spreadsheets that often require specific software installations or subscriptions, YeetSheet is entirely portable and accessible on any device with a browser.
    - **Code and Data Sharing**: Traditional CSV files are limited in preserving functions and often need mainstream applications for optimal viewing. YeetSheet overcomes this by allowing seamless code and data sharing without these restrictions.

### Technologies
**Main Technologies**:
- JavaScript
- HTML
- CSS

**Libraries and Frameworks**:
- Tailwind CSS
- Vite
- Cypress
- Husky
- Prettier
- ESLint
- Babel
- Jest

### Project Status
**Current Status**: Ongoing. The project is currently in the development phase.

## Installation

### Cloning the repository
Open your terminal and run the following command to clone the repository:
```bash
git clone https://github.com/NoroffFEU/yeetsheet
```

Navigate to the project directory:
```bash
cd yeetsheet
```

If you are going to work on the code, you should create your own feature branch from the workflow branch:

Checkout the Workflow branch:
```bash
git checkout workflow
```

Create your feature branch:
```bash
git checkout -b <your-branch-name>
```

### Installing dependencies
Run the following command to install all necessary dependencies:
```bash
npm install
```

Run the following command to install Husky hooks:
```bash
npx husky install
```

## Usage

## Running the Project
To start the development server run:
```bash
npm run dev
```

To build the project for production run:
```bash
npm run build
```

To preview the build locally run:
```bash
npm run preview
```

## Features

### JavaScript Syntax
Unlike traditional spreadsheet applications that use proprietary formulas, this application allows users to write cell functions using JavaScript syntax.

### Portable Runtime
The application is designed to be lightweight and portable, functioning on any device with a web browser.

### Integration with Third-Party Libraries
Due to the open nature of the application, it allows for seamless integration with various third-party libraries.

### User Friendly Interface
Utilizing Tailwind CSS for styling, the application features a clean, intuitive, and responsive user interface. It is designed to be easy to use.

### Educational Tool for JavaScript
By using JavaScript for cell functions, the application serves as a practical learning tool for users to improve their JavaScript skills.

## Configuration

### Environment Variables
- `.env.example`

### Configuration Files
- [`package.json`](https://github.com/NoroffFEU/yeetsheet/blob/workflow/package.json)
  - **Purpose**: Manages the project’s dependencies and scripts.
  - **Format**: JSON
- `vite.config.js`
  - **Purpose**: Configuration for Vite.
  - **Format**: JavaScript
- `babel.config.js`
  - **Purpose**: Configuration for Babel.
  - **Format**: JavaScript
- `cypress.config.js`
  - **Purpose**: Configuration for Cypress.
  - **Format**: JavaScript
- `eslint.config.js`
  - **Purpose**: Configuration for ESLint.
  - **Format**: JavaScript
- `jest.config.js`
  - **Purpose**: Configuration for Jest.
  - **Format**: JavaScript
- [`jsconfig.json`](https://github.com/NoroffFEU/yeetsheet/blob/workflow/jsconfig.json)
  - **Purpose**: Enables auto complete in VS Code.
  - **Format**: JSON
- `postcss.config.js`
  - **Purpose**: Configuration for PostCSS.
  - **Format**: JavaScript
- [`tailwind.config.js`](https://github.com/NoroffFEU/yeetsheet/blob/workflow/tailwind.config.js)
  - **Purpose**: Configuration for Tailwind CSS.
  - **Format**: JavaScript
- [`netlify.toml`](https://github.com/NoroffFEU/yeetsheet/blob/workflow/netlify.toml)
  - **Purpose**: Configuration for Netlify.
  - **Format**: TOML

## How to Contribute

### Code Contributions / Pull Requests
1. Clone the repository:
    ```bash
    git clone https://github.com/NoroffFEU/yeetsheet
    cd yeetsheet
    ```

2. Create a feature branch:
    ```bash
    git checkout workflow
    git checkout -b <your-branch-name>
    ```

3. Contribute code: Implement your feature or bug fix.

4. Commit and push your changes:
    ```bash
    git add .
    git commit -m "<commit-message>"
    git push origin <your-branch-name>
    ```

5. Create a Pull Request: Create a Pull Request from your branch to the `workflow` branch.

### Reporting Issues
1. **Check existing issues**: Before you report a new issue, check if it has already been reported in the issues section.
2. **Open a new issue**: If you find a new bug or have general feedback, open a new issue. Provide a clear and detailed description, including steps to reproduce the issue if applicable. Remember to apply the appropriate label to the issue before submitting.

### Requesting Features
1. **Check existing requests**: Before you report a new feature, check if it has already been requested in the issues section.
2. **Open a feature request**: If the feature has not been requested, open a new issue with a detailed description of the feature and why it would be useful. Remember to label the issue “enhancement” to indicate that it is a request.

## Development Setup

### Prerequisites
Before you begin, ensure that you have the following software installed on your computer:
- Node.js
- Git
