export default function handler(req, res) {
  if (req.method === "POST") {
    const { names } = req.body;
    res.status(200).json({ message: "Modtog navne!", names });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
