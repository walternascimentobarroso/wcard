import { ContactInfo } from "@/types/contact/contact-info"

// Personalize estas informações com os seus dados
export const contactData: ContactInfo = {
  name: "Seu Nome",
  title: "Senior Developer",
  bio: "Desenvolvedor apaixonado por criar soluções inovadoras e elegantes.",
  location: "Lisboa, Portugal",
  languages: ["Português", "English", "Español"],
  // avatar: "/avatar.jpg", // Descomente e adicione uma imagem em /public
  
  // Dados Públicos
  email: "seu.email@exemplo.com",
  phone: "+351 912 345 678",
  website: "https://seu-website.com",
  address: "Rua Exemplo, 123, 1000-000 Lisboa, Portugal",
  
  // Dados Privados
  password: "senha123",
  privateNotes: "Notas privadas que só você pode ver.",
  
  // Redes Sociais (opcional)
  linkedin: "https://linkedin.com/in/seu-perfil",
  github: "https://github.com/seu-usuario",
  whatsapp: "+351912345678",
}

