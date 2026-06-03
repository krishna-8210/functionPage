# Vite Hero UI Snippets

## Overview
This project is a snippet management application built with React and Vite. It allows users to create, edit, and delete snippet groups and individual snippets. The snippets can be JavaScript functions, and the application provides a user-friendly interface for managing these snippets.

## Features
- Create and manage snippet groups.
- Add, edit, and delete individual snippets within each group.
- Store snippets in the browser's local storage for persistence.
- Syntax highlighting for code snippets using Monaco Editor.
- Responsive design for a seamless user experience.

## Project Structure
```
vite-heroui-snippets
├── src
│   ├── pages
│   │   └── SnippetPage.tsx
│   ├── components
│   │   ├── SnippetGroup.tsx
│   │   ├── SnippetItem.tsx
│   │   ├── CreateSnippetGroup.tsx
│   │   ├── CreateSnippetItem.tsx
│   │   └── ModalComp.tsx
│   ├── libs
│   │   └── parseFn.ts
│   ├── hooks
│   │   └── useLocalStorage.ts
│   ├── layout
│   │   └── Layout.tsx
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd vite-heroui-snippets
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.