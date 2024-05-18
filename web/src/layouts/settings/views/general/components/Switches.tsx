import { SimpleGrid } from '@mantine/core';
import { useSetters, useStore } from '../../../../../store';
import TooltipSwitch from './TooltipSwitch';

const Switches: React.FC = () => {
  // const checkboxes = useStore((state) => {locked: state.state,});
  const locked = useStore((state) => state.state);
  const double = useStore((state) => state.doors);
  const automatic = useStore((state) => state.auto);
  const lockpick = useStore((state) => state.lockpick);
  const hideUi = useStore((state) => state.hideUi);
  const holdOpen = useStore((state) => state.holdOpen);

  const toggleCheckbox = useSetters((setter) => setter.toggleCheckbox);

  return (
    <>
      <SimpleGrid cols={2} pt={16}>
        <TooltipSwitch
          label="Porta Trancada"
          infoCircle="Define se a porta alvo está trancada por padrão"
          value={locked || false}
          toggle={() => toggleCheckbox('state')}
        />
        <TooltipSwitch
          label="Porta Dupla"
          infoCircle="Habilitar se a porta alvo for uma porta dupla"
          value={double || false}
          toggle={() => toggleCheckbox('doors')}
        />
        <TooltipSwitch
          label="Porta Automática"
          infoCircle="Habilite se a porta alvo se move automaticamente (Garagens, Portões, etc...)"
          value={automatic || false}
          toggle={() => toggleCheckbox('auto')}
        />
        <TooltipSwitch
          label="Permitir Lockpick"
          infoCircle="Ativar para permitir o uso de lockpick nesta porta. Você pode definir as dificuldades da verificação de habilidade na guia Lockpick, caso contrário, serão usados os padrões de configuração"
          value={lockpick || false}
          toggle={() => toggleCheckbox('lockpick')}
        />
        <TooltipSwitch
          label="Esconder UI"
          infoCircle="Esconde os indicadores UI para a porta alvo"
          value={hideUi || false}
          toggle={() => toggleCheckbox('hideUi')}
        />
        <TooltipSwitch
          label="Manter Aberta"
          infoCircle="Define se a porta alvo deve permanecer aberta enquanto destrancada"
          value={holdOpen || false}
          toggle={() => toggleCheckbox('holdOpen')}
        />
      </SimpleGrid>
    </>
  );
};

export default Switches;
