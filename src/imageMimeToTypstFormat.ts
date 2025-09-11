export function imageMimeToTypstFormat(type: string): string | undefined {
    switch (type) {
        case 'image/gif':
            return 'gif';
        case 'image/jpeg':
            return 'jpg';
        case 'image/png':
            return 'png';
        case 'image/svg+xml':
            return 'svg';
        default:
            return undefined;
    }
}
