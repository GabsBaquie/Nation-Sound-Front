import { MetaDataController } from "@/controller/MetaDataController";
import { MetadataProps } from "@/models/MetaDataModel";
import Image from "next/image";

const MetaData = (props: MetadataProps) => {
  const controller = new MetaDataController(props);
  const metaData = controller.getModel();

  return (
    <div>
      <h1>{metaData?.metaTitle}</h1>
      <p>{metaData?.metaDescription}</p>
      {metaData?.metaImage && (
        <Image
          src={metaData?.metaImage.url}
          alt={metaData?.metaImage.alternativeText || "Meta Image"}
          width={500}
          height={500}
        />
      )}
    </div>
  );
};

export default MetaData;
