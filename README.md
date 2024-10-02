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

## Cell navigation

It's possible to navigate through the cells with the keyboard in an Excel-like mode:

- arrow keys
- Tab navigate to the right,
- shift+Tab to the left,
- enter to the bottom

## Cell editing callbacks

When the cell get the focus, a callback is available to fetch the cell content to be shown.
When the cell blurs, a callback is available to save the cell content.

---

## Custom Colors in Tailwind CSS

Our project uses a set of custom colors defined in the Tailwind configuration file. These colors are prefixed with `ys-` to indicate their association with this project.

- **ys-buttonPrimary**: Used for primary buttons, links, and important highlights.
- **ys-buttonSecondary**: Used for secondary buttons and borders.
- **ys-buttonTertiary**: Used for uploading buttons.

### Usage Examples

To use these custom colors in your CSS classes, simply refer to them by their names:

```html
<button class="bg-ys-buttonPrimary text-ys-backgroundAndText">Primary Button</button>
<button class="border-ys-buttonSecondary p-4">Secondary Border</div>
<button class="bg-ys-buttonTertiary text-ys-backgroundAndText">Tertiary Button</button>
```

## Icons

The icon system works by selecting all elements in the document that have the `data-icon` attribute. For each of these elements, it retrieves the icon name, size, and optional class from the data attributes. It then returns the corresponding SVG icon, parses it into an HTML element, and replaces the original element with this new SVG element.

### Adding new icons

If you need to add a new icon go to `js/icons/index.js`, and place the SVG code and a descriptive key in the object. This key has to match the value of the data-icon attribute.

- Add `height="${size}" class="${classes}"`
- Remove width, fill and stroke attributes ( you may need to test which strokes and fills need to be removed or replaced by `currentColor` )

### Usage Examples

```html
<span data-icon="home" data-size="24" data-class="icon-home"></span>
<span data-icon="settings" data-size="32" data-class="icon-settings"></span>
<span data-icon="user" data-size="16" data-class="icon-user"></span>
```
