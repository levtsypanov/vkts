export function openPhoneCall(phone: string) {
    const link = document.createElement('a');
    link.setAttribute('href', `tel:${phone}`);
    link.setAttribute('target', '_blank');
    link.click();
}
