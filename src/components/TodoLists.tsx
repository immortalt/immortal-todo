import React, {useState} from "react";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import {StrictModeDroppable} from "./StrictModeDroppable";
import {IonItem, IonLabel} from "@ionic/react";

interface Item {
    id: string;
    content: string;
}

const getItems = (count: number): Item[] =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `list-${k}`,
        content: `List ${k}`
    }));

const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
    width: "100%"
});

const TodoLists: React.FC = () => {
    const [items, setItems] = useState<Item[]>(getItems(20));

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(reorderedItems);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <IonItem ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps} style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                             color={snapshot.isDragging ? "primary" : ""}
                                             lines="none"
                                    >
                                        <IonLabel>{item.content}</IonLabel>
                                    </IonItem>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
};

export default TodoLists;
