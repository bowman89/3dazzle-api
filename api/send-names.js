import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Kun POST requests er tilladt' });
  }

  const { names } = req.body;

  if (!names || !Array.isArray(names)) {
    return res.status(400).json({ error: 'Du skal sende en liste med navne.' });
  }

  try {
    // Byg mail body
    const list = names.map((n) => `<li>${n}</li>`).join('');
    const html = `<h2>Indsendte navne:</h2><ul>${list}</ul>`;

    // Send mailen
    await resend.emails.send({
      from: 'Navn Automailer <onboarding@resend.dev>',
      to: 'dinmodtager@mail.dk',
      subject: 'Nye navne fra kunde',
      html,
    });

    res.status(200).json({ message: 'Mail sendt!', names });
  } catch (error) {
    res.status(500).json({ error: 'Fejl ved afsendelse af mail.', detail: error.message });
  }
}
