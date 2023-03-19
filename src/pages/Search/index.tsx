import React, { useState, useCallback} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonItem, IonList,
} from '@ionic/react';
import {arrowBackOutline} from "ionicons/icons";
import "./search.css";
import {isPlatform} from "@ionic/react";

// A hack to enable the keyboard to open on mobile devices, especially iOS
// refer to https://stackoverflow.com/a/55425845/7593714
function focusAndOpenKeyboard(el: HTMLElement | null, timeout: number = 100): void {
    if (el) {
        // Align temp input element approximately where the input element is
        // so the cursor doesn't jump around
        const __tempEl__ = document.createElement('input');
        __tempEl__.style.position = 'absolute';
        __tempEl__.style.top = (el.offsetTop + 7) + 'px';
        __tempEl__.style.left = el.offsetLeft + 'px';
        __tempEl__.style.height = '0';
        __tempEl__.style.opacity = '0';
        // Put this temp element as a child of the page <body> and focus on it
        document.body.appendChild(__tempEl__);
        __tempEl__.focus();

        // The keyboard is open. Now do a delayed focus on the target element
        setTimeout(() => {
            el.focus();
            el.click();
            // Remove the temp element
            document.body.removeChild(__tempEl__);
        }, timeout);
    }
}


const Search: React.FC = () => {
    const data = ['Amsterdam', 'Buenos Aires', 'Cairo', 'Geneva', 'Hong Kong', 'Istanbul', 'London', 'Madrid', 'New York', 'Panama City'];
    let [results, setResults] = useState([...data]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = event.target.value;
        let query = "";
        query = inputText!.toLowerCase();
        setResults(data.filter(d => d.toLowerCase().indexOf(query) > -1));
        console.log("Current input text:", inputText);
    };

    const callbackRef = useCallback((inputElement: HTMLInputElement) => {
        focusAndOpenKeyboard(inputElement, 100);
    }, []);

    const isIOS = isPlatform('ios');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" style={{height: 44,}}>
                        <IonBackButton class="custom"
                                       text="" defaultHref="/home"
                                       icon={arrowBackOutline}></IonBackButton>
                    </IonButtons>
                    <input className={isIOS ? "searchbar ios" : "searchbar"} type="text" defaultValue=""
                           placeholder="Search" autoFocus
                           ref={callbackRef}
                           onInput={handleChange}/>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {results.map(result => (
                        <IonItem key={result}>{result}</IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Search;
