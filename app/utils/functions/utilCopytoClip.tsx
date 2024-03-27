export const utilCopytoClip = async (text: string) => {
    await navigator.clipboard.writeText(text);
}