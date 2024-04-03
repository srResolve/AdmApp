import { Text, TextInput } from 'react-native';
import { Routes } from './src/routes';

export default function App() {
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.allowFontScaling = false;
  (TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
  (TextInput as any).defaultProps.allowFontScaling = false;
  return <Routes />;
}
