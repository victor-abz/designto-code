import { Container, WidgetKey } from "@reflect-ui/core";

export class XYoutubeView extends Container {
  readonly _type = "x/youtube-view";
  readonly video: string;
  constructor({
    key,
    video = "LOZuxwVk7TU", // placeholder video - toxic by Britney Spears
  }: { key: WidgetKey } & {
    video: string;
  }) {
    super({ key });

    this.video = video;
  }
}
