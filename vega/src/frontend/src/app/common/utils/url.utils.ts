export class UrlUtils {

    public static ToQueryString(obj): string {
        if (obj === undefined) {
           return '';
        }

        const parts = [];
        for (const property of Object.keys(obj)) {
           const value = obj[property];
           if (value != null && value !== undefined) {
               parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
           }
        }

        return parts.join('&');
    }
}
