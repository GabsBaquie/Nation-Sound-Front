import { MetaDataController } from "@/controller/MetaDataController";
import { MetadataProps } from "@/models/MetaDataModel";
import Image from "next/image";

const MetaData = (props: MetadataProps) => {
  console.log("MetaData props:", props); // Ajoutez cette ligne pour journaliser les propriétés

  const controller = new MetaDataController(props);
  const metaData = controller.getModel();

  return (
    <div>
      <h1>{metaData?.metaTitle}</h1>
      <p>{metaData?.metaDescription}</p>
      {metaData?.metaImage && (
        <Image
          src={metaData.metaImage.url}
          alt={metaData.metaImage.alternativeText ?? ""}
          width={200}
          height={200}
        />
      )}
    </div>
  );
};

export default MetaData;
