# Bob's Calta 🧮

A React web application showcasing a collection of calculator programs for the **Casio fx-50FH II**. This interactive documentation provides detailed program code, usage instructions, and mathematical analysis for various recreational programs.

## 🌟 Features

- **Interactive Program Browser**: Browse through a collection of calculator programs with detailed documentation
- **Multilingual Support**: Full English and Traditional Chinese language support
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Detailed Code Analysis**: In-depth explanations of programming techniques and algorithms
- **Symbol Reference**: Comprehensive guide to Casio fx-50FH II programming symbols

## 📱 Programs Included

- **⚔️ Avalon**: Assistant for The Resistance: Avalon
- **📅 Date Duration**: Calculate duration between dates
- **🎲 Dice Roll**: Multi-dice simulator with selective re-rolls
- **🧩 Mastermind**: Classic code-breaking game
- **🃏 Poker Dealer**: Poker Card dealing simulation
- **⏱️ Timer & Stopwatch**: Timing utilities
- **⏱️ Timer with Counter**: Timer with counter function
- **📐 Trigonometry**: Triangle complete solution calculator

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CodeViewer.js
│   ├── CodeViewer.css
│   ├── Header.js
│   ├── Header.css
│   ├── LanguageSelector.js
│   └── LanguageSelector.css
├── contexts/            # React context providers
│   └── LanguageContext.js
├── data/                # Program data and symbols
│   ├── programs/        # Individual program JSON files
│   └── symbols.json     # Calculator symbol reference
├── pages/               # Main application pages
│   ├── HomePage.js
│   ├── HomePage.css
│   ├── ProgramPage.js
│   ├── ProgramPage.css
│   ├── SymbolsPage.js
│   └── SymbolsPage.css
└── utils/               # Utility functions
    ├── symbolFormatter.js
    └── useDocumentTitle.js
```

## 🎯 Usage

### Browsing Programs

1. Visit the homepage to see all available programs
2. Click on any completed program to view its details
3. Each program page includes:
   - Complete source code with line-by-line comments
   - Usage instructions and parameter explanations
   - Working examples with step-by-step execution
   - Technical analysis of algorithms and techniques

### Symbol Reference

- Navigate to the "Symbols" page for a comprehensive guide to calculator programming symbols
- Search and filter symbols by category
- View detailed descriptions and input methods for each symbol

### Language Support

- Toggle between English and Traditional Chinese using the language selector
- All content, including program descriptions and instructions, is fully localized

## 🔗 Related Resources

- [Casio fx-50FH II](https://www.casio.com/intl/scientific-calculators/product.Fx-50FHII) - Official calculator documentation
