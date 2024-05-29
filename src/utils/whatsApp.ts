export const generateWhatsAppLink = (
  phoneNumber: string,
  message?: string
): string => {
  return `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
};
