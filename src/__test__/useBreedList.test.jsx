import { expect, test } from "vitest";
// eslint-disable-next-line import/named
import { renderHook, waitFor } from "@testing-library/react";

// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// ! Fake react component to test the hook
// function getBreedList(animal) {
//   let list;
//   function TestComponent() {
//     list = useBreedList(animal);
//     return null;
//   }

//   render(
//     <QueryClientProvider client={queryClient}>
//       <TestComponent />
//     </QueryClientProvider>
//   );

//   return list;
// }

test("gives an empty list with no animal provider", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});

test("gives back breeds when given an animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];
  fetch.mockResponseOnce(JSON.stringify({ animal: "dog", breeds }));
  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  await waitFor(() => {
    expect(result.current[1]).toBe("success");
    const breedsList = result.current[0];
    expect(breedsList).toEqual(breeds);
  });
});
