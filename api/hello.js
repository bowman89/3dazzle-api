import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { names, to } = req.body;

    // Send mail via Resend!
    try {
      const mail = await resend.emails.send({
        from: 'onboarding@resend.dev', // brug denne indtil du har et godkendt domæne
        to: to || 'thomas.bowman89@gmail.com', // fallback hvis "to" mangler
        subject: 'Navne modtaget fra 3Dazzle',
        html: `<p>Følgende navne er sendt:<br>${names.join('<br>')}</p>`,
      });

      res.status(200).json({ success: true, mail, message: 'Mail sendt!' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Kun POST tilladt' });
  }
}
