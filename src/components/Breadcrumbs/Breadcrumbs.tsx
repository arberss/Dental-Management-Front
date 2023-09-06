import { Text, Breadcrumbs as BreadcrumbsMantine, Sx } from '@mantine/core';

interface BreadcrumbsProps {
  items: { title: string; onClick?: () => void }[];
  seperator?: string;
  sx?: Sx;
  textSx?: Sx;
}

const Breadcrumbs = ({
  items,
  seperator = '→',
  sx,
  textSx,
}: BreadcrumbsProps) => {
  const data = items?.map((item) => {
    return (
      <Text
        key={item.title}
        onClick={() => (item?.onClick ? item.onClick() : null)}
        sx={(theme) => ({
          cursor: item?.onClick ? 'pointer' : 'default',
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.gray[1]
              : theme.colors.gray[8],
          ...textSx,
        })}
      >
        {item.title}
      </Text>
    );
  });

  return (
    <BreadcrumbsMantine
      separator={seperator}
      sx={{
        margin: '15px 0',
        ...sx,
      }}
    >
      {data}
    </BreadcrumbsMantine>
  );
};

export default Breadcrumbs;
