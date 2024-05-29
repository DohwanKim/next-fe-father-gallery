'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

const QueryProvider = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
};

export default QueryProvider;
