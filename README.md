# Environment Setup Documentation for Spreadsheet Project

## Getting started

### Cloning the Repository
Clone the Repository: Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/NoroffFEU/unnamed-spreadsheet-project
```

Navigate to the Project Directory:

```bash
cd unnamed-spreadsheet-project
```

Checkout the Workflow Branch:

```bash
git checkout workflow
```

### Create your own feature branch from the workflow branch:

```bash
git checkout -b <your-branch-name>
```
Replace <your-branch-name> with the name of your feature branch.


### Installing Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

Set Up Husky: Run the following command to install Husky hooks:

```bash
npx husky install
```

### Running the Development Server

Start the Development Server:

```bash
npm run dev
```

Build the Project: To build the project for production, run:

```bash
npm run build
```

Preview the Build: To preview the build locally, run:

```bash
npm run preview
```

### Linting and Formatting
Prettier and ESLint: The project uses Prettier for code formatting and ESLint for linting. These tools are integrated into the project and will run automatically on staged files before each commit.

### Push your branch to the repository and create a pull request to merge your changes.
