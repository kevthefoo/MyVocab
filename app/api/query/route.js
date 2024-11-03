import dbConnect from "@/lib/dbConnect";
import queryVocab from "@/lib/queryVocab";

export async function GET(req) {
    await dbConnect();

    const url = new URL(req.url);
    const vocab = url.searchParams.get("vocab");

    try {
        const result = await queryVocab(vocab);
        return Response.json(result);
    } catch (error) {
        return Response.json({ message: "Error fetching vocabuasasasalary", error });
    }
}
