# Styles Organization

This folder contains all the CSS styles for the KuroiFlip application, organized for maintainability and scalability.

## File Structure

```
styles/
├── index.css          # Main entry point - imports all other files
├── globals.css        # Global styles, CSS variables, and base components
├── components.css     # Game-specific component styles
├── animations.css     # Custom animations and transitions
├── responsive.css     # Responsive design and media queries
└── README.md         # This documentation file
```

## Import Order

The styles are imported in a specific order to ensure proper cascading:

1. **globals.css** - Base styles, CSS variables, and component classes
2. **components.css** - Game-specific component styles
3. **animations.css** - Custom animations and transitions
4. **responsive.css** - Responsive design and media queries

## CSS Architecture

### Global Styles (`globals.css`)
- CSS custom properties (variables)
- Base element styles
- Component utility classes
- Tailwind CSS imports and customizations

### Component Styles (`components.css`)
- Game card specific styles
- Form component styles
- Button variations
- Status indicators
- Loading states

### Animations (`animations.css`)
- Custom keyframe animations
- Transition utilities
- Hover effects
- Loading animations
- Stagger animations

### Responsive Design (`responsive.css`)
- Mobile-first approach
- Breakpoint-specific styles
- Accessibility considerations
- Print styles
- High contrast mode support

## Usage Guidelines

### CSS Classes
- Use semantic class names
- Follow BEM methodology when appropriate
- Leverage Tailwind utility classes
- Create custom classes for complex components

### CSS Variables
```css
:root {
  --primary: #6366f1;
  --secondary: #f59e0b;
  --background: #0f172a;
  /* ... */
}
```

### Component Classes
```css
.btn-primary { /* ... */ }
.card { /* ... */ }
.input-field { /* ... */ }
```

### Animation Classes
```css
.animate-fade-in { /* ... */ }
.hover-lift { /* ... */ }
```

## Best Practices

1. **Mobile First**: Write styles for mobile first, then enhance for larger screens
2. **Performance**: Use CSS transforms and opacity for animations
3. **Accessibility**: Support reduced motion preferences
4. **Maintainability**: Use consistent naming conventions
5. **Scalability**: Organize styles by component and functionality

## Adding New Styles

1. **Global styles**: Add to `globals.css`
2. **Component styles**: Add to `components.css`
3. **Animations**: Add to `animations.css`
4. **Responsive styles**: Add to `responsive.css`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Performance Considerations

- Use CSS custom properties for theming
- Minimize CSS bundle size
- Use efficient selectors
- Leverage browser optimizations for animations 