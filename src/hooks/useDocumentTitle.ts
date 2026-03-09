import { useEffect } from "react";

/**
 * Sets the document title for the current page.
 * Appends " | Kaleidoscope" suffix automatically.
 */
export function useDocumentTitle(title: string) {
    useEffect(() => {
        const prev = document.title;
        document.title = `${title} | Kaleidoscope`;
        return () => {
            document.title = prev;
        };
    }, [title]);
}
