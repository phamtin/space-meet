import { Text, Button, Popover, Grid } from '@mantine/core';
import { memo, ReactNode } from 'react';
import { CloseSquare } from 'react-iconly';

import c from './confirm-modal.module.scss';

interface Props {
  isOpen: boolean;
  text: string;
  children: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk: () => void;
  onCancel: () => void;
}

const ConfirmPopover = ({
  isOpen,
  children,
  text,
  cancelText = 'No',
  okText = 'Yes',
  onCancel,
  onOk,
}: Props) => {
  return (
    <Popover opened={isOpen} width={280} position="top-end" withArrow shadow="md">
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown className={c.wrapper}>
        <div className={c.text}>
          <CloseSquare size="medium" primaryColor="red" style={{ marginTop: -2 }} />
          <Text size="sm" sx={{ marginLeft: 6 }}>
            {text}
          </Text>
        </div>
        <Grid justify="flex-end">
          <Button className={c.btnCancel} variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className={c.btnOk} color="red.4" variant="light" onClick={onOk}>
            {okText}
          </Button>
        </Grid>
      </Popover.Dropdown>
    </Popover>
  );
};

export default memo(ConfirmPopover);
