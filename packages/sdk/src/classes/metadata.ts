import { byteArray, ByteArray } from "starknet";

export class Metadata {
  constructor(
    public color: string,
    public preset: string,
    public name: string,
    public description: string,
    public image: string,
    public banner: string,
  ) {
    this.color = color;
    this.preset = preset;
    this.name = name;
    this.description = description;
    this.image = image;
    this.banner = banner;
  }

  static from(value: string) {
    try {
      const json = JSON.parse(value);
      return new Metadata(json.color, json.preset, json.name, json.description, json.image, json.banner);
    } catch (error: unknown) {
      console.error("Error parsing metadata:", error);
      return new Metadata("", "", "", "", "", "");
    }
  }

  compile(): ByteArray {
    const json = {
      color: this.color,
      preset: this.preset,
      name: this.name,
      description: this.description,
      image: this.image,
      banner: this.banner,
    };
    return byteArray.byteArrayFromString(JSON.stringify(json));
  }
}
