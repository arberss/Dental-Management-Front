import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/react-query/usePagination';
import Input from '@/shared-components/Form/Input/Input';
import NumberInput from '@/shared-components/Form/Input/NumberInput';
import Select from '@/shared-components/Form/Select/Select';
import { Box, Button, Drawer, Flex, Grid, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import * as dayjs from 'dayjs';
import { IPatientsResponse } from '../index.interface';

interface AddPatientProps {
  opened: boolean;
  onClose: () => void;
  title: string;
}

const AddPatient = ({ opened, onClose, title }: AddPatientProps) => {
  const { data: doctors } = usePagination<{
    items: IPatientsResponse['items'];
  }>(endpoints.doctors, {
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

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={title}
      position='right'
      size='md'
      sx={{
        overflowX: 'hidden',
      }}
    >
      <Flex justify='space-between' direction='column'>
        <Box
          sx={{
            height: '85vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          className='overflowHoverVisibility'
        >
          <Grid gutter='sm' py='4px'>
            <Grid.Col span={6}>
              <Input
                name='firstName'
                label='First Name'
                onChange={() => {}}
                value=''
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Input
                name='lastName'
                label='Last Name'
                onChange={() => {}}
                value=''
              />
            </Grid.Col>
          </Grid>

          <Grid gutter='sm' py='4px'>
            <Grid.Col>
              <Input
                name='parentName'
                label='Parent Name'
                onChange={() => {}}
                value=''
              />
            </Grid.Col>
          </Grid>

          <Grid gutter='sm' py='4px'>
            <Grid.Col span={6}>
              <Input
                name='contactNumber'
                label='Contact Number'
                onChange={() => {}}
                value=''
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                label='Date of birth'
                name='dateOfBirth'
                onChange={() => {}}
                value={dayjs().toDate()}
                valueFormat='DD MMMM YYYY'
              />
            </Grid.Col>
          </Grid>

          <Text size='md' pt='md' weight='bold' color='blue.5'>
            Address
          </Text>
          <Grid gutter='sm' py='4px'>
            <Grid.Col span={6}>
              <Input
                name='street'
                label='Street'
                onChange={() => {}}
                value=''
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Input name='city' label='City' onChange={() => {}} value='' />
            </Grid.Col>
          </Grid>
          <Grid gutter='sm' py='4px'>
            <Grid.Col span={6}>
              <Input name='state' label='State' onChange={() => {}} value='' />
            </Grid.Col>
            <Grid.Col span={6}>
              <Input
                name='postalCode'
                label='Postal Code'
                onChange={() => {}}
                value=''
              />
            </Grid.Col>
          </Grid>

          <Text size='md' pt='md' weight='bold' color='blue.5'>
            Treatment
          </Text>
          <Grid gutter='sm' py='4px'>
            <Grid.Col span={6}>
              <Input
                name='treatment.name'
                label='Treatment name'
                onChange={() => {}}
                value=''
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Input
                name='description'
                label='Description'
                onChange={() => {}}
                value=''
              />
            </Grid.Col>
          </Grid>
          <Grid gutter='sm' py='4px'>
            <Grid.Col span={6}>
              <NumberInput
                name='price'
                label='Price'
                onChange={() => {}}
                value={0}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                name='doctor'
                data={selectDoctorsData}
                label='Doctor'
                onChange={() => {}}
                value=''
                searchable={true}
                dropdownPosition='bottom'
              />
            </Grid.Col>
          </Grid>
        </Box>
        <Flex align='center' justify='flex-end' columnGap='md'>
          <Button
            bg='dark.3'
            sx={(theme) => ({
              '&:hover': {
                backgroundColor: theme.colors.dark[4],
              },
            })}
          >
            Cancel
          </Button>
          <Button bg='blue.8'>Create</Button>
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default AddPatient;
