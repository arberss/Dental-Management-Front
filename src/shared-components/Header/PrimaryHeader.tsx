import { Box, createStyles, Flex, Sx } from '@mantine/core';
import ColorSchemeMode from '../ColorSchemeMode/ColorSchemeMode';

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    padding: '10px',
    borderWidth: 1,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
  },
}));

interface IPrimaryHeader {
  title?: string;
}

const PrimaryHeader = ({ title }: IPrimaryHeader) => {
  const { classes } = useStyles();

  return (
    <Flex
      justify={`${title ? 'space-between' : 'flex-end'}`}
      sx={classes.root as unknown as Sx}
    >
      {title && <Box>{title}</Box>}
      <Flex justify='flex-end'>
        <ColorSchemeMode />
      </Flex>
    </Flex>
  );
};

export default PrimaryHeader;
