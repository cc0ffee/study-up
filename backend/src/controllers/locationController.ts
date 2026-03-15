import { prisma } from "../config/db.js"

export const allLocations = async (req: any, res: any) => {
  try {
    const { search, hasWifi, hasOutlets, minQuiet, type } = req.query;
    const where: any = {};
    if (search) {
      where.OR = [
        { name:         { contains: search, mode: "insensitive" } },
        { neighborhood: { contains: search, mode: "insensitive" } },
        { description:  { contains: search, mode: "insensitive" } },
      ];
    }
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getSingleLocation = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
 
    const location = await prisma.location.findUnique({ where: { id } });
    if (!location) return res.status(404).json({ message: "Spot not found" });
 
    res.json(location);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getLocationsMeta = async (req: any, res: any) => {
  try {
    const [total, withWifi, withOutlets, byType, neighborhoods] = await Promise.all([
      prisma.location.count(),
      prisma.location.count({ where: { hasWifi: true } }),
      prisma.location.count({ where: { hasOutlets: true } }),
      prisma.location.groupBy({ by: ["locationType"], _count: { id: true } }),
      prisma.location.findMany({
        select: { neighborhood: true },
        distinct: ["neighborhood"],
        where: { neighborhood: { not: null } },
        orderBy: { neighborhood: "asc" },
      }),
    ]);
 
    res.json({
      total,
      withWifi,
      withOutlets,
      byType: Object.fromEntries(
        byType.map((t: { locationType: any; _count: { id: any; }; }) => [t.locationType ?? "UNKNOWN", t._count.id])
      ),
      neighborhoods: neighborhoods.map((n: { neighborhood: any; }) => n.neighborhood).filter(Boolean),
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};