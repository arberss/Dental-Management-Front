import { endpoints } from '@/config/endpoints';
import { usePagination } from '../react-query/usePagination';

const useGetDoctorsList = () => {
  const { data: doctors, isLoading } = usePagination<{
    items: { _id: string; firstName: string; lastName: string }[];
  }>(endpoints.doctorsDropdown, {
    page: 1,
    size: 10,
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
