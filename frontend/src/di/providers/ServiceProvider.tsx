import { createContext, useContext, type ReactNode } from "react";

// Placeholder for service context
// Add services here as needed (e.g., AuthService, NotificationService)
interface ServiceContextType {
  // Add service instances here
  [key: string]: unknown;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

interface ServiceProviderProps {
  children: ReactNode;
}

/**
 * Service Provider - Provides service instances via context
 * Can be used for cross-cutting concerns like auth, notifications, etc.
 */
function ServiceProvider({ children }: ServiceProviderProps) {
  const services: ServiceContextType = {
    // Initialize services here
  };

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
}

export { ServiceProvider };

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within ServiceProvider");
  }
  return context;
};
