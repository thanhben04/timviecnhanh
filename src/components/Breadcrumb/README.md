# Breadcrumb Component

A reusable breadcrumb navigation component built with Ant Design and React Router for the 2Hand frontend application.

## Features

-   🏠 Automatic home link insertion
-   🎨 Responsive design with mobile optimization
-   🌙 Dark theme support
-   🔗 React Router integration
-   📱 Mobile-friendly breakpoints
-   🎯 TypeScript support
-   🌍 i18n translation support

## Installation

The component is already set up in the project. Import and use:

```tsx
import Breadcrumb from '../components/Breadcrumb';
import { BreadcrumbItem } from '../components/Breadcrumb/types';
```

## Basic Usage

### Simple Breadcrumb

```tsx
import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

const MyPage = () => {
    const items = [
        {
            key: 'profile',
            title: 'Profile',
            href: '/profile',
            icon: <UserOutlined />,
        },
        {
            key: 'settings',
            title: 'Settings',
            icon: <SettingOutlined />,
        },
    ];

    return (
        <div>
            <Breadcrumb items={items} />
            {/* Your page content */}
        </div>
    );
};
```

### With Custom Separator

```tsx
<Breadcrumb items={items} separator=">" className="my-custom-breadcrumb" />
```

## Advanced Usage with Hooks

### Profile-Specific Breadcrumbs

For profile pages, use the specialized hook:

```tsx
import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useProfileBreadcrumb } from '../hooks/useProfileBreadcrumb';

const ProfilePage = () => {
    const breadcrumbItems = useProfileBreadcrumb('security'); // or 'personal', 'notifications', etc.

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            {/* Profile content */}
        </div>
    );
};
```

### Dynamic Breadcrumbs with Route Detection

```tsx
import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useBreadcrumb } from '../hooks/useBreadcrumb';

const DynamicPage = () => {
    const breadcrumbItems = useBreadcrumb(); // Automatically detects current route

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            {/* Page content */}
        </div>
    );
};
```

## Props

### BreadcrumbProps

| Prop        | Type               | Default | Description                    |
| ----------- | ------------------ | ------- | ------------------------------ |
| `items`     | `BreadcrumbItem[]` | `[]`    | Array of breadcrumb items      |
| `separator` | `React.ReactNode`  | `'/'`   | Custom separator between items |
| `className` | `string`           | `''`    | Additional CSS class           |

### BreadcrumbItem

| Property | Type              | Required | Description                      |
| -------- | ----------------- | -------- | -------------------------------- |
| `key`    | `string`          | Yes      | Unique identifier                |
| `title`  | `string`          | Yes      | Display text                     |
| `href`   | `string`          | No       | Link URL (omit for current page) |
| `icon`   | `React.ReactNode` | No       | Optional icon                    |

## Styling

### CSS Classes

-   `.custom-breadcrumb` - Main container
-   `.breadcrumb-item` - Individual breadcrumb item
-   `.breadcrumb-icon` - Icon wrapper
-   `.breadcrumb-text` - Text wrapper
-   `.breadcrumb-link` - Clickable links
-   `.breadcrumb-current` - Current page styling

### Responsive Breakpoints

-   Desktop: Full size with 16px margins
-   Mobile (≤768px): Smaller text and reduced margins

### Dark Theme

Automatically adapts to system dark theme preference using CSS media queries.

## Examples in the Project

### Profile Page Implementation

```tsx
// src/pages/Profile/Profile.tsx
import { useProfileBreadcrumb } from '../../hooks/useProfileBreadcrumb';

const Profile = () => {
    const [selectedKey, setSelectedKey] = useState('personal');
    const breadcrumbItems = useProfileBreadcrumb(selectedKey);

    return (
        <div className="profile-page">
            <Breadcrumb items={breadcrumbItems} />
            {/* Profile content */}
        </div>
    );
};
```

### Custom Page Breadcrumb

```tsx
// Any page
const CustomPage = () => {
    const breadcrumbItems = [
        {
            key: 'products',
            title: 'Products',
            href: '/products',
            icon: <ShoppingOutlined />,
        },
        {
            key: 'category',
            title: 'Electronics',
            href: '/products/electronics',
        },
        {
            key: 'item',
            title: 'iPhone 15 Pro',
        },
    ];

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            {/* Page content */}
        </div>
    );
};
```

## Available Hooks

### useProfileBreadcrumb(section)

Generates breadcrumbs for profile pages with proper section highlighting.

**Parameters:**

-   `section`: `'personal' | 'security' | 'notifications' | 'orders' | 'favorites' | 'settings'`

### useBreadcrumb()

Automatically generates breadcrumbs based on current route (Future enhancement).

## Translation Keys

The component uses these i18n keys:

-   `home` - Home page title
-   `profile` - Profile page title
-   `profile_page.personal_info` - Personal info section
-   `profile_page.security` - Security section
-   `profile_page.notifications` - Notifications section
-   `profile_page.my_orders` - Orders section
-   `profile_page.favorites` - Favorites section
-   `profile_page.settings` - Settings section

## Best Practices

1. **Always provide a key**: Each breadcrumb item needs a unique key
2. **Don't link the last item**: The current page shouldn't be clickable
3. **Use icons sparingly**: Icons help with recognition but don't overuse
4. **Keep titles short**: Breadcrumbs should be concise
5. **Test on mobile**: Ensure breadcrumbs work well on small screens

## Browser Support

-   Chrome 90+
-   Firefox 88+
-   Safari 14+
-   Edge 90+

## Dependencies

-   React 18+
-   Ant Design 5+
-   React Router DOM 6+
-   React i18next 12+
