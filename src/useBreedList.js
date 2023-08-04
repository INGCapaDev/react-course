import { useGetBreedsQuery } from './petApiService';

export default function useBreedList(animal) {
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  if (!animal) return [[], isLoading];
  return [breeds ?? [], isLoading ? 'Loading...' : 'Loaded'];
}
