# NestNuggets Design System

## Overview
This document outlines the unified design system for NestNuggets, ensuring consistency across all pages and components.

## Color Palette

### Primary Colors
- **Primary Green**: `#2d5016` - Primary action color, headings
- **Primary Light**: `#c8d5b9` - Card backgrounds, secondary areas
- **Primary Lighter**: `#e8f0dd` - Backgrounds for emphasized sections

### Neutral Colors
- **Dark**: `#1a1a1a` - Dark text, not pure black for readability
- **Text**: `#333333` - Primary text color
- **Text Light**: `#666666` - Secondary text, muted information
- **Background**: `#faf3dd` - Main page background (cream)
- **Background Secondary**: `#f5f0e8` - Secondary backgrounds
- **Border**: `#d4cfc4` - Border and divider color

### Accent Colors
- **Accent**: `#d4a574` - Secondary actions, highlights
- **Accent Dark**: `#b8895e` - Hover state for accents
- **Success**: `#28a745` - Success states
- **Warning**: `#ffc107` - Warning/important information
- **Danger**: `#dc3545` - Delete, error states
- **Info**: `#17a2b8` - Information messages

## Typography

### Font Family
Primary: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...` (System fonts for optimal performance)

### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.5rem (24px)
- **2xl**: 2rem (32px)
- **3xl**: 2.5rem (40px)

### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Heading Hierarchy
- **H1**: 2.5rem, Bold, Primary color - Page titles
- **H2**: 2rem, Bold, Primary color - Section titles
- **H3**: 1.5rem, Semibold, Primary color - Subsection titles
- **H4-H6**: 1.125rem, Semibold - Component titles

## Spacing System

Used consistently for padding, margins, and gaps:
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Border Radius

- **sm**: 0.25rem (4px) - Small elements
- **md**: 0.5rem (8px) - Buttons, inputs
- **lg**: 1rem (16px) - Cards, larger components
- **xl**: 1.5rem (24px) - Modals, prominent elements
- **full**: 9999px - Fully rounded (pills, circles)

## Shadow System

- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)` - Subtle elevation
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` - Default elevation
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)` - Interactive hover
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)` - Modal/prominent

## Transitions

- **fast**: 150ms ease-in-out - Quick interactions (button hover)
- **base**: 250ms ease-in-out - Standard transitions
- **slow**: 350ms ease-in-out - Important state changes

## Component Patterns

### Buttons

#### Primary Button
```jsx
<Button variant="primary" className="btn btn-primary">
  Action Text
</Button>
```
- Background: Primary Green (#2d5016)
- Text: White
- On Hover: Darker green, lifted shadow
- Padding: md (1rem vertical), lg (1.5rem horizontal)

#### Secondary Button
```jsx
<Button variant="secondary" className="btn btn-secondary">
  Secondary Action
</Button>
```
- Background: Accent (#d4a574)
- Text: White
- On Hover: Darker accent

#### Outline Button
```jsx
<Button className="btn btn-outline">
  Outline Action
</Button>
```
- Background: Transparent
- Border: 2px Primary Green
- Text: Primary Green
- On Hover: Light background

### Cards

```jsx
<Card className="shadow rounded-lg">
  <Card.Img src="..." style={{ height: '280px', objectFit: 'cover' }} />
  <Card.Body className="bg-primary-light">
    <Card.Title className="text-primary">Title</Card.Title>
    <Card.Text className="text-secondary">Description</Card.Text>
  </Card.Body>
</Card>
```

Features:
- Border radius: lg (1rem)
- Shadow: md by default, lg on hover
- Image height: 280px with object-fit: cover
- Body background: Primary Light (#c8d5b9)
- Title color: Primary
- Description text: Light gray

### Navigation Bar

Features:
- Fixed position, z-index 1000
- Background: Cream (#faf3dd)
- Shadow: sm (subtle)
- Logo + Brand name combined
- Navigation links right-aligned
- Sign In/Out button on the right

### Forms

Features:
- Label: Medium weight, primary color, capitalize
- Input: 2px border, md padding, focus shadow
- Placeholder: Light gray text
- Focus state: Primary border + light primary shadow
- Gap between elements: lg (1.5rem)

## Responsive Design

- **Mobile**: < 576px
- **Tablet**: 576px - 992px
- **Desktop**: > 992px

### Card Grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

## Accessibility

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Focus states: Visible outline or shadow
- Button text: Clear, descriptive action text
- Images: Alt text always provided
- Color not the only indicator: Use text labels with colors

## Implementation Guidelines

### CSS Classes
Use CSS custom properties (variables) from `design-system.css`:
```css
color: var(--color-primary);
padding: var(--spacing-md);
border-radius: var(--border-radius-lg);
box-shadow: var(--shadow-md);
transition: all var(--transition-base);
```

### Component Structure
1. Use Bootstrap for grid and responsive utilities
2. Apply design system classes for styling
3. Use CSS variables for all values (colors, spacing, shadows)
4. Avoid inline styles except for dynamic values
5. Keep component-specific styles minimal

### Best Practices
- Use semantic HTML (buttons for actions, links for navigation)
- Maintain consistent spacing using the spacing scale
- Use the color palette only
- Apply shadows consistently (md for normal, lg for hover)
- Use transitions for all state changes
- Test on mobile, tablet, and desktop

## File Structure

```
styles/
├── globals.css          # Global styles, imports design-system.css
├── design-system.css    # Design system definitions (colors, typography, spacing)
components/
├── NoAuthReviewCard.js  # Property card for unauthenticated users
├── AuthReviewCard.js    # Property card for authenticated users
├── NoAuthNavBar.js      # Navigation for unauthenticated users
├── NavBarAuth.js        # Navigation for authenticated users
└── ...
```

## Future Considerations

1. **Component Library**: Create reusable component wrappers (Button, Card, Input)
2. **Dark Mode**: Add dark theme CSS variables
3. **Mobile Optimization**: Refine breakpoints and responsive behavior
4. **Animation Library**: Consider adding micro-interactions for better UX
5. **Icon System**: Standardize icon usage and sizing

## Questions?

When adding new features or components:
1. Check this design system first
2. Use existing color, spacing, and shadow scales
3. Match patterns from existing components
4. Keep styling in CSS, not inline
5. Test across all device sizes
