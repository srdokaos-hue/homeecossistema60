// Fonte única do contato de WhatsApp. Número ainda é placeholder — trocar pelo
// real (formato internacional, só dígitos) em um lugar só.
export const WHATSAPP_PHONE = "5500000000000"
export const WHATSAPP_MESSAGE = "Olá! Quero saber mais sobre as salas do 60 Minutos."

export function whatsappHref(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
