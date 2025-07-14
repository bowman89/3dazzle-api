import { extrudeLinear } from "@jscad/modeling/src/operations/extrusions";
import { geom2 } from "@jscad/modeling/src/geometries/geom2";
import { text } from "@jscad/modeling/src/primitives/text";
import { serialize } from "@jscad/stl-serializer";
import JSZip from "jszip";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { names } = req.body; // fx ["Thomas", "Mille"]
  if (!Array.isArray(names) || names.length === 0) return res.status(400).json({ error: "No names provided" });

  const zip = new JSZip();

  for (const name of names) {
    // 1. Lav 2D tekst
    const txt2d = text({ string: name, size: 15 }); // font: 'Arial' default
    // 2. Ekstruder til 3D
    const geom3d = extrudeLinear({ height: 3 }, txt2d);
    // 3. Serialiser til STL
    const stlData = serialize({}, geom3d)[0];
    zip.file(`${name}.stl`, stlData);
  }

  // 4. Returner ZIP
  const zipData = await zip.generateAsync({ type: "nodebuffer" });

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=navneskilte.zip");
  res.send(zipData);
}
