export function DecodeBase64(str: any) {
    return Buffer.from(str, 'base64').toString();
}