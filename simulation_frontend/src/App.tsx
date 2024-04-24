import React from 'react';
import SimulationCanvas from './features/SimulationCanvas/SimulationCanvas';
import EntityPalette from './features/EntityPalette/EntityPalette';
import logo from './logo.svg';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <aside className="entity-palette">
          <EntityPalette />
        </aside>
        <main className="simulation-canvas">
          <SimulationCanvas />
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
