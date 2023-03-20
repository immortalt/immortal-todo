import React, {useState} from "react";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import {StrictModeDroppable} from "./StrictModeDroppable";
import {IonItem, IonLabel, isPlatform} from "@ionic/react";

interface Item {
    id: string;
    title: string;
    count: number;
    order: number;
}

const getItems = (count: number): Item[] =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `list-${k}`,
        title: `List ${k}`,
        count: k,
        order: k
    }));


// switch the order of the items in the array and return the new array
const reorder = (list: Item[], source: number, destination: number): Item[] => {
    const result = Array.from(list);
    const [removed] = result.splice(source, 1);
    result.splice(destination, 0, removed);
    // switch the order of the items
    const temp = result[source].order;
    result[source].order = result[destination].order;
    result[destination].order = temp;
    // TODO: send a request to update the order of the items in the database
    return result;
};


const getListStyle = (isDraggingOver: boolean) => ({
    width: "100%",
    cursor: "default",
});

const TodoLists: React.FC = () => {
    const [items, setItems] = useState<Item[]>(getItems(20));
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = prefersDark.matches;

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        userSelect: "none",
        cursor: "default",
        "--background-activated": isDark ? "var(--ion-color-dark-shade)" : "var(--ion-color-light-shade)",
        ...draggableStyle
    });

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
                                    <IonItem button detail={false} ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             style={getItemStyle(
                                                 snapshot.isDragging,
                                                 provided.draggableProps.style
                                             )}
                                             lines="none"
                                             color={snapshot.isDragging ? "light" : ""}
                                    >
                                        <IonLabel>{item.title}</IonLabel>
                                        <IonLabel slot="end">{item.count}</IonLabel>
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
