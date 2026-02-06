// utils/whatsapp.ts — WhatsApp checkout message generator

interface WhatsAppOrderParams {
  productName: string;
  price: number;
  color?: string;
  size?: string;
  productUrl: string;
  imageUrl?: string;
}

/**
 * Generate a WhatsApp checkout URL with pre-filled message
 */
export function generateWhatsAppUrl(params: WhatsAppOrderParams): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923141181535";

  let message = `Hi, I'd like to order this bag from Dear Her 🎀\n\n`;
  message += `🛍 Product: ${params.productName}\n`;
  message += `💰 Price: Rs. ${params.price.toLocaleString()}\n`;

  if (params.color) {
    message += `🎨 Color: ${params.color}\n`;
  }
  if (params.size) {
    message += `📐 Size: ${params.size}\n`;
  }

  message += `\n🔗 Link: ${params.productUrl}\n`;

  if (params.imageUrl) {
    message += `📸 Image: ${params.imageUrl}\n`;
  }

  message += `\nPlease confirm availability and delivery details. Thank you! 💕`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Generate a WhatsApp URL for cart items
 */
export function generateCartWhatsAppUrl(
  items: Array<{
    name: string;
    price: number;
    color?: string;
    quantity: number;
  }>
): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923141181535";

  let message = `Hi, I'd like to order these bags from Dear Her 🎀\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}`;
    if (item.color) message += ` (${item.color})`;
    message += ` — Rs. ${item.price.toLocaleString()} x ${item.quantity}\n`;
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\n💰 Total: Rs. ${total.toLocaleString()}\n`;
  message += `\nPlease confirm availability and delivery details. Thank you! 💕`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
