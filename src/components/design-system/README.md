# Design System

A comprehensive design system built with React, TypeScript, and Tailwind CSS for the Soulcode website.

## Structure

The design system follows atomic design principles:

### Atoms

Basic building blocks that can't be broken down further:

- **Button** - Reusable button component with multiple variants and sizes
- **Input** - Form input with label, error states, and icons
- **Textarea** - Multi-line text input with validation
- **Select** - Dropdown selection component
- **Card** - Container component with header, content, and footer
- **Badge** - Small status or label component

### Molecules

Combinations of atoms that form functional units:

- **FormField** - Wrapper for form inputs with label and validation
- **ColorPicker** - Color selection with preview
- **StatusIndicator** - Online/offline status with animation
- **ProgressBar** - Progress indication with variants
- **Modal** - Overlay dialog component

### Organisms

Complex components made of molecules and atoms:

- **OrderForm** - Complete order form with validation
- **ServiceCard** - Service display card with pricing
- **OrdersTable** - Data table for order management

## Usage

```tsx
import { Button, Card, OrderForm } from '@/components/design-system';

// Use individual components
<Button variant="primary" size="lg">Click me</Button>

// Use complex components
<OrderForm 
  services={services}
  onSubmit={handleSubmit}
  loading={isLoading}
/>
```

## Features

- **TypeScript Support** - Full type safety and IntelliSense
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Built-in dark mode support
- **Accessibility** - ARIA labels and keyboard navigation
- **Customizable** - Extensive theming options
- **Consistent** - Unified design language across components

## Styling

Components use Tailwind CSS with custom utilities:

- Consistent spacing and typography
- Emerald color scheme
- Smooth animations and transitions
- Focus states and hover effects

## Dependencies

- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind class merging
- `react-icons` - Icon library
