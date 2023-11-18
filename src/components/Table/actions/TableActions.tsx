import { Button, Sx } from '@mantine/core';

export interface Actions {
  type: 'edit' | 'delete' | string;
  disabled?: boolean;
  hidden?: boolean;
  icon?: string;
  svgComponent?: any;
  text: string;
  action?: () => void;
  sx?: Sx;
}

export type Props<T = any> = {
  rowData?: T;
  actions: (({ rowData }: { rowData?: T }) => Actions)[];
  setOpened?: (value: boolean) => void;
};

const ColumnActions = <T extends unknown>(props: Props<T>): JSX.Element => {
  const { rowData, actions, setOpened } = props;

  const renderActions = (): (JSX.Element | null)[] =>
    actions?.map(
      (
        item: ({ rowData }: { rowData?: T }) => void,
        index: number
      ): JSX.Element | null => {
        const element = item({ rowData }) as Actions | void;

        if (element?.hidden) return null;

        return (
          <Button
            disabled={element?.disabled}
            key={`${element?.type}-${index}`}
            onClick={(): void | null => {
              setOpened?.(false);
              return element?.action ? element?.action() : null;
            }}
            compact
            variant='white'
            sx={element?.sx}
          >
            {element?.svgComponent && element.svgComponent}
            {element?.icon && <img src={element?.icon} alt='' />}
            {!element?.icon && !element?.svgComponent && element?.text}
          </Button>
        );
      }
    );

  return <>{renderActions()}</>;
};

export default ColumnActions;
