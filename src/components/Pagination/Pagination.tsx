import Select from '@/shared-components/Form/Select/Select';
import {
  Flex,
  Pagination as MantinePagination,
  useMantineColorScheme,
} from '@mantine/core';
import { calculatePages, sizeFilter } from './pagination.helper';
import './pagination.scss';

interface PaginationProps {
  activePage: number | undefined;
  size: number | undefined;
  totalPages: number | undefined;
  onChange: ((value: number) => void) | undefined;
  onSizeChange: ((value: string) => void) | undefined;
}

const Pagination = ({
  activePage,
  size,
  totalPages,
  onChange,
  onSizeChange,
}: PaginationProps) => {
  if (!totalPages) return null;

  const { colorScheme } = useMantineColorScheme();

  const activePageList = [...sizeFilter];

  if (totalPages > +sizeFilter[sizeFilter.length - 1].value) {
    activePageList.push({
      label: 'All',
      value: totalPages.toString(),
    });
  }

  return (
    <Flex
      className={`${
        colorScheme === 'light' ? 'pagination' : 'pagination pagination--dark'
      }`}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[0],
      })}
    >
      <Select
        name='size'
        data={activePageList}
        onChange={(value) => (onSizeChange ? onSizeChange(value) : null)}
        value={size?.toString() ?? null}
        sx={{ width: '15%' }}
      />
      <MantinePagination
        total={calculatePages(totalPages, size ?? 1)}
        value={Number(activePage)}
        boundaries={1}
        siblings={1}
        onChange={onChange}
      />
    </Flex>
  );
};

export default Pagination;
