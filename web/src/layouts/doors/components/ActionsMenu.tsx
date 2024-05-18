import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import { TbDots, TbSettings, TbTrash } from 'react-icons/tb';
import { HiOutlineClipboardCopy } from 'react-icons/all';
import { GiTeleport } from 'react-icons/gi';
import { DoorColumn } from '../../../store/doors';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { convertData } from '../../../utils/convertData';
import { useClipboard } from '../../../store/clipboard';
import { fetchNui } from '../../../utils/fetchNui';
import { openConfirmModal } from '@mantine/modals';
import { CellContext } from '@tanstack/react-table';
import { useVisibility } from '../../../store/visibility';

const ActionsMenu: React.FC<{ data: CellContext<DoorColumn, unknown> }> = ({ data }) => {
  const navigate = useNavigate();
  const setClipboard = useClipboard((state) => state.setClipboard);
  const setVisible = useVisibility((state) => state.setVisible);
  return (
    <Menu position="right-start" width={200}>
      <Menu.Target>
        <Tooltip label="Ações da Porta">
          <ActionIcon color="blue.4" variant="transparent">
            <TbDots size={24} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<TbSettings size={18} />}
          onClick={() => {
            useStore.setState(convertData(data.row.original), true);
            navigate('/settings/general');
          }}
        >
          Configurações
        </Menu.Item>
        <Menu.Item
          icon={<HiOutlineClipboardCopy size={18} />}
          onClick={() => {
            setClipboard(convertData(data.row.original));
            fetchNui('notify', 'Configurações copiadas');
          }}
        >
          Copiar configurações
        </Menu.Item>
        <Menu.Item
          icon={<GiTeleport size={18} />}
          onClick={() => {
            setVisible(false);
            fetchNui('teleportToDoor', data.row.getValue('id'));
          }}
        >
          Teleportar aqui
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<TbTrash size={18} />}
          onClick={() =>
            openConfirmModal({
              title: 'Confirmar exclusão',
              centered: true,
              withCloseButton: false,
              children: (
                <Text>
                  Você tem certeza que deseja excluir esta porta:
                  <Text component="span" weight={700}>{` ${data.row.getValue('name')}`}</Text>?
                </Text>
              ),
              labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
              confirmProps: { color: 'red' },
              onConfirm: () => {
                fetchNui('deleteDoor', data.row.getValue('id'));
              },
            })
          }
        >
          Deletar porta
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionsMenu;
