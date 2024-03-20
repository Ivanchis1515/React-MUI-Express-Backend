import nodemailer from 'nodemailer';

//configurcion el transporte SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'powrtch0@gmail.com',
      pass: 'clxsjvoljdutpidr',
    },
});
  
// Función para enviar un correo electrónico
export const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'powrtch0@gmail.com',
            to,
            subject,
            text,
        });
        console.log('Correo electrónico enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw new Error('Error al enviar el correo electrónico');
    }
};