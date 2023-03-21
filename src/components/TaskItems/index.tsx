import React, {useState} from "react";
import {DragDropContext, Draggable} from "../react-beautiful-dnd";
import {StrictModeDroppable} from "../StrictModeDroppable";
import {ListTheme} from "../../theme/listThemes";
import useIsDark from "../../hooks/useIsDark";
import TaskItem from "./TaskItem";
import {TodoTask} from "../../models/TodoTask";

const getItems = (count: number): TodoTask[] =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `list-${k}`,
        title: `List ${k}`,
        count: k,
        order: k,
        finished: false
    }));

// switch the order of the items in the array and return the new array
const reorder = (list: TodoTask[], source: number, destination: number): TodoTask[] => {
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
    paddingLeft: 8,
    paddingRight: 8,
});

type TaskItemsProps = {
    theme: ListTheme
}
const TaskItems: React.FC<TaskItemsProps> = ({theme}) => {
    const [items, setItems] = useState<TodoTask[]>(getItems(20));
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
    const isDark = useIsDark()
    const themeUnit = isDark ? theme.dark : theme.light;
    let radioColor: string;
    if (themeUnit.reversed) {
        radioColor = themeUnit.text;
    } else {
        radioColor = isDark ? themeUnit.text : themeUnit.background;
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
                        {items.map((item: TodoTask, index: number) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <TaskItem item={item} radioColor={radioColor} snapshot={snapshot}
                                              provided={provided} themeUnit={themeUnit}
                                              key={item.id}/>
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
