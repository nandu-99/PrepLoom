"use client";

import { CommandSearch } from "@/components/command-search";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CommandSearchContextValue = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const CommandSearchContext = createContext<CommandSearchContextValue | null>(
  null,
);

export function CommandSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const value = useMemo(
    () => ({ searchOpen, openSearch, closeSearch }),
    [searchOpen, openSearch, closeSearch],
  );

  return (
    <CommandSearchContext.Provider value={value}>
      {children}
      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </CommandSearchContext.Provider>
  );
}

export function useCommandSearch() {
  const context = useContext(CommandSearchContext);

  if (!context) {
    throw new Error(
      "useCommandSearch must be used inside CommandSearchProvider",
    );
  }

  return context;
}
