import { awsfileService } from "@/services/aws.file.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const result = await awsfileService.uploadFile(file);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
