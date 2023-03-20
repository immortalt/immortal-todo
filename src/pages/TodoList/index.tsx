import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar, isPlatform
} from '@ionic/react';
import TodoLists from "../../components/TodoLists";
import React from "react";
import {
    checkmarkCircleOutline,
    ellipsisHorizontal, ellipsisVertical,
    trashOutline
} from 'ionicons/icons';
import {Menu, MenuItem} from "@mui/material";
import {RouteComponentProps} from "react-router";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import "./index.css";
import DelayDisplay from "../../components/DelayDisplay";

interface TodoPageProps
    extends RouteComponentProps<{
        id: string;
    }> {
}


const TodoPage: React.FC<TodoPageProps> = ({match}) => {
    const {id} = match.params;
    const isIOS = isPlatform("ios");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const getTitle = (id: string) => {
        if (id === "today") {
            return <>
                <div className="today">My Day</div>
                <div className="today-date">{new Date().toLocaleDateString()}</div>
            </>;
        }
        return <div>{id}</div>;
    }
    const title = getTitle(id);
    return (
        <>
            <IonHeader mode="ios">
                <IonToolbar mode="md">
                    <IonButtons slot="start" style={{height: 44}}>
                        <IonBackButton defaultHref="/home" text={isIOS ? "Lists" : ""}></IonBackButton>
                    </IonButtons>
                    <IonTitle className="page-header"><DelayDisplay>{title}</DelayDisplay></IonTitle>
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
                <IonHeader className="content-header" mode="ios" collapse="condense">
                    <IonToolbar mode="ios" style={{"--min-height": id === "today" ? "65px" : "40px"}}>
                        <IonTitle size="large">{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <TodoLists></TodoLists>
            </IonContent>
        </>
    );
};

export default TodoPage;
