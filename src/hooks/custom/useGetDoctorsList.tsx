import { endpoints } from '@/config/endpoints';
import { usePagination } from '../react-query/usePagination';
import useDebounce from './useDebounce';

interface UseGetDoctorsListProps {
  search: string;
}

const useGetDoctorsList = ({ search }: UseGetDoctorsListProps) => {
  const debouncedSearch = useDebounce(search, 500);

  const { data: doctors, isLoading } = usePagination<{
    items: { _id: string; firstName: string; lastName: string }[];
  }>(endpoints.doctorsDropdown, {
    page: 1,
    size: 10,
    search: debouncedSearch,
  });

  const selectDoctorsData =
    doctors?.items?.map((d) => {
      return {
        label: `${d.firstName} ${d.lastName}`,
        value: d._id,
      };
    }) ?? [];

  return {
    data: selectDoctorsData ?? [],
    isLoading,
  };
};

export default useGetDoctorsList;
