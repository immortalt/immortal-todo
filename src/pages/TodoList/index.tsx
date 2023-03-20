import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem, IonLabel, IonList,
    IonPage,
    IonTitle,
    IonToolbar, isPlatform
} from '@ionic/react';
import TodoLists from "../../components/TodoLists";
import React from "react";
import {
    arrowBackOutline,
    calendarOutline, checkmarkCircleOutline,
    checkmarkOutline, ellipsisHorizontal, ellipsisVertical,
    infiniteOutline,
    personCircle,
    search,
    starOutline,
    sunnyOutline, trashOutline
} from 'ionicons/icons';
import {Divider, IconButton, Menu, MenuItem} from "@mui/material";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import "./index.css";

interface TodoPageProps
    extends RouteComponentProps<{
        id: string;
    }> {
}

const getTitle = (id: string) => {
    if (id === "today") return "Today";
    return "Todo Page";
}

const TodoPage: React.FC<TodoPageProps> = ({match}) => {
    const {id} = match.params;
    const isIOS = isPlatform("ios");
    const title = getTitle(id);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <>
            <IonHeader mode="ios" translucent={true}>
                <IonToolbar mode="md">
                    <IonButtons slot="start" style={{height: 44}}>
                        <IonBackButton defaultHref="/home" text={isIOS ? "Lists" : ""}></IonBackButton>
                    </IonButtons>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit">
                            <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}
                                     onClick={handleMenu}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className="todo-side-menu"
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                            </ListItemIcon>
                            <ListItemText><span>Show Completed Tasks</span></ListItemText>
                        </MenuItem>
                        <MenuItem style={{fontSize: 14}} onClick={handleClose}> <ListItemIcon>
                            <IonIcon icon={trashOutline}></IonIcon>
                        </ListItemIcon>
                            <ListItemText><span>Delete List</span></ListItemText>
                        </MenuItem>
                    </Menu>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader style={{display: "block"}} mode="ios" collapse="condense">
                    <IonToolbar mode="ios">
                        <IonTitle size="large">{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <TodoLists></TodoLists>
            </IonContent>
        </>
    );
};

export default TodoPage;
