import React from 'react';
import {
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonReorder,
    IonReorderGroup,
    ItemReorderEventDetail
} from '@ionic/react';

import './DragList.css';

function DragList() {
    function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        event.detail.complete();
    }
    return (
        <IonContent scrollY={false}>
            <div className="ion-content-scroll-host">
                <IonList>
                    {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
                    <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                        <IonReorder>
                            <IonItem>
                                <IonLabel>
                                    Item 1
                                </IonLabel>
                            </IonItem>
                        </IonReorder>

                        <IonReorder>
                            <IonItem>
                                <IonLabel>
                                    Item 2
                                </IonLabel>
                            </IonItem>
                        </IonReorder>

                        <IonReorder>
                            <IonItem>
                                <IonLabel>
                                    Item 3
                                </IonLabel>
                            </IonItem>
                        </IonReorder>

                        <IonReorder>
                            <IonItem>
                                <IonLabel>
                                    Item 4
                                </IonLabel>
                            </IonItem>
                        </IonReorder>

                        <IonReorder>
                            <IonItem>
                                <IonLabel>
                                    Item 5
                                </IonLabel>
                            </IonItem>
                        </IonReorder>
                    </IonReorderGroup>
                </IonList>
            </div>
        </IonContent>
    );
}

export default DragList;
