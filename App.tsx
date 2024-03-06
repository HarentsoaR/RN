import { ToastProvider } from 'react-native-toast-notifications';
import Product from './Product';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, margin: 20 }}>
    <ToastProvider>
      <View style={{  margin: 20  }}>
      <Product />
      </View>
    </ToastProvider>
    </View>
  );
}
