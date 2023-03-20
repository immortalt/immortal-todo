import React, {useState} from "react";
import {DragDropContext, Draggable} from "../react-beautiful-dnd";
import {StrictModeDroppable} from "../StrictModeDroppable";
import {IonIcon, IonItem, IonLabel, IonRadio,} from "@ionic/react";
import {starOutline} from "ionicons/icons";
import "./index.css"
import {ListTheme} from "../../theme/listThemes";

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
    paddingLeft: 10,
    paddingRight: 10,
});

type TaskItemsProps = {
    theme: ListTheme
}
const TaskItems: React.FC<TaskItemsProps> = ({theme}) => {
    const [items, setItems] = useState<Item[]>(getItems(20));
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = prefersDark.matches;

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
        return {
            userSelect: "none",
            cursor: "default",
            "--background": isDark ? "#212121" : "white",
            "--min-height": "65px",
            "--border-radius": "10px",
            marginBottom: 5,
            ...draggableStyle,
        }
    };

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
    const themeUnit = isDark ? theme.dark : theme.light;
    const radioColor = isDark ? themeUnit.text : themeUnit.background;
    const styles = {
        star: {
            fontSize: 20,
            color: "var(--ion-color-medium)"
        },
        radio: {
            "--color-checked": "black",
            border: `2px solid ${radioColor}`,
            backgroundColor: radioColor,
        }
    }

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
                                        <IonRadio mode="ios" value="custom" slot="start"
                                                  style={styles.radio}></IonRadio>
                                        <IonLabel>
                                            <div>
                                                <div style={{fontWeight: "bold"}}>
                                                    {item.title}
                                                </div>
                                                <div>
                                                    {item.title}
                                                </div>
                                            </div>
                                        </IonLabel>
                                        <IonLabel slot="end">
                                            <IonIcon style={styles.star} icon={starOutline}></IonIcon>
                                        </IonLabel>
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

export default TaskItems;
