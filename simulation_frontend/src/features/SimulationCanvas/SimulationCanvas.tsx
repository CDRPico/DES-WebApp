import React, { useState, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    MiniMap,
    Controls,
    Edge,
    Connection,
    Node,
    applyNodeChanges,
    applyEdgeChanges,
    NodeChange,
    EdgeChange,
} from 'react-flow-renderer';
import { useDrop } from 'react-dnd';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const SimulationCanvas: React.FC = () => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    // Callbacks for node and edge changes
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((ns) => applyNodeChanges(changes, ns)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((es) => applyEdgeChanges(changes, es)),
        [],
    );
    const onConnect = useCallback(
        (connection: Edge<any> | Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges, addEdge]
    );

    // Drop functionality setup for the canvas
    const [, drop] = useDrop({
        accept: 'canvas-entity', // Match the type from EntityPalette
        drop: (item: any, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (clientOffset) {
                const newNode: Node = {
                    id: `node-${Math.random()}`, // Generate a random ID for the node
                    type: 'default', // Default node type, adjust as needed
                    data: { label: item.label },
                    position: {
                        x: clientOffset ? clientOffset.x - 190 : 0, // Adjust position by sidebar width
                        y: clientOffset ? clientOffset.y : 0,
                    },
                };
                setNodes((nodes) => nodes.concat(newNode));
            }
        },
    });

    return (
        <ReactFlowProvider>
            <div ref={drop} style={{ width: '100%', height: '100vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    snapToGrid={true}
                    fitView
                >
                    <MiniMap />
                    <Controls />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
};

export default SimulationCanvas;
