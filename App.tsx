import React from 'react';
import Navigation from './src/navigation/Navigation';
import {ThemeProvider} from './src/hooks/useTheme';

const App = () => {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
