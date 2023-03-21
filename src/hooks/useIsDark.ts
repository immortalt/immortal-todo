import {useState} from 'react';

function useIsDark() {
    const mqList = window.matchMedia('(prefers-color-scheme: dark)');
    const [isDark, setIsDark] = useState(mqList.matches);
    mqList.addEventListener('change', (event) => {
        if (event.matches) {
            // dark mode
            setIsDark(true)
        } else {
            // not dark mode
            setIsDark(false)
        }
    });

    return isDark;
}

export default useIsDark;
