import { useSetters, useStore } from '../../../../../store';
import { ActionIcon, Group, Modal, Select, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { TbSettings, TbTrash } from 'react-icons/tb';
import DifficultyModal from '../../characters/components/DifficultyModal';

const selectData: { label: string; value: string }[] = [
  { label: 'Fácil', value: 'easy' },
  { label: 'Médio', value: 'medium' },
  { label: 'Difícil', value: 'hard' },
  { label: 'Personalizado', value: 'custom' },
];

const LockpickFields: React.FC = () => {
  const lockpickFields = useStore((state) => state.lockpickDifficulty);
  const setLockpickFields = useSetters((setter) => setter.setLockpickDifficulty);
  const [modal, setModal] = useState<{ opened: boolean; index: number }>({ opened: false, index: 0 });

  const handleRowDelete = (index: number) => {
    setLockpickFields((prevState) => prevState.filter((obj, indx) => indx !== index));
  };

  return (
    <>
      {lockpickFields.map((field, index) => (
        <Group
          key={`${typeof field === 'string' ? field : field.areaSize}-${index}`}
          sx={{ width: '100%' }}
          spacing={16}
          mt={index === 0 ? undefined : 16}
          position="apart"
        >
          <Select
            data={selectData}
            value={typeof field === 'string' ? field : 'custom'}
            readOnly
            placeholder="Edite as configurações se quiser personalizar"
            sx={{ width: '80%' }}
          />
          <Tooltip label="Editar linha">
            <ActionIcon color="blue.4" variant="transparent" onClick={() => setModal({ opened: true, index })}>
              <TbSettings size={24} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Deletar linha">
            <ActionIcon color="red.4" variant="transparent" onClick={() => handleRowDelete(index)}>
              <TbTrash size={24} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ))}
      <Modal
        opened={modal.opened}
        onClose={() => setModal({ ...modal, opened: false })}
        transition="fade"
        title="Dificuldade da Lockpick"
        centered
        size="xs"
        withCloseButton={false}
      >
        <DifficultyModal selectData={selectData} setModal={setModal} modal={modal} />
      </Modal>
    </>
  );
};

export default LockpickFields;
