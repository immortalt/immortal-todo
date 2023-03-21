import {
    calendarOutline, checkmarkCircleOutline,
    infiniteOutline,
    starOutline,
    sunnyOutline
} from 'ionicons/icons';

const quiclLists = [
    {
        "id": "myday",
        "title": "My Day",
        "theme": "green",
        "count": 1,
        "icon": sunnyOutline
    },
    {
        "id": "important",
        "title": "Important",
        "theme": "pink",
        "count": 2,
        "icon": starOutline
    },
    {
        "id": "planned",
        "title": "Planned",
        "theme": "darkgreen-reverse",
        "count": 3,
        "icon": calendarOutline
    },
    {
        "id": "finished",
        "title": "Finished",
        "theme": "lightpink-reverse",
        "count": 4,
        "icon": checkmarkCircleOutline
    },
    {
        "id": "tasks",
        "title": "Tasks",
        "theme": "purple",
        "count": 5,
        "icon": infiniteOutline
    }
]
export default quiclLists;
