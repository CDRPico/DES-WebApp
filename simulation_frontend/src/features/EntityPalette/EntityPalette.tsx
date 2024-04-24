import React from 'react';
import { useDrag } from 'react-dnd';

const EntityPaletteItem: React.FC<{ entity: any }> = ({ entity }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'canvas-entity',
    item: entity,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {entity.label}
      {/* You can replace this with a visual representation of the entity */}
    </div>
  );
};

const EntityPalette: React.FC = () => {
  const entities = [
    { id: '1', type: 'car' , label: '🚗' },
    { id: '2', type: 'person', label: '👤'},
    { id: '3', type: 'money', label: '💰'},
  ];

  return (
    <div>
    {entities.map((entity) => (
        <EntityPaletteItem key={entity.id} entity={entity} />
    ))}
    </div>
  );
};

export default EntityPalette;
