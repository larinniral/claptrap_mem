import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Home from "@/pages/Home";

function App() {
  return (
    <ThemeProvider>
      <Home />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
