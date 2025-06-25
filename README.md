# Bob's Calta 🧮

A React web application showcasing a collection of calculator programs for the **Casio fx-50FH II**. This interactive documentation provides detailed program code, usage instructions, and mathematical analysis for various recreational programs.

## 🌟 Features

- **Interactive Program Browser**: Browse through a collection of calculator programs with detailed documentation
- **Multilingual Support**: Full English and Traditional Chinese language support
- **Dark/Light Theme**: Toggle between dark and light themes for comfortable viewing
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Detailed Code Analysis**: In-depth explanations of programming techniques and algorithms
- **Symbol Reference**: Comprehensive guide to Casio fx-50FH II programming symbols

## 📱 Programs Included

- **🎲 Dice Roll**: Multi-dice simulator with customizable sides and selective re-rolling
- **🧩 Mastermind**: Classic code-breaking game implementation
- **📅 Date Duration**: Calculate duration between dates
- **⏱️ Timer & Stopwatch**: Timing utilities with counter functionality
- **🃏 Poker Dealer**: Card dealing simulation for poker games
- **⚔️ Avalon**: Game mechanics for The Resistance: Avalon

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CodeViewer.js   # Syntax-highlighted code display
│   ├── Header.js       # Navigation header
│   ├── LanguageSelector.js
│   └── ThemeToggle.js
├── contexts/           # React context providers
│   ├── LanguageContext.js
│   └── ThemeContext.js
├── data/              # Program data and symbols
│   ├── programs/      # Individual program JSON files
│   └── symbols.json   # Calculator symbol reference
├── pages/             # Main application pages
│   ├── HomePage.js    # Program listing page
│   ├── ProgramPage.js # Individual program details
│   └── SymbolsPage.js # Symbol reference guide
└── utils/             # Utility functions
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

- [Casio fx-50FH II](https://www.casio.com/intl/scientific-calculators/product.FX-50FHII) - Official calculator documentation

---

**Made with ❤️ for the calculator programming community**
