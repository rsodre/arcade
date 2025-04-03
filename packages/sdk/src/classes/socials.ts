import { ByteArray, byteArray } from "starknet";

export class Socials {
  constructor(
    public discord: string,
    public telegram: string,
    public twitter: string,
    public youtube: string,
    public website: string,
    public github: string,
  ) {
    this.discord = discord;
    this.telegram = telegram;
    this.twitter = twitter;
    this.youtube = youtube;
    this.website = website;
    this.github = github;
  }

  static from(value: string) {
    try {
      const json = JSON.parse(value);
      return new Socials(json.discord, json.telegram, json.twitter, json.youtube, json.website, json.github);
    } catch (error: unknown) {
      console.error("Error parsing socials:", error);
      return new Socials("", "", "", "", "", "");
    }
  }

  compile(): ByteArray {
    const json = {
      discord: this.discord,
      telegram: this.telegram,
      twitter: this.twitter,
      youtube: this.youtube,
      website: this.website,
      github: this.github,
    };
    return byteArray.byteArrayFromString(JSON.stringify(json));
  }
}
