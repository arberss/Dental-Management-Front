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
        sx={(theme) => {
          let itemColor = theme.colors.blue[5];
          if (!item?.onClick) {
            itemColor =
              theme.colorScheme === 'dark'
                ? theme.colors.gray[1]
                : theme.colors.gray[8];
          }

          return {
            cursor: item?.onClick ? 'pointer' : 'default',
            color: itemColor,
            ...textSx,
          };
        }}
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
        cursor: 'default',
        ...sx,
      }}
    >
      {data}
    </BreadcrumbsMantine>
  );
};

export default Breadcrumbs;
