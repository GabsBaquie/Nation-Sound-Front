import { MetaDataModel } from "./MetaDataModel";
export interface LandingPageModel {
  error?: string;
  blocks: any[];
  metaData: MetaDataModel;
}
