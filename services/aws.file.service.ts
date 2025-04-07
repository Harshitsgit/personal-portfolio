import { conf } from "@/conf/conf";
import { Apiresponse } from "@/types";
import { Messages, StatusCodes } from "@/constants";
import { handleApiError } from "@/utils";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { s3 } from "@/lib/s3";

export class AWSFileService {
  private readonly bucket: string;
  private readonly region: string;

  constructor() {
    this.bucket = conf.NEXT_PUBLIC_AWS_BUCKET_NAME;
    this.region = conf.NEXT_PUBLIC_AWS_REGION;
  }

  async uploadFile(file: File): Promise<
    Apiresponse<null | {
      url: string;
      key: string;
    }>
  > {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const key = `${uuidv4()}-${file.name}`;

      const uploadParams = {
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      };

      const command = new PutObjectCommand(uploadParams);

      await s3.send(command);
      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: {
          url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`,
          key,
        },
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      console.log(error);
      return handleApiError(error);
    }
  }

  async deleteFile(key: string): Promise<Apiresponse<null>> {
    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await s3.send(deleteCommand);

      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: null,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }
}

const awsfileService = new AWSFileService();
export { awsfileService };
