# Technical Assessment: Product Catalog - Mini Project

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Supported Features](#supported-features)
- [Architecture & Trade-offs](#architecture--trade-offs)
- [Future Improvements](#future-improvements)
- [Tech Stack](#tech-stack)

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run test` - Run unit tests with Vitest

## Supported Features

### Core Functionality

- **Product Listing**: Display products in a paginated table with 5 items per page
- **Search**: Real-time product name search with 300ms debouncing for optimal performance
- **Filtering**:
  - Multi-select category filter (Audio, Display, Accessory, Keyboard)
  - In-stock only checkbox filter
- **Sorting**: Click column headers to sort by:
  - Updated datetime (default descending)
  - Product name
  - Category
  - Price
  - Status
- **Pagination**: Navigate through pages with Material-UI pagination component

### CRUD Operations

- **View**: Click "View" button to see complete product details in a side drawer
- **Create**: Click "Add" button to open form dialog and create new products
- **Edit**: Click "Edit" button to modify existing product information
- **Delete**: Click "Delete" button with confirmation dialog to remove products

### Form Management

- **Form Validation**:
  - Product name: Required, minimum 3 characters
  - Category: Required, dropdown selection
  - Price: Required, numeric, minimum value 0
  - Status: Required, dropdown (In Stock / Out of Stock)
  - Image URL: Required, valid URL pattern
  - Description: Required, minimum 10 characters
- **Auto-generated IDs**: New products automatically receive incremental IDs
- **Timestamp Management**: Updated datetime automatically refreshed on edits

### UI/UX Features

- **Responsive Design**: Material-UI components adapt to different screen sizes
- **Visual Feedback**:
  - Color-coded status chips (green for In Stock, red for Out of Stock)
  - Sortable column indicators with arrows
  - Hover effects on table rows
- **Image Display**: Product thumbnails in table and full-size in detail view
- **Date Formatting**: Timestamps shown in DD/MM/YYYY HH:mm:ss format (en-GB locale)

## Architecture & Trade-offs

### Feature-Based Structure

The codebase follows a feature-based architecture with kebab-case naming convention:

```
src/features/product-categories/
├── components/           # UI components
│   ├── delete-confirm-dialog.tsx
│   ├── product-detail-drawer.tsx
│   ├── product-filters.tsx
│   ├── product-form-dialog.tsx
│   └── product-table.tsx
├── hooks/               # Custom React hooks
│   ├── use-product-actions.ts
│   ├── use-product-filters.ts
│   └── use-product-form.ts
├── types/               # TypeScript type definitions
│   └── product-categories.types.ts
├── constants/           # Constants and mock data
│   └── product-categories.constants.ts
├── utils/               # Utility functions
│   └── product-categories.utils.ts
├── product-categories.tsx  # Main component
└── index.ts            # Public exports
```

**Benefits**:

- Clear separation of concerns
- Easy to locate and maintain code
- Scalable for adding new features
- Modular and reusable components

### Technical Decisions

1. **Client-side State Management**

   - Trade-off: Using React's `useState` instead of Redux/Context
   - Reason: Sufficient for single-feature scope, reduces complexity
   - Impact: Simpler codebase, but state doesn't persist across page reloads

2. **Debounced Search (300ms)**

   - Trade-off: Slight delay between typing and filtering
   - Reason: Prevents excessive re-renders and improves performance
   - Impact: Better UX for large datasets, minimal perceived latency

3. **react-hook-form**

   - Trade-off: Additional dependency vs. native form handling
   - Reason: Robust validation, less boilerplate, better performance
   - Impact: Professional form management with minimal code

4. **Material-UI Components**
   - Trade-off: Framework dependency vs. custom components
   - Reason: Rapid development, consistent design, accessibility built-in
   - Impact: Professional appearance with less CSS overhead

### Assumptions

- Users have modern browsers with JavaScript enabled
- Product IDs are numeric and auto-incremented
- Image URLs are valid and accessible
- Single-user environment (no concurrent editing concerns)
- English-only interface (internationalization not implemented)

## Future Improvements

- **Backend Integration**: Connect to real API for persistent data storage
- **State Management**: Implement Redux or Context API for global state
- **Accessibility**: Enhance ARIA attributes and keyboard navigation
- **Internationalization**: Support multiple languages with i18n libraries

## Tech Stack

- **React 19**: Modern React with hooks and concurrent features
- **TypeScript 5.9.3**: Type-safe development
- **Vite 7.2.2**: Lightning-fast build tool and dev server
- **Material-UI v7.3.5**: Comprehensive React component library
- **react-hook-form v7.66.0**: Performant form state management
- **Emotion 11.14.1**: CSS-in-JS styling solution
