import { createContext, useContext, type ReactNode } from "react";
import { container } from "../container";

const RepositoryContext = createContext(container);

interface RepositoryProviderProps {
  children: ReactNode;
}

/**
 * Repository Provider - Provides repository instances via context
 * Can be used for testing or alternative implementations
 */
export function RepositoryProvider({ children }: RepositoryProviderProps) {
  return (
    <RepositoryContext.Provider value={container}>
      {children}
    </RepositoryContext.Provider>
  );
}

export const useRepositories = () => useContext(RepositoryContext);
