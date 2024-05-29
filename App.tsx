import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import Product from './Product';
import { View } from 'react-native';
import Weather from './Weather';
import { useTailwind } from 'tailwind-rn';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';

export default function App() {
  const tailwind = useTailwind(); // Assuming you want to use Tailwind CSS within App.tsx

  return (
    <ToastProvider>
      {/* Apply Tailwind CSS styles to the ToastProvider or any other component */}
        {/* <Product /> Uncomment and style as needed */}
        <Weather />
    </ToastProvider>
  );
}
