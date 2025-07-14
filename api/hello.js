export default function handler(req, res) {
  if (req.method === "POST") {
    const { names } = req.body;
    if (!names || !Array.isArray(names)) {
      return res.status(400).json({ error: "Send en array med navne i 'names'" });
    }
    // Svar tilbage med navnene, så du kan teste flowet
    return res.status(200).json({ message: "Navne modtaget", names });
  }
  res.status(405).json({ error: "Kun POST tilladt" });
}
