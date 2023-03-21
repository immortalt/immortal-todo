import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonPage,
    IonToolbar, isPlatform
} from '@ionic/react';
import React, {useEffect} from "react";
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
import {listThemes, ListTheme} from "../../theme/listThemes";
import TaskItems from "../../components/TaskItems";
import {setStatusbarColor} from "../../theme/utils";
import useIsDark from "../../hooks/useIsDark";

interface TodoPageProps
    extends RouteComponentProps<{
        id: string;
        theme: string;
    }> {
}

const TodoList: React.FC<TodoPageProps> = ({match}) => {
    const {id = "tasks", theme = "green"} = match.params;
    const isIOS = isPlatform("ios");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const isDark = useIsDark();
    const listTheme: ListTheme = listThemes[theme];
    const themeUnit = isDark ? listTheme.dark : listTheme.light;
    useEffect(() => {
        setTimeout(() => {
            setStatusbarColor(themeUnit.background);
        }, 325);
    }, [themeUnit.background])
    const styles = {
        header: {
            color: themeUnit.text,
            "--background": themeUnit.background,
            "--color": themeUnit.text,
        },
        contentHeader: {
            color: themeUnit.text,
            "--background": themeUnit.background,
            "--color": themeUnit.text,
            "--min-height": id === "myday" ? "65px" : "40px"
        },
        toolbar: {
            "--background": themeUnit.background,
            "--color": themeUnit.text,
        },
        iconButton: {color: themeUnit.text},
        content: {"--background": themeUnit.background},
    }
    const getTitle = (id: string) => {
        if (id === "myday") {
            return <div style={styles.header}>
                <div className="today">My Day</div>
                <div className="today-date">{new Date().toLocaleDateString()}</div>
            </div>;
        }
        return <div>{id}</div>;
    }
    const title = getTitle(id);
    return (
        <IonPage>
            <IonHeader mode="ios" className="ion-no-border" style={styles.header}>
                <IonToolbar mode={isIOS ? 'ios' : 'md'} style={styles.toolbar}>
                    <IonButtons slot="start">
                        <IonBackButton style={styles.iconButton} defaultHref="/home"
                                       text={isIOS ? "Lists" : ""}></IonBackButton>
                    </IonButtons>
                    <IonTitle style={styles.header}
                              className="page-header">
                        <DelayDisplay>{title}</DelayDisplay>
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            color={themeUnit.text}
                            style={styles.iconButton}
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
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
            <IonContent fullscreen style={styles.content}>
                <IonHeader style={styles.header} className="ion-no-border content-header" mode="ios"
                           collapse="condense">
                    <IonToolbar mode="ios" style={styles.contentHeader}>
                        <IonTitle size="large">{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <TaskItems theme={listTheme}></TaskItems>
            </IonContent>
        </IonPage>
    );
};

export default TodoList;
