"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactLenis } from "lenis/react";
import { DeviceProvider } from "@/hooks/useDeviceDetect";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } }));
  return (
    <QueryClientProvider client={queryClient}>
      <DeviceProvider>
        {children}
      </DeviceProvider>
    </QueryClientProvider>
  );
}
