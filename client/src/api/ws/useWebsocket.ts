import { webSocket } from "rxjs/webSocket";
import { useLayoutEffect } from "react";

const useWebsocket = ({ url, authToken, subscribers, refObj }) => {

    useLayoutEffect(() => {
        const wsSubject$ = webSocket({
            url,
            protocol: [authToken]
        });
        refObj.current = wsSubject$;
        const subsMap = subscribers.map(sub => wsSubject$.subscribe(sub));
        return () => subsMap.forEach(sub => sub.unsubscribe());
    }, []);
    return refObj;
};

export default useWebsocket;
