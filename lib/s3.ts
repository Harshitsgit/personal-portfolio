import { conf } from "@/conf/conf";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: conf.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: conf.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: conf.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});
